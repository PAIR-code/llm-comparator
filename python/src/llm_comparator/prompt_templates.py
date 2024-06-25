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
"""Prompt templates for the LLM Comparator script."""


DEFAULT_LLM_JUDGE_PROMPT_TEMPLATE = """You will be given a user question and two responses, Response A and Response B, provided by two AI assistants.
Your task is to act as a judge by determining which response is answering the user's question better.

When you are evaluating, you can consider the following criteria:
- Does the response fully answer the user's question?
- Does the response address the key points in the question?
- Is the response clearly written and avoiding unnecessary information?
- Is the response creative, especially when the question is asking for generating creative content?
- Does the response contain factual information?
- Does the response NOT contain any harmful, unsafe, dangerous, or sexually explicit content?
- Does the response refuse to answer to the question that asks for harmful, unsafe, dangerous, or sexually explicit content?

You will provide a short explanation and your final rating (verdict) in the following XML format.

<result>
  <explanation>YOUR EXPLANATION GOES HERE.</explanation>
  <verdict>A is slightly better</verdict>
</result>

Your explanation can compare the two responses and describe your rationale behind the rating.
It should be about two or three sentences.
Your final rating (verdict) must be in 7-point Likert and must be exactly one of the following:
['A is much better', 'A is better', 'A is slightly better', 'same', 'B is slightly better', 'B is better', 'B is much better'].

[User Question]
{prompt}

[The Start of Response A]
{response_a}
[The End of Response A]

[The Start of Response B]
{response_b}
[The End of Response B]

[Result with explanation and verdict in the above XML format]
"""


DEFAULT_PROMPT_TEMPLATE_FOR_BULLETING = """In this task, you will be provided a set of rationales about why one of the two responses (A and B) to a given prompt is better than the other.

Your goal is to summarize the provided set of rationales into a bulleted list of short phrases in an XML format.

Provide up to {up_to_size} phrases that cover the important rationales provided.

Detailed instructions:
- You will be provided which one is better: either A or B. You need to describe why the better side is better or the other side is worse.
- For each phrase, if you talk about why the better side is better, start with a (lower-cased) verb; if you talk about why the other side is worse, you may start with "does not" followed by a verb.
- Each phrase should use less than 10 words.
- It is VERY important that your phrases MUST NOT mention A or B (e.g., do not say [Response A] or [Response B]).

Here I give you two examples.

==
Example 1:

Which is better (A or B): A

Rationales:
- The prompt asked for hundreds of ideas, and [Response B] does not provide enough ideas. [Response A] provides lots of creative ideas.
- Both Responses are of good length. [Response A] is slightly more comprehensive and detailed in its answer and provides some helpful tips at the end.
- Both responses were great and contained mostly the same information. Response A included some more ideas about food and drink and also included prep tips so I think it was a little more helpful.
- [Response B] gives ideas are too generic.
- [Response A] is great; it not only provides many fun and creative ideas for hosting a child's birthday party, but it also adds helpful advice on general party preparation and organization.
- Both responses have some good suggestions for a birthday party. [Response A] has more ideas as well as some suggestions for food and drink as well as tips for preparation and organizing.

Rationale Summary formatted in XML:
<summary>
  <reason>provides more creative ideas</reason>
  <reason>provides more helpful tips at the end</reason>
  <reason>does not give generic ideas</reason>
</summary>

==
Example 2:

Which is better (A or B): B

Rationales:
- [Response B] is more helpful and provide more useful ways for the poem's author to enhance the poem. It also has better potential title options than [Response A].
- The analysis that [Response B] did was more helpful in critiquing the poem and providing useful suggestions. [Response A] offered suggestions, but not in a way that was easy to implement.
- [Response B] gave the user constructive feedback about their poem, not just praise, making it a better overall response. Response A was a bit repetitive.
- [Response B] offered better title suggestions.
- [Response A] provides inaccurate information.
- [Response B] was slightly better because it gave a much more thorough analysis and critique of the poem. It provided more context and detail in the critique than [Response B] did, giving better suggestions and examples of specific parts.

Rationale Summary formatted in XML:
<summary>
  <reason>provides constructive feedback</reason>
  <reason>does not provide inaccurate information</reason>
  <reason>gives a more thorough analysis with details</reason>
</summary>

==
Now I will provide information of which is better and rationales.

Which is better: {winner}

Rationales:
{rationales}

Please summarize the rationales in the XML format like the examples above and based on the detailed instruction above.
Directly start with the XML starting with <summary>.

Rationale Summary formatted in XML:"""


DEFAULT_PROMPT_TEMPLATE_FOR_PARAPHRASING = """Your task it to paraphrase the following phrase in three different ways.
The given phrase is about why a certain paragraph is better or worse than another.
When paraphrasing, do not change the meaning much.
You should minimally edit the phrase, such as by changing one or two words.
If the phrase starts with a verb, your paraphrased results must start with a lower cased verb too;
If the phrase starts with "does not" followed by a verb, your paraphrased results must start with "does not" followed by a lower cased verb too.

Phrase: "{bullet_phrase}"

Use the following XML format for your paraphrased phrases:
<phrases>
  <phrase>...</phrase>
  <phrase>...</phrase>
  <phrase>...</phrase>
</phrases>

Three paraphrased phrases in the above XML format:"""


DEFAULT_PROMPT_TEMPLATE_FOR_CLUSTERING = """In this task, you will be given a set of phrases that describe rationales of why one text is better or worse than the other.

Below I provide a list of phrases.

===== BEGINNING OF PHRASES =====
{rationales}
===== END OF PHRASES =====

Your goal is to cluster the provided rationale phrases into {num_clusters} groups that are diverse and representative, and then identify the title for each of the {num_clusters} clusters.
You will return these cluster titles as an XML format like below. DO NOT provide more than {num_clusters} titles.

When doing this, follow the instructions below to the extent possible:
- Have each title concisely about 2-4 words.
- Describe one aspect clearly. For each title, DO NOT use "and" in your phrase (e.g., instead of "is more creative and concise", you should say "is more creative").
- Provide group titles that are distinct enough to each other (mutually exclusive).
- Avoid having many group titles using too similar structures (e.g., do not always say "is more ADJECTIVE", but start sometimes with "provides" or "offers" too).
- Each title MUST begin with a lower-cased verb (e.g., "is...", NOT "Is...") or "does not" followed by a verb.

The format of your output will be like:
<groups>
{few_examples}
</groups>

The titles for {num_clusters} groups are:"""


DEFAULT_FEW_EXAMPLES_FOR_CLUSTERING = [
    'is better organized',
    'is better structured',
    'provides step-by-step procedure',
    'is more accurate',
    'does not provide inaccurate information',
    'provides diverse options',
    'provides external links',
    'provides creative solutions',
    'considers various factors',
    'refuses to answer inapproprite questions',
]
