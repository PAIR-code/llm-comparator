# LLM Comparator: Python Library

The LLM Comparator Python Library provides a simple API for configuring and
running **comparative evaluations** of models, and generating the JSON files
required to analyze these models side-by-side in the
[LLM Comparator app][llm-comparator-app].

## Installation

```sh
# [OPTIONAL] We recommend using a Python virtual environemnt.
python3 -m venv ~/.venv/llm_comparator
source ~/.venv/llm_comparator/bin/activate
```

You can install this library from the PyPI registry. This workflow is
recommended for most usage.

```sh
pip install llm_comparator
```

Or by cloning the repo from GitHub and installing from source. This workflow is
recommended for contributors fixing bugs or adding new features to the library.

```sh
git clone https://github.com/PAIR-code/llm-comparator.git
cd llm-comparator/python
pip install -e .
```

## Core Concepts

The primary entrypoint to the LLM Comparator Python Library is the
`llm_comparator.comparison` module. This module provides a `run()` function that
coordinates the three phases of comparative evaluation: judging, bulletizing,
and clustering. The library provides modules for each of these phases, as well
as wrappers for interacting with LLMs.

### Model Helpers

The `llm_comparator.model_helper` module is used to initialize API wrappers to
interface with LLMs. Broadly, we support two kinds of models: generation models,
which should be text-to-text language models, and embedding models.

We provide concrete two concrete implementations of wrappers that interact with
the [Google Vertex AI API][vertex-api]:

*   `VertexGenerationModelHelper` supports any
    [generative language model][model-garden-gen] available in the Model Garden.
    By default we use `gemini-pro`, but alternatives can be configured with the
    `model_name=` constructor parameter.
*   `VertexEmbeddingModelHelper` supports any
    [text embedding model][model-garden-emb] available in the Model Garden.
    By default we use `textembedding-gecko@003`, but alternatives can be
    configured with the `model_name=` constructor parameter.

Additional wrapper classes can be implemented by subclassing
`GenerationModelHelper` and `EmbeddingModelHelper` as necessary. We welcome
contributions of these classes to the library via
[Pull Requests][llm-comparator-prs].

### Judges

The "judge" is the model responsible for actually doing the comparison between
the two model responses.

This functionality is encapsulated in the `LLMJudgeRunner` from the
`llm_comparator.llm_judge_runner` module. It requires a generator model that
conforms to the `GenerationModelHelper` protocol in order to call an LLM to
generate their judgements of which of the two model responses is better for
every prompt.

We provide a default judge prompt in
`llm_comparator.llm_judge_runner.DEFAULT_LLM_JUDGE_PROMPT_TEMPLATE`, and you can
use the `llm_judge_prompt_template=` parameter to provide a custom prompt that
may better suit your needs at initialization time. Prompts should require the
judge to phrase its responses in a simple XML format that includes the `verdict`
and an `explanation`, to enable downstream processing by the buletizer and
clusterer. Note that if you do provide a custom prompt, you can use the
`rating_to_score_map=` parameter to ensure judgement `verdict`s can be mapped to
numeric values.

```xml
<result>
  <explanation>YOUR EXPLANATION GOES HERE.</explanation>
  <verdict>A is slightly better</verdict>
</result>
```
The same judge is run multiple times during each comparative analysis to get a
diversity of ratings. This can be configured via the `num_repeats=` key of the
optional `judge_opts=` dictionary passed to `llm_comparator.comparison.run()`.
By default, we call the judge 6 times.

### Bulletizers

A "bulletizer" condenses the results provided by the judge into a set of bullets
to make them easier to understand and consume in the UI.

This functionality is encapsulated in the `RationaleBulletGenerator` from the
`llm_comparator.rationale_bullet_generator` module. It requires a generator
model that conforms to the `GenerationModelHelper` protocol in order to call an
LLM to generate the bulleted summaries.

The primary configuration is the `win_rate_threshold=` parameter, which can be
configured per-comparative evaluation run via the `bulletizer_opts=` dictionary
passed to `llm_comparator.comparison.run()`. By default, the threshold is set to
`0.25` based on the default scoring range of [-1.5, 1.5].

### Clusterers

A "clusterer" takes the bullets, embeds them, groups them into clusters based on
embedding similarity, and generates a label for those clusters.

This functionality is encapsulated in the `RationaleClusterGenerator` from the
`llm_comparator.rationale_cluster_generator` module. It requires a generator
model that conforms to the `GenerationModelHelper` protocol and an embedder that
conforms to the `EmbeddingModelHelper` protocol in order to call LLMs to
generate the clustered summary of rationale bullets.

The primary configuration is the `num_clusters=` parameter, which can be
configured per-comparative evaluation run via the `clusterer_opts=` dictionary
passed to `llm_comparator.comparison.run()`. By default, a clusterer creates 8
clusters from the bullets.

## Basic Usage

We have prepared a Python notebook that you can
[open in Google Colab][llm-comparator-colab] to follow along interactively. It
uses Google's Vertex AI APIs to call models, and requires you to
[authenticate][vertex-auth] in order to follow along.

The following pseudo-script is the minimal distillation of the notebook linked
above, without any AI platform-specific guidance.

```python
from llm_comparator import comparison
from llm_comparator import model_helper
from llm_comparator import llm_judge_runner
from llm_comparator import rationale_bullet_generator
from llm_comparator import rationale_cluster_generator

inputs = [
  # Provide your inputs here.
  # They must conform to llm_comparator.types.LLMJudgeInput
]

# Initialize the models-calling classes.
generator = # Initialize a model_helper.GenerationModelHelper() subclass
embedder = # Initialize a model_helper.EmbeddingModelHelper() subclass

# Initialize the instances that run work on the models.
judge = llm_judge_runner.LLMJudgeRunner(generator)
bulletizer = rationale_bullet_generator.RationaleBulletGenerator(generator)
clusterer = rationale_cluster_generator.RationaleClusterGenerator(
    generator, embedder
)

# Configure and run the comparative evaluation.
comparison_result = comparison.run(inputs, judge, bulletizer, clusterer)

# Write the results to a JSON file that can be loaded in
# https://pair-code.github.io/llm-comparator
file_path = "path/to/file.json"
comparison.write(comparison_result, file_path)
```

<!-- LINKS -->
[llm-comparator-app]: https://pair-code.github.io/llm-comparator
[llm-comparator-colab]: https://colab.research.google.com/github/PAIR-code/llm-comparator/blob/main/python/notebooks/basic_demo.ipynb
[llm-comparator-prs]: https://github.com/PAIR-code/llm-comparator/pulls
[model-garden-emb]: https://console.cloud.google.com/vertex-ai/model-garden?pageState=(%22galleryStateKey%22:(%22f%22:(%22g%22:%5B%22supportedTasks%22,%22inputTypes%22%5D,%22o%22:%5B%22EMBEDDING%22,%22LANGUAGE%22%5D),%22s%22:%22%22))
[model-garden-gen]: https://console.cloud.google.com/vertex-ai/model-garden?pageState=(%22galleryStateKey%22:(%22f%22:(%22g%22:%5B%22supportedTasks%22,%22inputTypes%22%5D,%22o%22:%5B%22GENERATION%22,%22LANGUAGE%22%5D),%22s%22:%22%22))
[vertex-api]: https://cloud.google.com/vertex-ai/docs/reference
[vertex-auth]: https://cloud.google.com/vertex-ai/docs/authentication
