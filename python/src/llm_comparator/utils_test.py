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
"""Tests for llm_comparator.utils."""

import unittest
import xml.etree.ElementTree as ET

from absl.testing import parameterized

from llm_comparator import utils


def normalize_xml(element: ET.Element) -> str:
  return ''.join(ET.tostring(element, encoding='unicode').split())


class UtilsTest(parameterized.TestCase):

  @parameterized.named_parameters(
      {
          'testcase_name': 'entire_string',
          'raw_output': '<items><item>1</item><item>2</item></items>',
          'tag_name': 'items',
          'expected': '<items><item>1</item><item>2</item></items>',
      },
      {
          'testcase_name': 'additional_text',
          'raw_output': '```xml\n<items>\n  <item>1</item>\n</items>```',
          'tag_name': 'items',
          'expected': '<items><item>1</item></items>',
      },
      {
          'testcase_name': 'not_parsable',
          'raw_output': '<item>1</item>',
          'tag_name': 'items',
          'expected': None,
      },
  )
  def test_extract_xml_part(self, raw_output, tag_name, expected):
    extracted_element = utils.extract_xml_part(raw_output, tag_name)
    if expected is None:
      self.assertIsNone(extracted_element)
    else:
      extracted_element_str = normalize_xml(extracted_element)
      self.assertEqual(expected, extracted_element_str)

  @parameterized.named_parameters(
      {
          'testcase_name': 'cosine_sim_test',
          'a_matrix': [[0.1, 0.2], [0.5, 0.5], [0.4, 0.2]],
          'b_matrix': [[0.3, 0.6], [0.2, 0.1]],
          'expected': [[1.0, 0.8], [0.9487, 0.9487], [0.8, 1.0]],
      },
  )
  def test_cosine_similarity(self, a_matrix, b_matrix, expected):
    similarity = utils.cosine_similarity_between_matrices(a_matrix, b_matrix)

    self.assertEqual(len(expected), len(similarity))
    self.assertEqual(len(expected[0]), len(similarity[0]))
    self.assertAlmostEqual(expected[0][0], similarity[0][0], places=3)
    self.assertAlmostEqual(expected[0][1], similarity[0][1], places=3)
    self.assertAlmostEqual(expected[1][0], similarity[1][0], places=3)
    self.assertAlmostEqual(expected[1][1], similarity[1][1], places=3)


if __name__ == '__main__':
  unittest.main()
