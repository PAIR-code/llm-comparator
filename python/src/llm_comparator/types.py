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
"""Types for LLM Comparator."""

from collections.abc import Mapping
from typing import Any, Optional, TypedDict

JsonDict = Mapping[str, Any]


class IndividualRating(TypedDict):
  score: Optional[float]
  rating_label: Optional[str]
  is_flipped: Optional[bool]
  rationale: Optional[str]
  custom_fields: JsonDict


class LLMJudgeInput(TypedDict):
  prompt: str
  response_a: str
  response_b: str


class LLMJudgeOutput(TypedDict):
  score: float
  individual_rater_scores: list[IndividualRating]


class RationaleBullet(TypedDict):
  rationale: str


class RationaleBulletWithClusterSimilarity(RationaleBullet):
  similarities: list[float]


class Example(TypedDict):
  input_text: str
  tags: list[str]
  output_text_a: str
  output_text_b: str
  score: Optional[float]
  individual_rater_scores: list[IndividualRating]
  rationale_list: list[RationaleBullet]
  custom_fields: JsonDict


class RationaleCluster(TypedDict):
  title: str
