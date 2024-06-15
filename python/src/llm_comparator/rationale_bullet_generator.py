"""Runner for generating rationale bullets for LLM Comparator."""

from collections.abc import Sequence
from typing import Literal, Optional, TypedDict

import tqdm.auto

from llm_comparator import model_helper
from llm_comparator import prompt_templates
from llm_comparator import types
from llm_comparator import utils


_LLMJudgeOutput = types.LLMJudgeOutput
_GenerationModelHelper = model_helper.GenerationModelHelper


class _BulletGeneratorInput(TypedDict):
  """Intermediate output for rationale bullet generator."""

  selected_rationales: list[str]
  ex_win_side: Literal['A', 'B']


class RationaleBulletGenerator:
  """Runner for rationale summary."""

  def __init__(
      self,
      gen_model_helper: _GenerationModelHelper,
  ):
    """Initializes the rationale summary runner."""
    self._generator = gen_model_helper

  def _rewrite_flipped_ratings(
      self, rationale: str, is_flipped: Optional[bool] = False
  ) -> str:
    if not rationale:
      return rationale
    if is_flipped:
      rationale_temp = rationale.replace('Response A', '[RESPONSE_A_TEMP]')
      return rationale_temp.replace('Response B', '[Response A]').replace(
          '[RESPONSE_A_TEMP]', '[Response B]'
      )
    else:
      return rationale.replace('Response A', '[Response A]').replace(
          'Response B', '[Response B]'
      )

  def _prepare_inputs_for_generating_bullets(
      self,
      examples: Sequence[_LLMJudgeOutput],
      win_rate_threshold: float,
      score_middle: float = 0.0,
  ) -> Sequence[_BulletGeneratorInput]:
    """Rationales into a bulleted list for all examples.

    Args:
      examples: List of examples, each with a score (float) and
        individual_rater_scores (list, each with score, rationale, is_flipped).
        Each example may have other optional fields (e.g., input_text).
      win_rate_threshold: Score threshold (from middle) to determine winners.
      score_middle: Score for tie.

    Returns:
      List of selected rationales and ex_win_side ('A' or 'B').

    Raises:
      ValueError: If no winner for an example.
    """
    inputs_for_generating_bullets: list[_BulletGeneratorInput] = []
    a_wins_score = score_middle + win_rate_threshold
    b_wins_score = score_middle - win_rate_threshold

    for ex in examples:
      ex_score = ex['score']
      # Determine the winner for each example.
      if ex_score > a_wins_score:
        ex_win_side = 'A'
      elif ex_score < b_wins_score:
        ex_win_side = 'B'
      else:
        raise ValueError(
            f'No winner for example with score: {ex_score}. For A to win, score'
            f' > {a_wins_score}. For B to win, score < {b_wins_score}.'
        )

      # Select rationales for ratings whose winners are the same as the winner
      # for the example.
      winners_rationales = []
      for rating in ex['individual_rater_scores']:
        # Rewrite rationales for flipped cases.
        rating['rationale'] = self._rewrite_flipped_ratings(
            rating['rationale'], rating['is_flipped']
        )

        if rating['score'] > a_wins_score:
          rating_win_side = 'A'
        elif rating['score'] < b_wins_score:
          rating_win_side = 'B'
        else:
          continue

        if ex_win_side == rating_win_side:
          winners_rationales.append(rating['rationale'])

      inputs_for_generating_bullets.append({
          'selected_rationales': winners_rationales,
          'ex_win_side': ex_win_side,
      })

    print('Done preparing inputs for generating bullets.')
    return inputs_for_generating_bullets

  def _parse_xml_formatted_rationale_bullets(
      self, bullets_str: str, up_to_size: int = 3
  ) -> Sequence[str]:
    """Parse XML-formatted rationale bullets."""
    bullets_parsed = utils.extract_xml_part(bullets_str, 'summary')
    if not bullets_parsed:
      return []

    reasons = [
        reason.text
        for reason in bullets_parsed.findall('reason')
        if reason.text
    ]
    return reasons[:up_to_size]

  def _generate_rationale_bullets_for_example(
      self,
      rationales: Sequence[str],
      winner: Literal['A', 'B'],
      prompt_template_for_bulleting: str = prompt_templates.DEFAULT_PROMPT_TEMPLATE_FOR_BULLETING,
      temperature_for_bulleting: float = 0.9,
      up_to_size: int = 3,
  ) -> Optional[str]:
    """Summarizes rationales into a bulleted list."""
    if not rationales:
      return None

    prompt = prompt_template_for_bulleting.format(
        up_to_size=up_to_size,
        winner=winner,
        rationales='\n'.join(
            ['- ' + rationale for rationale in rationales if rationale]
        ),
    )
    return self._generator.predict(
        prompt, temperature=temperature_for_bulleting
    )

  def _generate_rationale_bullets_for_examples(
      self, inputs_for_generating_bullets: Sequence[_BulletGeneratorInput]
  ) -> Sequence[Sequence[str]]:
    """Run LLMs to summarize rationales into bulleted lists.

    Args:
      inputs_for_generating_bullets: List of examples, each with
        selected_rationales (list[str]) and ex_win_side ('A' or 'B').

    Returns:
      List of bulleted lists.
    """
    print(
        'Start generating rationale bullets for '
        f'{len(inputs_for_generating_bullets)} examples.'
    )
    rationale_bullets_for_examples = []
    for input_for_generation in tqdm.auto.tqdm(inputs_for_generating_bullets):
      # Run LLMs to summarize several rationales into a set of short phrases.
      output = self._generate_rationale_bullets_for_example(
          input_for_generation['selected_rationales'],
          input_for_generation['ex_win_side'],
      )

      bullets = self._parse_xml_formatted_rationale_bullets(output)
      rationale_bullets_for_examples.append(bullets)

    print('Done generating rationale bullets')
    return rationale_bullets_for_examples

  def run(
      self,
      examples: Sequence[_LLMJudgeOutput],
      win_rate_threshold: float = 0.25,
  ) -> Sequence[Sequence[str]]:
    """Wrapper for summarizing rationales for each example into a bulleted list.

    Args:
      examples: List of examples, each with a score and individual_rater_scores.
      win_rate_threshold: Score threshold for determining the winner.

    Returns:
      List of bulleted lists.
    """
    # Prepare inputs for running LLMs.
    inputs_for_generating_bullets = self._prepare_inputs_for_generating_bullets(
        examples, win_rate_threshold
    )

    # Run LLMs to generate bullets.
    rationale_bullets_for_examples = (
        self._generate_rationale_bullets_for_examples(
            inputs_for_generating_bullets
        )
    )

    return rationale_bullets_for_examples
