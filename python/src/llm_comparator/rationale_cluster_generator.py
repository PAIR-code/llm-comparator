# Copyright 2024 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================
"""Runner for creating rationale clusters for LLM Comparator."""

from collections.abc import Mapping, Sequence
import random

import numpy as np
import tqdm.auto

from llm_comparator import _logging
from llm_comparator import model_helper
from llm_comparator import prompt_templates
from llm_comparator import types
from llm_comparator import utils


_RationaleBulletWithClusterSimilarity = (
    types.RationaleBulletWithClusterSimilarity
)
_RationaleCluster = types.RationaleCluster
_GenerationModelHelper = model_helper.GenerationModelHelper
_EmbeddingModelHelper = model_helper.EmbeddingModelHelper
_logger = _logging.logger


class RationaleClusterGenerator:
  """Runner for generating labeled clusters using embedding similarity."""

  def __init__(
      self,
      gen_model_helper: _GenerationModelHelper,
      emb_model_helper: _EmbeddingModelHelper,
  ):
    """Initializes the runner."""
    self._generator = gen_model_helper
    self._embedder = emb_model_helper

  def _flatten_rationales(
      self, rationale_bullets_for_examples: Sequence[Sequence[str]]
  ) -> Sequence[str]:
    """Flatten rationale bullets and remove duplicates."""
    flattened_rationales = []
    for rationale_bullets_for_example in rationale_bullets_for_examples:
      for rationale in rationale_bullets_for_example:
        flattened_rationales.append(rationale)
    return list(set(flattened_rationales))

  def _paraphrase_rationales(
      self,
      rationales: Sequence[str],
      prompt_for_paraphrasing: str = prompt_templates.DEFAULT_PROMPT_TEMPLATE_FOR_PARAPHRASING,
      temperature_for_paraphrasing: float = 0.1,
  ) -> dict[str, list[str]]:
    """Paraphrase bullets using LLMs."""

    def _generate_paraphrased_rationale(phrase: str) -> str:
      return self._generator.predict(
          prompt_for_paraphrasing.format(bullet_phrase=phrase),
          temperature=temperature_for_paraphrasing,
      )

    _logger.info('Start paraphrasing rationale bullets.')
    paraphrased_rationales = {}
    for rationale in tqdm.auto.tqdm(rationales):
      output = _generate_paraphrased_rationale(rationale)
      parsed_phrases = utils.extract_xml_part(output, 'phrases')
      if not parsed_phrases:
        paraphrased_rationales[rationale] = []
      else:
        paraphrased_rationales[rationale] = [
            phrase.text
            for phrase in parsed_phrases.findall('phrase')
            if phrase.text
        ]

    _logger.info('Done paraphrasing rationales.')
    return paraphrased_rationales

  def _embed_rationales(
      self, paraphrased_rationales: Mapping[str, Sequence[str]]
  ) -> dict[str, list[float]]:
    """Embed rationales by taking the average of the embeddings of paraphrases."""
    rationales_with_embeddings = {}

    _logger.info('Start computing embeddings.')
    for rationale, paraphrased_list in tqdm.auto.tqdm(
        paraphrased_rationales.items()
    ):
      # Compute average embeddings over paraphrased list.
      embeddings = self._embedder.embed_batch([rationale] + paraphrased_list)
      avg_embedding = np.mean(np.array(embeddings), axis=0)
      rationales_with_embeddings[rationale] = avg_embedding

    _logger.info('Done computing embeddings.')
    return rationales_with_embeddings

  def _generate_cluster_titles(
      self,
      rationales: Sequence[str],
      num_clusters: int,
      temperature_for_clustering: float = 0.5,
      max_input_rationales_per_generation: int = 100,
      max_few_shot_examples: int = 3,
  ) -> list[str]:
    """Generate cluster titles.

    Args:
      rationales: List of input texts to be clustered.
      num_clusters: Number of clusters.
      temperature_for_clustering: Temperature parameter for the LLM.
      max_input_rationales_per_generation: Number of rationales to put in each
        generation call to the LLM.
      max_few_shot_examples: Number of few-shot examples to use.

    Returns:
      List of cluster titles.
    """
    prompt_for_clustering = (
        prompt_templates.DEFAULT_PROMPT_TEMPLATE_FOR_CLUSTERING.format(
            num_clusters=num_clusters,
            rationales=random.sample(
                rationales,
                min(max_input_rationales_per_generation, len(rationales)),
            ),
            few_examples='\n'.join([
                '  <group>' + example + '</group>'
                for example in random.sample(
                    prompt_templates.DEFAULT_FEW_EXAMPLES_FOR_CLUSTERING,
                    min(
                        max_few_shot_examples,
                        len(
                            prompt_templates.DEFAULT_FEW_EXAMPLES_FOR_CLUSTERING
                        ),
                    ),
                )
            ]),
        )
    )

    output = self._generator.predict(
        prompt_for_clustering, temperature=temperature_for_clustering
    )

    output_parsed = utils.extract_xml_part(output, 'groups')
    if not output_parsed:
      cluster_titles = []
    else:
      cluster_titles = [
          item.text for item in output_parsed.findall('group') if item.text
      ][:num_clusters]

    _logger.info('Done generating cluster titles.')
    return cluster_titles

  def _embed_cluster_titles(
      self,
      cluster_titles: Sequence[str],
  ) -> Sequence[Sequence[float]]:
    """Embed cluster titles."""
    return self._embedder.embed_batch(cluster_titles)

  def _compute_similarities_to_clusters(
      self,
      embeddings_for_rationales: Mapping[str, Sequence[float]],
      embeddings_for_cluster_titles: Sequence[Sequence[float]],
  ) -> Mapping[str, Sequence[float]]:
    """Compute similarities to clusters for each rationale.

    Args:
      embeddings_for_rationales: Mapping from rationale to embeddings.
      embeddings_for_cluster_titles: List of embeddings for cluster titles.

    Returns:
      Mapping from rationale to similarity values to clusters.
    """
    similarity_matrix = utils.cosine_similarity_between_matrices(
        list(embeddings_for_rationales.values()), embeddings_for_cluster_titles
    )

    similarities_for_rationales = {}
    for rationale, similarities in zip(
        embeddings_for_rationales.keys(), similarity_matrix
    ):
      similarities_for_rationales[rationale] = similarities

    return similarities_for_rationales

  def _store_similarities_to_rationale_bullets(
      self,
      rationale_bullets_for_examples: Sequence[Sequence[str]],
      similarities_for_rationales: Mapping[str, Sequence[float]],
  ) -> Sequence[Sequence[_RationaleBulletWithClusterSimilarity]]:
    """Store similarities to bullets by iterating over the nested lists."""
    rationale_bullets_with_similarities = []
    for rationale_bullets_for_example in rationale_bullets_for_examples:
      rationale_bullets_with_similarities_for_example = []
      for rationale in rationale_bullets_for_example:
        similarities = similarities_for_rationales[rationale]
        rationale_bullets_with_similarities_for_example.append(
            _RationaleBulletWithClusterSimilarity(
                rationale=rationale,
                similarities=list(similarities),
            )
        )
      rationale_bullets_with_similarities.append(
          rationale_bullets_with_similarities_for_example
      )

    _logger.info('Done assigning cluster similarities to rationales.')
    return rationale_bullets_with_similarities

  def run(
      self,
      rationale_bullets_for_examples: Sequence[Sequence[str]],
      num_clusters: int = 8,
  ) -> tuple[
      Sequence[_RationaleCluster],
      Sequence[Sequence[_RationaleBulletWithClusterSimilarity]],
  ]:
    """Generate clusters of similar rationale bullets.

    Args:
      rationale_bullets_for_examples: The rationale bullets from a
        llm_comparator.rationale_bullet_generator.RationaleBulletGenerator that
        will be clustered.
      num_clusters: The number of clusters to generate.

    Returns:
      A tuple of index-aligned lists of clusters and rationale_bullets augmented
      with similarities to clusters for dynamic assignments from the client.
    """
    # Flatten rationales.
    flattened_rationales = self._flatten_rationales(
        rationale_bullets_for_examples
    )

    # Paraphrase rationales.
    paraphrased_rationales = self._paraphrase_rationales(flattened_rationales)

    # Run embeddings for paraphrased rationales.
    embeddings_for_rationales = self._embed_rationales(paraphrased_rationales)

    # Generate cluster titles.
    cluster_titles = self._generate_cluster_titles(
        flattened_rationales, num_clusters
    )

    # Run embeddings for cluster titles.
    embeddings_for_cluster_titles = self._embed_cluster_titles(cluster_titles)

    # TODO(b/344628823): Implement an iterative clustering algorithm.

    # Compute similarities between rationales and clusters.
    similarities_for_rationales = self._compute_similarities_to_clusters(
        embeddings_for_rationales,
        embeddings_for_cluster_titles,
    )

    # Store similarities to rationale bullets.
    rationale_bullets_with_similarities = (
        self._store_similarities_to_rationale_bullets(
            rationale_bullets_for_examples, similarities_for_rationales
        )
    )

    # Format cluster titles.
    clusters = [_RationaleCluster(title=title) for title in cluster_titles]

    return clusters, rationale_bullets_with_similarities
