"""Helper classes for calling LLMs."""

import abc
from collections.abc import Iterable, Sequence
import time
from typing import Optional

from vertexai import generative_models
from vertexai import language_models
import tqdm.auto


MAX_NUM_RETRIES = 5
DEFAULT_MAX_OUTPUT_TOKENS = 256

BATCH_EMBED_SIZE = 100


class GenerationModelHelper(abc.ABC):
  """Class for managing calling LLMs."""

  def predict(self, prompt: str, **kwargs) -> str:
    raise NotImplementedError()

  def predict_batch(self, prompts: Sequence[str], **kwargs) -> Sequence[str]:
    raise NotImplementedError()


class VertexGenerationModelHelper(GenerationModelHelper):
  """Vertex AI text generation model API calls."""

  def __init__(self, model_name='gemini-pro'):
    self.engine = generative_models.GenerativeModel(model_name)

  def predict(
      self,
      prompt: str,
      temperature: Optional[float] = None,
      max_output_tokens: Optional[int] = DEFAULT_MAX_OUTPUT_TOKENS,
  ) -> str:
    if not prompt:
      return ''
    num_attempts = 0
    response = None
    prediction = None

    while num_attempts < MAX_NUM_RETRIES and response is None:
      num_attempts += 1

      try:
        prediction = self.engine.generate_content(
            prompt,
            generation_config=generative_models.GenerationConfig(
                temperature=temperature,
                candidate_count=1,
                max_output_tokens=max_output_tokens,
            ),
        )
      except Exception as e:  # pylint: disable=broad-except
        if 'quota' in str(e):
          print('\033[31mQuota limit exceeded\033[0m')
        wait_time = 2**num_attempts
        print(f'\033[31mWaiting {wait_time}s to retry...\033[0m')
        time.sleep(2**num_attempts)

    if isinstance(prediction, Iterable):
      prediction = list(prediction)[0]

    return prediction.text if prediction is not None else ''

  def predict_batch(
      self,
      prompts: Sequence[str],
      temperature: Optional[float] = None,
      max_output_tokens: Optional[int] = DEFAULT_MAX_OUTPUT_TOKENS,
  ) -> Sequence[str]:
    outputs = []
    for i in tqdm.auto.tqdm(range(0, len(prompts))):
      # TODO(b/344631023): Implement multiprocessing.
      outputs.append(self.predict(prompts[i], temperature, max_output_tokens))
    return outputs


class EmbeddingModelHelper(abc.ABC):
  """Class for managing calling text embedding models."""

  def embed(self, text: str) -> Sequence[float]:
    raise NotImplementedError()

  def embed_batch(self, texts: Sequence[str]) -> Sequence[Sequence[float]]:
    raise NotImplementedError()


class VertexEmbeddingModelHelper(EmbeddingModelHelper):
  """Vertex AI text embedding model API calls."""

  def __init__(self, model_name: str = 'textembedding-gecko@003'):
    self.model = language_models.TextEmbeddingModel.from_pretrained(model_name)

  def _embed_single_run(
      self, texts: Sequence[str]
  ) -> Sequence[Sequence[float]]:
    """Embeds a list of strings into the models embedding space."""
    num_attempts = 0
    embeddings = None

    if not isinstance(texts, list):
      texts = list(texts)

    while num_attempts < MAX_NUM_RETRIES and embeddings is None:
      try:
        embeddings = self.model.get_embeddings(texts)
      except Exception as e:  # pylint: disable=broad-except
        print(f'Waiting to retry... ({e})')
        time.sleep(2**num_attempts)

    if embeddings is None:
      return []

    return [embedding.values for embedding in embeddings]

  def embed(self, text: str) -> Sequence[float]:
    results = self._embed_single_run([text])
    return results[0]

  def embed_batch(self, texts: Sequence[str]) -> Sequence[Sequence[float]]:
    if len(texts) <= BATCH_EMBED_SIZE:
      return self._embed_single_run(texts)
    else:
      results = []
      for batch_start_index in tqdm.auto.tqdm(
          range(0, len(texts), BATCH_EMBED_SIZE)
      ):
        results.extend(
            self._embed_single_run(
                texts[batch_start_index : batch_start_index + BATCH_EMBED_SIZE]
            )
        )
      return results
