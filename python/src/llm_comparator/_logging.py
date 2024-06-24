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
"""Logging utilities."""

import logging

import absl.logging

from llm_comparator import _colab

if _colab.IS_COLAB:
  # Colab is set to log WARNING+ by default. This call resets the environment to
  # log INFO+ instead. See
  # https://stackoverflow.com/questions/54597462 and
  # https://colab.sandbox.google.com/github/aviadr1/learn-advanced-python/blob/master/content/15_logging/logging_in_python.ipynb
  logging.basicConfig(level=logging.INFO, force=True)

logger = absl.logging
