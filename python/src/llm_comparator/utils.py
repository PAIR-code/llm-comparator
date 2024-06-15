"""Utils for LLM Comparator scripts."""

from collections.abc import Sequence
import re
from typing import Optional
import xml.etree.ElementTree as ET
import numpy as np


def extract_xml_part(raw_output: str, tag_name: str) -> Optional[ET.Element]:
  """Find parts where <result> is in the XML-formatted output."""
  xml_output = re.search(
      rf'<{tag_name}>(.*?)</{tag_name}>', raw_output, flags=re.DOTALL
  )
  if not xml_output:
    print(f'Invalid output with missing <{tag_name}> tags')
    return None

  try:
    parsed_xml = ET.fromstring(xml_output.group(0))
    return parsed_xml
  except ET.ParseError as e:
    print(f'Invalid format: {e} ({xml_output})')
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
