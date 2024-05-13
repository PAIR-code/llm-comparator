/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Constants for LLM Comparator
 */

import {CustomFuncReturnType, CustomFunction, CustomFuncType, Field, FieldType, HistogramSpec, SortColumn, SortCriteria, SortOrder,} from './types';

/**
 * Field id prefix for the base columns (e.g., index, input_text, score).
 */
const BASE_FIELD_ID_PREFIX = 'base:';

/**
 * Field id for the index column.
 */
export const FIELD_ID_FOR_INDEX = `${BASE_FIELD_ID_PREFIX}index`;

/**
 * Field id for the input text column.
 */
export const FIELD_ID_FOR_INPUT = `${BASE_FIELD_ID_PREFIX}input_text`;

/**
 * Field id for the output text a column.
 */
export const FIELD_ID_FOR_OUTPUT_A = `${BASE_FIELD_ID_PREFIX}output_text_a`;

/**
 * Field id for the output text b column.
 */
export const FIELD_ID_FOR_OUTPUT_B = `${BASE_FIELD_ID_PREFIX}output_text_b`;

/**
 * Field id for the tags column.
 */
export const FIELD_ID_FOR_TAGS = `${BASE_FIELD_ID_PREFIX}tags`;

/**
 * Field id for the score column.
 */
export const FIELD_ID_FOR_SCORE = `${BASE_FIELD_ID_PREFIX}score`;

/**
 * Field id for the concatenated rationales column.
 */
export const FIELD_ID_FOR_RATIONALES = `${BASE_FIELD_ID_PREFIX}rationales`;

/**
 * Field id for the rationale summary column.
 */
export const FIELD_ID_FOR_RATIONALE_LIST = `${BASE_FIELD_ID_PREFIX}rationale_list`;

/**
 * Default column list.
 */
export const DEFAULT_COLUMN_LIST: Field[] = [
  {id: FIELD_ID_FOR_INDEX, name: 'Index', type: FieldType.BASE, visible: true},
  {id: FIELD_ID_FOR_INPUT, name: 'Prompt', type: FieldType.BASE, visible: true},
  {
    id: FIELD_ID_FOR_TAGS,
    name: 'Prompt Categories',
    type: FieldType.BASE,
    visible: false,
  },
  {
    id: FIELD_ID_FOR_OUTPUT_A,
    name: 'Response from Model A',
    type: FieldType.BASE,
    visible: true,
  },
  {
    id: FIELD_ID_FOR_OUTPUT_B,
    name: 'Response from Model B',
    type: FieldType.BASE,
    visible: true,
  },
  {id: FIELD_ID_FOR_SCORE, name: 'Score', type: FieldType.BASE, visible: true},
  {
    id: FIELD_ID_FOR_RATIONALES,
    name: 'Rationales',
    type: FieldType.BASE,
    visible: false,
  },
  {
    id: FIELD_ID_FOR_RATIONALE_LIST,
    name: 'Rationale List',
    type: FieldType.BASE,
    visible: false,
  },
];

/**
 * Default sorting criteria.
 */
export const DEFAULT_SORTING_CRITERIA: SortCriteria = {
  column: SortColumn.NONE,
  customField: null,
  modelIndex: null,
  order: SortOrder.NONE,
};

/**
 * Number of pixels for each text line in table.
 */
// LINT.IfChange
export const LINE_HEIGHT_IN_CELL = 17;
// LINT.ThenChange(../components/example_table.css, ./shared_styles.css)

/**
 * Default number of examples to display.
 */
export const DEFAULT_NUM_EXAMPLES_TO_DISPLAY = 50;

/**
 * Default height for the bar charts for custom functions.
 */
export const DEFAULT_CHART_HEIGHT_FOR_CUSTOM_FUNCS = 60;

/**
 * Default height for the SxS and diff histograms for custom functions.
 */
export const DEFAULT_SXS_HISTOGRAM_HEIGHT_FOR_CUSTOM_FUNCS = 40;

/**
 * Height of the bottom axis for the histograms.
 */
export const HISTOGRAM_BOTTOM_AXIS_HEIGHT = 9;

/**
 * Default histogram spec.
 */
export const DEFAULT_HISTOGRAM_SPEC: HistogramSpec = {
  rangeLeft: -1.75,
  rangeRight: 1.75,
  numberOfBins: 7,
  isBounded: false,
  isDivergingScheme: true,
};

/**
 * Histogram spec for the scale between 1.0 and 5.0.
 */
export const FIVE_POINT_LIKERT_HISTOGRAM_SPEC: HistogramSpec = {
  rangeLeft: 1.0,
  rangeRight: 5.0,
  numberOfBins: 9,
  isBounded: true,
  isDivergingScheme: true,
};

/**
 * Default win rate threshold.
 */
export const DEFAULT_WIN_RATE_THRESHOLD = 0.25;

/**
 * Rationale cluster assignment similarity threshold.
 */
export const DEFAULT_RATIONALE_CLUSTER_SIMILARITY_THRESHOLD = 0.8;

export const BUILT_IN_DEMO_FILES = [
'https://pair-code.github.io/llm-comparator/data/example_tiny.json',
'https://pair-code.github.io/llm-comparator/data/example_arena.json'];

/**
 * Default custom functions provided.
 */
export const INITIAL_CUSTOM_FUNCTIONS: CustomFunction[] = [
  {
    id: -1,  // Will be overwritten.
    name: 'Word count',
    functionType: CustomFuncType.REGEXP,
    functionBody: '\\w+',
    returnType: CustomFuncReturnType.NUMBER,
    precomputed: false,
  },
  {
    id: -1,
    name: 'Contains bulleted lists',
    functionType: CustomFuncType.REGEXP,
    functionBody: '\\n([*-])\\s',
    returnType: CustomFuncReturnType.BOOLEAN,
    precomputed: false,
  },
  {
    id: -1,
    name: 'Contains headings',
    functionType: CustomFuncType.REGEXP,
    functionBody: '#+\\s+.+',
    returnType: CustomFuncReturnType.BOOLEAN,
    precomputed: false,
  },
  {
    id: -1,
    name: 'Contains URLs',
    functionType: CustomFuncType.REGEXP,
    functionBody:
        'https?://[-a-zA-Z0-9&@#/%?=+~_|!:,.;]*[-a-zA-Z0-9&@#/%=+~_|]',
    returnType: CustomFuncReturnType.BOOLEAN,
    precomputed: false,
  },
  {
    id: -1,
    name: 'Starts with "Sure"',
    functionType: CustomFuncType.REGEXP,
    functionBody: '^Sure',
    returnType: CustomFuncReturnType.BOOLEAN,
    precomputed: false,
  },
];
