"""Type classes for LLM Comparator."""

from collections.abc import Mapping
from typing import Any, Optional, TypedDict

JsonDict = Mapping[str, Any]


class IndividualRating(TypedDict):
  score: float | None
  rating_label: str | None
  is_flipped: bool | None
  rationale: str | None
  custom_fields: JsonDict = {}


class LLMJudgeInput(TypedDict):
  prompt: str
  response_a: str
  response_b: str


class LLMJudgeOutput(TypedDict):
  score: float
  individual_rater_scores: list[IndividualRating] = []


class RationaleBullet(TypedDict):
  rationale: str


class RationaleBulletWithClusterSimilarity(TypedDict):
  rationale: str
  similarities: list[float]


class Example(TypedDict):
  input_text: str
  tags: list[str] = []
  output_text_a: str
  output_text_b: str
  score: Optional[float] = None
  individual_rater_scores: list[IndividualRating] = []
  rationale_list: list[
      RationaleBullet | RationaleBulletWithClusterSimilarity
  ] = []
  custom_fields: JsonDict = {}


class RationaleCluster(TypedDict):
  title: str
