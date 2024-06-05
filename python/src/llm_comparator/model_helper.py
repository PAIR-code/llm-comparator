"""Helper classes for calling LLMs."""

import abc
import time
from typing import Optional, Union

from tqdm.auto import tqdm
import vertexai
from vertexai.generative_models import GenerationConfig
from vertexai.generative_models import GenerativeModel


MAX_NUM_RETRIES = 5
DEFAULT_MAX_OUTPUT_TOKENS = 256


class ModelHelper(abc.ABC):
  """Class for managing calling LLMs."""

  def predict(
      self,
      prompt: str,
      temperature: float,
      max_output_tokens: Optional[int] = DEFAULT_MAX_OUTPUT_TOKENS,
  ) -> Union[list[str], str]:
    raise NotImplementedError()


class VertexModelHelper(ModelHelper):
  """Vertex AI model API calls."""

  def __init__(self, project_id: str, region: str, model_name='gemini-pro'):
    vertexai.init(project=project_id, location=region)
    self.engine = GenerativeModel(model_name)

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
    while num_attempts < MAX_NUM_RETRIES and response is None:
      try:
        prediction = self.engine.generate_content(
            prompt,
            generation_config=GenerationConfig(
                temperature=temperature,
                candidate_count=1,
                max_output_tokens=max_output_tokens,
            ),
        )
        num_attempts += 1
        response = prediction.text
      except Exception as e:  # pylint: disable=broad-except
        if 'quota' in str(e):
          print('\033[31mQuota limit exceeded. Waiting to retry...\033[0m')
          time.sleep(2**num_attempts)
    return response if response is not None else ''

  def predict_batch(
      self,
      prompts: list[str],
      temperature: Optional[float] = None,
      max_output_tokens: Optional[int] = DEFAULT_MAX_OUTPUT_TOKENS,
  ) -> list[str]:
    outputs = []
    for i in tqdm(range(0, len(prompts))):
      # TODO(b/344631023): Implement multiprocessing.
      outputs.append(self.predict(prompts[i], temperature, max_output_tokens))
    return outputs
