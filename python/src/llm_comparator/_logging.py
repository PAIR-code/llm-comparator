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
