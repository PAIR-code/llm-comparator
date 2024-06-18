"""Primary entry point for running evaluations with LLM Comparator."""

from collections.abc import Sequence
import json

from llm_comparator import llm_judge_runner
from llm_comparator import rationale_bullet_generator
from llm_comparator import rationale_cluster_generator
from llm_comparator import types


# TODO(llm-comparator): Provide convenience utilities for converting from, e.g.,
# CSV/TSV to the dictionary format required by this function.
def run(
    inputs: Sequence[types.LLMJudgeInput],
    judge: llm_judge_runner.LLMJudgeRunner,
    bulletizer: rationale_bullet_generator.RationaleBulletGenerator,
    clusterer: rationale_cluster_generator.RationaleClusterGenerator,
    model_names: Sequence[str] = ('A', 'B'),
) -> types.JsonDict:
  """Runs a comparison with LLM Comparator.

  LLM Comparator comparisons are run in three steps:

  1. An LLM Judge is run on the inputs to produce a set of judgements.
  2. A Rationale Bullet Generator is run on the judgements to produce a set of
     rationale bullets.
  3. The Rationale Cluster Generator is run on the rationale bullets to produce
     a set of rationale clusters with similarity scores.

  Args:
    inputs: The inputs to the evaluation.
    judge: The LLM Judge to use.
    bulletizer: The Rationale Bullet Generator to use.
    clusterer: The Rationale Cluster Generator to use.
    model_names: The names of the models as you would like them to appear in the
      LLM Comparator web application.

  Returns:
    The evaluation results as a JSON object, or the value of output_path if
    provided and writing to that file was successful.
  """

  judgements = judge.run(inputs)
  bullets = bulletizer.run(judgements)
  clusters, cluster_similarities = clusterer.run(bullets)

  per_example_generator = zip(inputs, judgements, cluster_similarities)

  return {
      'metadata': {'custom_fields_schema': []},
      'models': [{'name': name} for name in model_names],
      'examples': [
          {
              'input_text': input['prompt'],
              'tags': [],
              'output_text_a': input['response_a'],
              'output_text_b': input['response_b'],
              'score': judgement['score'],
              'individual_rater_scores': judgement['individual_rater_scores'],
              'rationale_list': similarity,
          }
          for input, judgement, similarity in per_example_generator
      ],
      'rationale_clusters': clusters,
  }


def write(comparison_result: types.JsonDict, output_path: str) -> str:
  with open(output_path, 'w') as f:
    json.dump(comparison_result, f)
  return output_path
