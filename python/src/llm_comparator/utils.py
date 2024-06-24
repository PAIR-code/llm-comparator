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
"""Utils for LLM Comparator scripts."""

from collections.abc import Sequence
import re
from typing import Optional
import xml.etree.ElementTree as ET

import numpy as np

from llm_comparator import _logging

_logger = _logging.logger


def extract_xml_part(raw_output: str, tag_name: str) -> Optional[ET.Element]:
  """Find parts where <{tag_name}> is in the XML-formatted output."""
  xml_output = re.search(
      rf'<{tag_name}>(.*?)</{tag_name}>', raw_output, flags=re.DOTALL
  )
  if not xml_output:
    _logger.warning('Invalid output with missing <%s> tags', tag_name)
    return None

  try:
    parsed_xml = ET.fromstring(xml_output.group(0))
    return parsed_xml
  except ET.ParseError as e:
    _logger.warning('Invalid format: %s (%s)', e, xml_output)
    return None


def cosine_similarity_between_matrices(
    a_matrix: Sequence[Sequence[float]], b_matrix: Sequence[Sequence[float]]
) -> Sequence[Sequence[float]]:
  """Find the cosine similarity between two matrices."""

  # Normalize each row vector in A and B.
  a_norms = np.linalg.norm(a_matrix, axis=1, keepdims=True)
  b_norms = np.linalg.norm(b_matrix, axis=1, keepdims=True)

  a_normalized = a_matrix / a_norms
  b_normalized = b_matrix / b_norms

  # Compute cosine similarity.
  similarity_matrix = np.dot(a_normalized, b_normalized.T)

  return similarity_matrix.tolist()
