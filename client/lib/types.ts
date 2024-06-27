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
 * @fileoverview Types for LLM Comparator
 */

// tslint:disable:no-any
export type Constructor<T> =
  | {
      new (...args: any[]): T;
    }
  | ((...args: any[]) => T)
  | Function;
// tslint:enable:no-any

/**
 * Type for A or B.
 */
export enum AOrB {
  A = 'A',
  B = 'B',
}

/**
 * Type for raw individual rater scores with explanations.
 */
// tslint:disable:enforce-name-casing
export interface IndividualRating {
  index: number;
  score: number | null;
  rating_label: string | null;
  is_flipped: boolean | null;
  rationale: string | null;
  // TODO: Support more types.
  custom_fields: {
    [key: string]: string | Array<string | null>;
  };
}

/**
 * Type for fields.
 */
export interface Field {
  id: string;
  name: string;
  type: FieldType;
  visible: boolean;
  domain?: string[];
}

/**
 * Type for bulleted rationale items.
 * - rationale: bulleted summarized rationale (provided by the
 *     preprocessing script).
 * - similarities: similarity scores to each cluster (provided by the
 *     preprocessing script).
 * - assignedClusterIds: list of cluster ids that are valid (excluding
 *     removed clusters). It will be assigned by the client.
 */
export interface RationaleListItem {
  rationale: string;
  similarities: number[];
  assignedClusterIds?: number[];
}

/**
 * Enum for sequence chunk.
 */
export enum SequenceChunkType {
  TEXT = 'text',
  IMAGE_BYTE = 'image_byte',
}

/**
 * Type of sequence chunk to handle multimodal data.
 */
export interface SequenceChunk {
  data: string;
  type: SequenceChunkType;
}

/**
 * Interface for Example.
 */
// tslint:disable:enforce-name-casing
export interface Example {
  index: number;
  input_text: string|SequenceChunk[];
  tags: string[];
  output_text_a: string|SequenceChunk[];
  output_text_b: string|SequenceChunk[];
  score: number | null;
  individual_rater_scores: IndividualRating[];
  rationale_list: RationaleListItem[];
  custom_fields: {
    [key: string]:
      | null
      | number
      | string
      | Array<boolean | null>
      | Array<number | null>
      | Array<string | null>
      | Array<{[key: string]: number}>;
  };
}

/**
 * Data types for custom fields.
 * - number: Numeric value (e.g., rating score, correlation). null is allowed.
 * - string: Generic string (e.g., id key). If your string field can be
 *     thought of as "category" or "text" below, use that instead.
 * - category: For categorical attributes that can be useful when aggregated
 *     with group by operations (e.g., topic). Should be "string".
 * - text: For long text (rendered with scrollable holders similar to
 *     input_text and output_texts).
 * - url: For url (rendered as <a href={url}>{url}</a>).
 * - image path: For image url (rendered as <img src={path} />).
 * - image byte: Raw image byte string in base64 encoding of jpeg (rendered as
 *     <img src={constructImageSrcFromByte(byte)} /> (see utils.ts).
 * Per-model types.
 * - boolean: Boolean value applied to each output (e.g., whether containing
 *     bulleted lists).
 * - number: Numeric value from each output (e.g., word count)
 * - category: Categorical strings (e.g., rating like "Pretty Good")
 * Reserved for required columns.
 * - text: Long string texts.
 * - base: for index, input, outputs, tags, and score.
 */
export enum FieldType {
  NUMBER = 'number',
  STRING = 'string',
  CATEGORY = 'category',
  TEXT = 'text',
  URL = 'url',
  IMAGE_PATH = 'image_path',
  IMAGE_BYTE = 'image_byte',
  PER_MODEL_BOOLEAN = 'per_model_boolean',
  PER_MODEL_NUMBER = 'per_model_number',
  PER_MODEL_CATEGORY = 'per_model_category',
  PER_MODEL_TEXT = 'per_model_text',
  PER_RATING_STRING = 'per_rating_string',
  PER_RATING_PER_MODEL_CATEGORY = 'per_rating_per_model_category',
  BASE = 'base',
}

