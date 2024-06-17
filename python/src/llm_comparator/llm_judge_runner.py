"""Runner for LLM Judge."""

from collections.abc import Sequence
import math
from typing import Optional

from llm_comparator import model_helper
from llm_comparator import types
from llm_comparator import utils


_IndividualRating = types.IndividualRating
_JsonDict = types.JsonDict
_LLMJudgeInput = types.LLMJudgeInput
_LLMJudgeOutput = types.LLMJudgeOutput
_GenerationModelHelper = model_helper.GenerationModelHelper


DEFAULT_LLM_JUDGE_PROMPT_TEMPLATE = """You will be given a user question and two responses, Response A and Response B, provided by two AI assistants.
Your task is to act as a judge by determining which response is answering the user's question better.

When you are evaluating, you can consider the following criteria:
- Does the response fully answer the user's question?
- Does the response address the key points in the question?
- Is the response clearly written and avoiding unnecessary information?
- Is the response creative, especially when the question is asking for generating creative content?
- Does the response contain factual information?
- Does the response NOT contain any harmful, unsafe, dangerous, or sexually explicit content?
- Does the response refuse to answer to the question that asks for harmful, unsafe, dangerous, or sexually explicit content?

You will provide a short explanation and your final rating (verdict) in the following XML format.

<result>
  <explanation>YOUR EXPLANATION GOES HERE.</explanation>
  <verdict>A is slightly better</verdict>
</result>

Your explanation can compare the two responses and describe your rationale behind the rating.
It should be about two or three sentences.
Your final rating (verdict) must be in 7-point Likert and must be exactly one of the following:
['A is much better', 'A is better', 'A is slightly better', 'same', 'B is slightly better', 'B is better', 'B is much better'].

[User Question]
{prompt}

[The Start of Response A]
{response_a}
[The End of Response A]

[The Start of Response B]
{response_b}
[The End of Response B]

[Result with explanation and verdict in the above XML format]
"""

DEFAULT_RATING_TO_SCORE_MAP = {
    'A is much better': 1.5,
    'A is better': 1.0,
    'A is slightly better': 0.5,
    'same': 0.0,
    'B is slightly better': -0.5,
    'B is better': -1.0,
    'B is much better': -1.5,
}


class LLMJudgeRunner:
  """Runner for LLM judge that determines which response is better."""

  def __init__(
      self,
      generation_model_helper: _GenerationModelHelper,
      llm_judge_prompt_template: str = DEFAULT_LLM_JUDGE_PROMPT_TEMPLATE,
      rating_to_score_map: Optional[dict[str, float]] = None,
  ):
    """Initializes the LLM judge runner.

    Args:
      generation_model_helper: Generative model helper to run the LLM judge.
      llm_judge_prompt_template: Prompt template for LLM judge.
      rating_to_score_map: Map from rating label text to score.
    """
    self.generation_model_helper = generation_model_helper
    self.llm_judge_prompt_template = llm_judge_prompt_template
    if rating_to_score_map is None:
      rating_to_score_map = DEFAULT_RATING_TO_SCORE_MAP
    self.rating_to_score_map = rating_to_score_map

  def create_prompt_for_judge(
      self, prompt: str, response_a: str, response_b: str
  ) -> str:
    prompt_for_judge = self.llm_judge_prompt_template.format(
        prompt=prompt, response_a=response_a, response_b=response_b
    )
    return prompt_for_judge

  def create_inputs_with_repeats_for_judge(
      self, inputs: Sequence[_LLMJudgeInput], num_repeats: int
  ) -> Sequence[_JsonDict]:
    """Creates inputs with repeated runs for LLM Judge."""
    inputs_with_repeats = []
    for index, ex in enumerate(inputs):
      # Non-flipped.
      # If num_repeats is an odd number, roundup.
      for _ in range(math.ceil(num_repeats * 0.5)):
        inputs_with_repeats.append({
            'example_index': index,
            'prompt': ex['prompt'],
            'response_a': ex['response_a'],
            'response_b': ex['response_b'],
            'is_flipped': False,
        })
      # Flipped.
      # If num_repeats is an odd number, rounddown.
      for _ in range(math.floor(num_repeats * 0.5)):
        inputs_with_repeats.append({
            'example_index': index,
            'prompt': ex['prompt'],
            'response_a': ex['response_b'],
            'response_b': ex['response_a'],
            'is_flipped': True,
        })
    print(f'Created {len(inputs_with_repeats)} inputs for LLM judge.')
    return inputs_with_repeats

  def run_query(self, inputs: Sequence[_JsonDict]) -> Sequence[str]:
    """Runs LLM judge."""
    judge_inputs = [
        self.create_prompt_for_judge(
            input['prompt'], input['response_a'], input['response_b']
        )
        for input in inputs
    ]
    judge_outputs = self.generation_model_helper.predict_batch(judge_inputs)
    print(f'Generated {len(judge_outputs)} outputs from LLM judge.')
    return judge_outputs

  # TODO(b/344919097): Add some unit tests.
  def parse_results(
      self,
      outputs_from_judge: Sequence[str],
      inputs_for_judge: Sequence[_JsonDict],
  ) -> Sequence[Sequence[_IndividualRating]]:
    """Parses XML-formatted LLM judge outputs."""

    def parse_output(raw_output: str):
      # Find parts where <result> is in the XML-formatted output.
      parsed_xml = utils.extract_xml_part(raw_output, 'result')
      if not parsed_xml:
        return None

      if (rationale := parsed_xml.find('explanation')) is None:
        return None
      if (rationale := rationale.text) is None:
        return None

      if (rating_label := parsed_xml.find('verdict')) is None:
        return None
      if (rating_label := rating_label.text) is None:
        return None

      try:
        score = self.rating_to_score_map[rating_label]
      except KeyError:
        print(f'LLM judge returned an unknown rating label: {rating_label}')
        return None
      return (score, rating_label, rationale.strip(' \n'))

    max_example_index = max([ex['example_index'] for ex in inputs_for_judge])
    example_ratings = [[] for _ in range(max_example_index + 1)]

    for judge_input, raw_output in zip(inputs_for_judge, outputs_from_judge):
      parsed_output = parse_output(raw_output)
      if parsed_output:
        example_ratings[judge_input['example_index']].append({
            'is_flipped': judge_input['is_flipped'],
            'score': (
                parsed_output[0] * -1.0
                if judge_input['is_flipped']
                else parsed_output[0]
            ),
            'rating_label': parsed_output[1],
            'rationale': parsed_output[2],
        })
    print(f'Parsed {len(example_ratings)} example ratings.')
    return example_ratings

  def postprocess_results(
      self, example_ratings: Sequence[Sequence[_IndividualRating]]
  ) -> Sequence[_LLMJudgeOutput]:
    results: list[_LLMJudgeOutput] = []
    for ratings in example_ratings:
      score = sum([rating['score'] for rating in ratings]) / len(ratings)
      results.append({
          'score': score,
          'individual_rater_scores': list(ratings),
      })
    return results

  def run(
      self, inputs: Sequence[_LLMJudgeInput], num_repeats=6
  ) -> Sequence[_LLMJudgeOutput]:
    """Runs the LLM judge pipeline."""
    input_list_for_judge = self.create_inputs_with_repeats_for_judge(
        inputs, num_repeats
    )
    outputs_from_judge = self.run_query(input_list_for_judge)
    example_ratings = self.parse_results(
        outputs_from_judge, input_list_for_judge
    )
    scores_and_ratings = self.postprocess_results(example_ratings)
    print(f'Generated ratings for {len(scores_and_ratings)} examples.')
    return scores_and_ratings
