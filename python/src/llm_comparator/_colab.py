"""Provides a constant that incidates whether we are running in Google Colab."""

try:
  import google.colab  # pylint: disable=g-import-not-at-top,unused-import # pytype: disable=import-error

  IS_COLAB = True
except (ImportError, ModuleNotFoundError):
  IS_COLAB = False