/**
 * Interface for custom field schema.
 */
export interface CustomFieldSchema {
  name: string;
  type: FieldType;
  domain?: string[];
}

/**
 * Interface for Metadata.
 */
export interface Metadata {
  source_path: string;
  custom_fields_schema: CustomFieldSchema[];
}

/**
 * Interface for Model.
 */
export interface Model {
  name: string;
}

/**
 * Interface for rationale clusters. The title field should be provided by
 * the preprocessing script.
 */
export interface RationaleCluster {
  id: number;
  title: string;
  aWinCount: number;
  bWinCount: number;
}

/**
 * Interface for response from data load api.
 */
export interface DataResponse {
  metadata: Metadata;
  models: Model[];
  examples: Example[];
  rationale_clusters?: RationaleCluster[];
}

/**
 * Interface for error response from data load api.
 */
export interface ErrorResponse {
  error: string;
}

/**
 * Type for chart type.
 */
export enum ChartType {
  BAR_CHART = 'bar',
  HISTOGRAM = 'histogram',
  CUSTOM_FUNCTION = 'custom_function',
  TAG = 'tag',
  RATIONALE_CLUSTER = 'rationale_cluster',
}

/**
 * Interface for the unit for subset selection in charts.
 * It does not include actual selections.
 * Model can be null, number (index), or string (e.g., 'A', 'A-B').
 */
export interface ChartSelectionKey {
  chartType: ChartType;
  fieldId: string;
  model: number | string | null;
}

/**
 * Type for Custom Function type.
 */
export enum CustomFuncType {
  REGEXP = 'Regular Expr.',
  PRECOMPUTED = 'Precomputed',
}

/**
 * Interface for Custom Functions.
 */
export interface CustomFunction {
  id: number;
  name: string;
  functionType: CustomFuncType;
  functionBody: string;
  returnType: CustomFuncReturnType;
  precomputed: boolean;
}

/**
 * Type for Custom Function return type.
 */
export enum CustomFuncReturnType {
  BOOLEAN = 'Boolean',
  NUMBER = 'Number',
}

/**
 * Enum for win rate results.
 */
export enum WinRateResult {
  A = 'a',
  B = 'b',
  Tie = 'tie',
  Unknown = 'unknown',
}

/**
 * Type for storing win rate results.
 */
export type WinRateResults = {
  [key in WinRateResult]: number;
};

/**
 * Interface for win rates for slices of examples.
 */
export interface SliceWinRate {
  sliceName: string;
  count: number;
  results: WinRateResults;
  scoreSum: number;
  scoreSqSum: number;
}

/**
 * Type for sorting column options.
 */
export enum SortColumn {
  NONE = 'None',
  TAGS = 'tags',
  SCORE = 'score',
  FUNC_A = 'value from selected Custom Function for Output A',
  FUNC_B = 'value from selected Custom Function for Output B',
  CUSTOM_ATTRIBUTE = 'custom attribute',
  RATIONALE_CLUSTER =
      'similarity between cluster label and the most similar rationale',
}

/**
 * Type for sorting orders.
 */
export enum SortOrder {
  NONE = 'None',
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Interface for sort criteria.
 */
export interface SortCriteria {
  column: SortColumn;
  customField: Field | null;
  modelIndex: number | null; // 0 for A; 1 for B
  order: SortOrder;
}

/**
 * Container type for a diff between two texts.
 */
export interface TextDiff {
  parsedA: string[];
  parsedB: string[];
  isEquals: boolean[];
}

/**
 * Interface for histogram.
 */
export interface HistogramSpec {
  rangeLeft: number;
  rangeRight: number;
  numberOfBins: number;
  isBounded: boolean;
  isDivergingScheme: boolean;
}

/**
 * Interface for a custom field for ratings selection.
 * (only supporting per_rating_per_model_category for now)
 * TODO: Support more per-rating types.
 */
export interface RatingChartSelection {
  fieldId: string;
  modelIndex: number;
  value: string;
}
