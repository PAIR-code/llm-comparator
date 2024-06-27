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
 * @fileoverview Utils for LLM Comparator
 */

import difflib from 'jsdifflib';
import jStat from 'jstat';

import {html} from 'lit';
import {classMap} from 'lit/directives/class-map.js';

import {CustomFuncReturnType, CustomFunction, CustomFuncType, Field, FieldType, HistogramSpec, SequenceChunk, SequenceChunkType, SliceWinRate, SortCriteria, TextDiff,} from './types';

// tslint:disable-next-line:no-any difflib does not support Closure imports
// difflib declare placeholder - DO NOT REMOVE

// tslint:disable-next-line:no-any jstat does not support Closure imports
// jStat declare placeholder - DO NOT REMOVE

/**
 * Use difflib library to compute word differences between two string.
 * Given two strings, it first tokenized both strings and sends them to
 * difflib. It returns a TextDiff object, which contains two arrays of parsed
 * segments from both strings and an array of booleans indicating whether the
 * corresponding change type is 'equal' (matched).
 */
export function getTextDiff(textA: string, textB: string): TextDiff {
  // Tokenize words using a regular expression. Different from LIT's version,
  // this makes special characters and spaces as separate tokens too.
  // e.g., for "Hi, my" vs. "Hi I", highlight "Hi".
  const tokenize = (text: string) => text.match(/[\w\d'-]+|\W+/g);
  const wordsA = tokenize(textA) || [];
  const wordsB = tokenize(textB) || [];

  // Handle unusual cases where difflib throws errors.
  const replaceTokensThatThrowErrors = (token: string) =>
      token === 'hasOwnProperty' ? '_hasOwnProperty_' : token;
  const cleanedWordsA = [...wordsA].map(replaceTokensThatThrowErrors);
  const cleanedWordsB = [...wordsB].map(replaceTokensThatThrowErrors);

  const matcher = new difflib.SequenceMatcher(cleanedWordsA, cleanedWordsB);
  const opcodes = matcher.get_opcodes();

  // Store an array of the parsed segments from both strings and whether
  // the change type is 'equal.'
  const textDiff: TextDiff = {parsedA: [], parsedB: [], isEquals: []};

  for (const opcode of opcodes) {
    const changeType = opcode[0];
    const startA = Number(opcode[1]);
    const endA = Number(opcode[2]);
    const startB = Number(opcode[3]);
    const endB = Number(opcode[4]);

    textDiff.parsedA.push(wordsA.slice(startA, endA).join(''));
    textDiff.parsedB.push(wordsB.slice(startB, endB).join(''));
    textDiff.isEquals.push(changeType === 'equal');
  }
  return textDiff;
}

/**
 * Render diff string.
 */
export function renderDiffString(strings: string[], equal: boolean[]) {
  const displaySpans = strings.map((output, i) => {
    const classes = classMap({'highlighted-match': equal[i]});
    return html`<span class=${classes}>${output}</span>`;
  });
  return displaySpans;
}

/**
 * Render text highlighting matched strings.
 */
export function renderSearchedString(
    text: string, searchText: string, caseInsensitive: boolean = true) {
  const pattern = new RegExp(searchText, caseInsensitive === true ? 'gi' : 'g');
  const matches = text.matchAll(pattern);
  const matchList = [...matches];

  if (!matchList.length) {
    return html`${text}`;
  }

  // Multiple matches can exist.
  const matchedResults = matchList.map((match) => {
    return {
      index: match.index as number,
      text: match[0],
    };
  });

  const annotatedText = [];
  for (let j = 0; j < matchedResults.length; j++) {
    if (j === 0) {
      // Text before the first match.
      annotatedText.push(html`${text.substring(0, matchedResults[j].index)}`);
    }
    // Matches are highlighted with css class.
    annotatedText.push(
      html`<span class=${classMap({'highlighted-search-match': true})}
        >${matchedResults[j].text}</span
      >`,
    );
    // Text between this match and next match.
    annotatedText.push(
      html`${text.substring(
        matchedResults[j].index + matchedResults[j].text.length,
        j < matchedResults.length - 1
          ? matchedResults[j + 1].index
          : text.length,
      )}`,
    );
  }
  return annotatedText;
}

/**
 * Search text using regular expression matches.
 */
export function searchText(
  text: string,
  stringToSearch: string,
  ignoreCase = true,
): boolean {
  const pattern = new RegExp(
    stringToSearch,
    ignoreCase === true ? 'i' : undefined,
  );
  return pattern.test(text);
}

/**
 * Format number to percentage.
 */
export function formatRateToPercentage(rate: number) {
  return `${(rate * 100.0).toFixed(1)}%`;
}

/**
 * Compute Win Rate.
 */
export function getWinRate(entry: SliceWinRate) {
  const sum = entry.results['a'] + entry.results['b'] + entry.results['tie'];
  if (sum === 0) {
    return 0.0;
  } else {
    return (entry.results['a'] + 0.5 * entry.results['tie']) / sum;
  }
}

/**
 * Compute avg score from win rate type.
 */
export function getAvgScore(entry: SliceWinRate): number | null {
  const count = entry.count;
  return count === 0 ? null : entry.scoreSum / count;
}

/**
 * Make a new SliceWinRate and initialize it.
 */
export function makeNewSliceWinRate(sliceName: string) {
  const sliceWinRate: SliceWinRate = {
    sliceName,
    count: 0,
    results: {'a': 0, 'b': 0, 'tie': 0, 'unknown': 0},
    scoreSum: 0.0,
    scoreSqSum: 0.0,
  };
  return sliceWinRate;
}

/**
 * Get z-score from confidence level.
 */
export function getZScoreFromConfidenceLevel(confidenceLevel: number) {
  if (confidenceLevel === 0.95) {
    return 1.96;
  } else if (confidenceLevel === 0.99) {
    return 2.576;
  } else if (confidenceLevel === 0.9) {
    return 1.645;
  } else {
    throw new Error(`Use 0.9, 0.95, or 0.99 for confidence level.`);
  }
}

/**
 * Compute the error margin for confidence intervals.
 */
export function calculateErrorMargin(
  count: number,
  scoreSum: number,
  scoreSqSum: number,
  confidenceLevel = 0.95,
) {
  if (count === 0) {
    return 0;
  } else if (count === 1) {
    // Impossible to calculate confidence intervals, but assign a large number
    // to draw long-range intervals to avoid confusion with the range of 0.
    return 10000;
  }
  const variance = scoreSqSum - scoreSum ** 2 / count;
  const standardDeviation = Math.sqrt(variance / (count - 1));
  const standardError = standardDeviation / Math.sqrt(count);

  const zScore = getZScoreFromConfidenceLevel(confidenceLevel);
  const marginOfError = zScore * standardError;
  return marginOfError;
}

/**
 * Compute confidence intervals for mean errors from sum and square sum.
 */
export function getConfidenceIntervalForMeanFromAggregatedStats(
  count: number,
  sum: number,
  squareSum: number,
  isAxisReversed = false,
  confidenceLevel = 0.95,
): [number, number] {
  if (count === 0) {
    return [0, 0];
  }

  const errorMargin = calculateErrorMargin(
    count,
    sum,
    squareSum,
    confidenceLevel,
  );

  const mean = sum / count;

  const errorMarginLeft =
    mean - errorMargin * (isAxisReversed === true ? -1 : 1);
  const errorMarginRight =
    mean + errorMargin * (isAxisReversed === true ? -1 : 1);

  return [errorMarginLeft, errorMarginRight];
}

/**
 * Get confidence intervals for rate (e.g., win rate) using beta distributions.
 */
export function getConfidenceIntervalForRate(
  countTrue: number,
  countFalse: number,
  confidenceLevel = 0.95,
): [number, number] {
  const alpha = countTrue + 0.5;
  const beta = countFalse + 0.5;

  const left = jStat.beta.inv(1.0 - confidenceLevel, alpha, beta);
  const right = jStat.beta.inv(confidenceLevel, alpha, beta);

  return [left, right];
}

/**
 * Get histogram step size.
 */
export function getHistogramStepSize(histogramSpec: HistogramSpec) {
  return (
    (histogramSpec.rangeRight - histogramSpec.rangeLeft) /
    histogramSpec.numberOfBins
  );
}

/**
 * Get histogram index and x-value given spec.
 */
export function getHistogramBinIndexFromValue(
  histogramSpec: HistogramSpec,
  value: number,
) {
  const stepSize = getHistogramStepSize(histogramSpec);
  const binPositionValue = (value - histogramSpec.rangeLeft) / stepSize;
  // In most cases, we use "[left, right)" by using Math.floor, but when
  // diverging schemes are used, we use "(left, right]" by using Math.ceil
  // for the bins on the right half.
  const binIndex =
    histogramSpec.isDivergingScheme === true &&
    binPositionValue > histogramSpec.numberOfBins * 0.5
      ? Math.ceil(binPositionValue) - 1
      : Math.floor(binPositionValue);

  // If value is smaller than min, then min; larger than max, then max.
  if (binIndex < 0) {
    return 0;
  } else if (binIndex > histogramSpec.numberOfBins - 1) {
    return histogramSpec.numberOfBins - 1;
  } else {
    return binIndex;
  }
}

/**
 * Get histogram range from bin index.
 */
export function getHistogramRangeFromBinIndex(
  histogramSpec: HistogramSpec,
  binIndex: number,
) {
  const stepSize = getHistogramStepSize(histogramSpec);
  return {
    left: histogramSpec.rangeLeft + binIndex * stepSize,
    right: histogramSpec.rangeLeft + (binIndex + 1) * stepSize,
  };
}

/**
 * Get floating point precision based on histogram spec.
 */
export function getFloatPrecisionForHistogram(
  histogramSpec: HistogramSpec,
): number {
  // Use a simple heuristic to determine the floating point precision.
  if (
    Math.abs(histogramSpec.rangeRight - histogramSpec.rangeLeft) <
    histogramSpec.numberOfBins
  ) {
    return 2;
  } else if (
    Math.abs(histogramSpec.rangeRight - histogramSpec.rangeLeft) <
    histogramSpec.numberOfBins * 2
  ) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * Get range inclusion for a bin index.
 * When we use the diverging scheme and there are 5 bins, it would be
 * 0: [left, right), 1: [l, r), 2: [l, r], 3: (l, r], and 4: (l, r].
 * For inclusion ("[", "]"), return true.
 */
export function getRangeInclusionFromBinIndex(
  histogramSpec: HistogramSpec,
  binIndex: number,
) {
  return {
    left:
      histogramSpec.isDivergingScheme === false ||
      binIndex <= (histogramSpec.numberOfBins - 1) * 0.5,
    right:
      binIndex === histogramSpec.numberOfBins - 1 ||
      (histogramSpec.isDivergingScheme === true &&
        binIndex >= (histogramSpec.numberOfBins - 1) * 0.5),
  };
}

/**
 * Make a new custom function and initialize it.
 */
export function makeNewCustomFunc(id: number) {
  const customFunc: CustomFunction = {
    id,
    name: '',
    functionType: CustomFuncType.REGEXP,
    functionBody: '',
    returnType: CustomFuncReturnType.BOOLEAN,
    precomputed: false,
  };
  return customFunc;
}

/**
 * Initialize selection information for a custom function.
 */
export function initializeCustomFuncSelections():
    {[key: string]: boolean|number|null;} {
  return {'A': null, 'B': null, 'A-B': null};
}

/**
 * Get field id for custom functions.
 */
export function getFieldIdForCustomFunc(customFuncId: number) {
  return `custom_function:${customFuncId}`;
}

/**
 * Check if a field is a per-model type.
 */
export function isPerModelFieldType(field: Field) {
  return (
      field.type === FieldType.PER_MODEL_BOOLEAN ||
      field.type === FieldType.PER_MODEL_NUMBER ||
      field.type === FieldType.PER_MODEL_CATEGORY ||
      field.type === FieldType.PER_MODEL_TEXT);
}

/**
 * Check if a field is a per-rating type.
 */
export function isPerRatingFieldType(field: Field) {
  return (
    field.type === FieldType.PER_RATING_STRING ||
    field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY
  );
}

/**
 * Get a rounded number as string for float.
 */
export function toFixedIfNeeded(num: number) {
  if (num % 1 !== 0) {
    return num.toFixed(2);
  } else {
    return num.toString();
  }
}

/**
 * Construct img src given a image byte as string.
 */
export function constructImageSrcFromByte(
  imageByte: string,
  imageType = 'jpeg',
) {
  return `data:image/${imageType};base64,${imageByte}`;
}

/**
 * Get the min and max for values (excluding null).
 */
export function getMinAndMax(values: Array<number | null>) {
  const notNullValues = values
    .filter((value) => value != null)
    .map((value) => value!);
  const minValue = notNullValues.length > 0 ? Math.min(...notNullValues) : 0;
  const maxValue = notNullValues.length > 0 ? Math.max(...notNullValues) : 0;
  return {minValue, maxValue};
}

/**
 * Perform group by for string values.
 */
export function groupByValues(values: string[]): {[key: string]: number} {
  const aggregatedCount: {[key: string]: number} = {};
  values.forEach((value: string) => {
    if (!aggregatedCount[value]) {
      aggregatedCount[value] = 0;
    }
    aggregatedCount[value] += 1;
  });
  return aggregatedCount;
}

/**
 * Perform group by and return keys ordered by count desc.
 */
export function groupByAndSortKeys(values: string[]) {
  const aggregatedCount = groupByValues(values);

  return Object.entries(aggregatedCount)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => key);
}

/**
 * Merge two arrays with order preserved. It will be used for extending the
 * domain list with group by results in case the domain list misses some.
 */
export function mergeTwoArrays(
  baseValues: string[],
  extendedValues: string[],
): string[] {
  const baseValueSet = new Set(baseValues);
  return [
    ...baseValues,
    ...extendedValues.filter((value) => !baseValueSet.has(value)),
  ];
}

/**
 * Print custom result values.
 */
export function printCustomFuncResultValue(value: boolean|number|null) {
  if (value == null) {
    return 'NULL';
  } else if (typeof value === 'boolean') {
    return value === true ? 'True' : 'False';
  } else if (typeof value === 'number' && !Number.isInteger(value)) {
    return value.toFixed(3);
  } else {
    return value;
  }
}

/**
 * Convert to number.
 */
export function convertToNumber(
  value: string | boolean | number | null,
): number | null {
  if (typeof value === 'number') {
    return value;
  } else if (value === null) {
    return null;
  } else if (typeof value === 'string') {
    const parsedNumber = Number(value);
    if (!isNaN(parsedNumber)) {
      return parsedNumber;
    }
  }
  return null;
}

/**
 * Convert to boolean.
 */
export function convertToBoolean(
  value: string | boolean | number | null,
): boolean | null {
  if (typeof value === 'boolean') {
    return value;
  } else if (value === null) {
    return null;
  } else if (typeof value === 'string') {
    if (value === 'true' || value === 'True' || value === '1') {
      return true;
    } else if (value === 'false' || value === 'False' || value === '0') {
      return false;
    }
  } else if (typeof value === 'number') {
    if (value === 1) {
      return true;
    } else if (value === 0) {
      return false;
    }
  }
  return null;
}

/**
 * Check if two sorting objects are equal.
 */
export function isEqualSorting(a: SortCriteria, b: SortCriteria): boolean {
  return (
    a.column === b.column &&
    ((a.customField == null && b.customField == null) ||
      (a.customField != null &&
        b.customField != null &&
        a.customField.id === b.customField.id)) &&
    a.modelIndex === b.modelIndex &&
    a.order === b.order
  );
}

/**
 * Compare strings with nulls for sorting.
 */
export function compareStringsWithNulls(a: string | null, b: string | null) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return a.localeCompare(b);
}

/**
 * Compare numbers with nulls for sorting.
 */
export function compareNumbersWithNulls(
  a: number | null,
  b: number | null,
  isDescending: boolean,
) {
  if (a === null && b === null) {
    return 0;
  } else if (a === null) {
    return 1;
  } else if (b === null) {
    return -1;
  } else {
    return isDescending === true ? b - a : a - b;
  }
}

/**
 * Replace space with underscore.
 */
export function replaceSpaceWithUnderscore(text: string) {
  return text.replaceAll(' ', '_');
}

/**
 * Helper for chip label for histogram selections.
 */
export function getHistogramFilterLabel(
  fieldName: string,
  histogramSpec: HistogramSpec | null,
  binIndex: number | null,
  model: string | null = null,
) {
  if (histogramSpec == null || binIndex == null) {
    return '';
  } else {
    const fieldNameWithNoSpace = replaceSpaceWithUnderscore(fieldName);
    const {left, right} = getHistogramRangeFromBinIndex(
      histogramSpec,
      binIndex,
    );
    const leftStr =
      histogramSpec.isBounded === false && binIndex === 0
        ? null
        : left.toFixed(getFloatPrecisionForHistogram(histogramSpec));
    const rightStr =
      histogramSpec.isBounded === false &&
      binIndex === histogramSpec.numberOfBins - 1
        ? null
        : right.toFixed(getFloatPrecisionForHistogram(histogramSpec));

    // prettier-ignore
    const revisedFieldName =
          model == null ?
              fieldNameWithNoSpace :
              model === 'A-B' ?
                  `${fieldNameWithNoSpace}(A) - ${fieldNameWithNoSpace}(B)` :
                  `${fieldNameWithNoSpace}(${model})`;

    const operator = getHistogramStepSize(histogramSpec) > 0 ? '<' : '>';

    const rangeInclusion = getRangeInclusionFromBinIndex(
      histogramSpec,
      binIndex,
    );
    const leftEqual = rangeInclusion.left === true ? '=' : '';
    const rightEqual = rangeInclusion.right === true ? '=' : '';

    if (leftStr !== null && rightStr !== null) {
      return `${leftStr} ${operator}${leftEqual} ${revisedFieldName} ${operator}${rightEqual} ${rightStr}`;
    } else if (leftStr == null) {
      return `${revisedFieldName} ${operator}${rightEqual} ${rightStr}`;
    } else {
      // Change "1.25 < score" to "score > 1.25".
      const flippedOperator = operator === '>' ? '<' : '>';
      return `${revisedFieldName} ${flippedOperator}${leftEqual} ${leftStr}`;
    }
  }
}

/**
 * Helper for chip label for bar selections.
 */
export function getBarFilterLabel(
    customFuncName: string,
    model: string,
    value: boolean|null,
) {
  return `${customFuncName}(${replaceSpaceWithUnderscore(model)}) = ${value}`;
}

/**
 * Helper for cleaning LLM-generated values.
 */
export function cleanValue(val: string | null) {
  // We can include some manual data cleaning pipelines.
  return val;
}

/**
 * Extract text from text or a sequence of SequenceChunk's.
 */
export function extractTextFromTextOrSequenceChunks(
  val: string | SequenceChunk[],
) {
  if (typeof val === 'string') {
    return val;
  } else {
    return val
      .filter((chunk: SequenceChunk) => chunk.type === SequenceChunkType.TEXT)
      .map((chunk: SequenceChunk) => chunk.data)
      .join('\n');
  }
}

/**
 * Normalize a vector.
 */
export function normalizeVector(vector: number[]) {
  const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map((value: number) => value / norm);
}

/**
 * Compute similarities between a vector and a normalized matrix.
 */
export function computeSimilaritiesBetweenVectorAndNormalizedMatrix(
  queryVector: number[],
  normalizedVectors: number[][],
): number[] {
  const dotProduct = (a: number[], b: number[]) =>
    a.reduce((sum, val, i) => sum + val * b[i], 0);

  const normalizedQueryVector = normalizeVector(queryVector);

  return normalizedVectors.map((normalizedVector: number[]) =>
    dotProduct(normalizedQueryVector, normalizedVector),
  );
}
