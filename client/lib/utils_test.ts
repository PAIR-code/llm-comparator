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

import 'jasmine';

import {HistogramSpec} from './types';
import {
  computeSimilaritiesBetweenVectorAndNormalizedMatrix,
  getConfidenceIntervalForMeanFromAggregatedStats,
  getConfidenceIntervalForRate,
  getHistogramBinIndexFromValue,
  getHistogramRangeFromBinIndex,
  getTextDiff,
  normalizeVector,
} from './utils';

describe('getTextDiff test', () => {
  it('gets text diffs for empty strings', () => {
    const diff = getTextDiff('', '');
    expect(diff.parsedA).toEqual([]);
    expect(diff.parsedB).toEqual([]);
    expect(diff.isEquals).toEqual([]);
  });

  it('gets text diffs for different lengths', () => {
    const diff = getTextDiff('hello', 'hello world');
    expect(diff.parsedA).toEqual(['hello', '']);
    expect(diff.parsedB).toEqual(['hello', ' world']);
    expect(diff.isEquals).toEqual([true, false]);
  });

  it('gets text diffs for single word', () => {
    // Matching words.
    let diff = getTextDiff('hello', 'hello');
    expect(diff.parsedA).toEqual(['hello']);
    expect(diff.parsedB).toEqual(['hello']);
    expect(diff.isEquals).toEqual([true]);

    // Non-matching words.
    diff = getTextDiff('hello', 'world');
    expect(diff.parsedA).toEqual(['hello']);
    expect(diff.parsedB).toEqual(['world']);
    expect(diff.isEquals).toEqual([false]);
  });

  it('gets text diffs for multiple words', () => {
    const diff = getTextDiff('I went', 'Tom Smith went');
    expect(diff.parsedA).toEqual(['I', ' went']);
    expect(diff.parsedB).toEqual(['Tom Smith', ' went']);
    expect(diff.isEquals).toEqual([false, true]);
  });

  it('gets text diffs with special characters', () => {
    const diff = getTextDiff('Hi Tom How', 'Hi Tom! How');
    expect(diff.parsedA).toEqual(['Hi Tom', ' ', 'How']);
    expect(diff.parsedB).toEqual(['Hi Tom', '! ', 'How']);
    expect(diff.isEquals).toEqual([true, false, true]);
  });
});

describe('getHistogramBinIndexFromValue test', () => {
  it('gets histogram indices', () => {
    const histogramSpec: HistogramSpec = {
      rangeLeft: 0.0,
      rangeRight: 1.0,
      numberOfBins: 5,
      isBounded: true,
      isDivergingScheme: true,
    };
    expect(getHistogramBinIndexFromValue(histogramSpec, -10.0)).toEqual(0);
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.2)).toEqual(1);
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.4)).toEqual(2);
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.5)).toEqual(2);
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.6)).toEqual(2);
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.8)).toEqual(3);
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.9)).toEqual(4);
  });

  it('gets histogram indices for negative steps', () => {
    const histogramSpec: HistogramSpec = {
      rangeLeft: 1.0,
      rangeRight: -1.0,
      numberOfBins: 5,
      isBounded: false,
      isDivergingScheme: true,
    };
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.3)).toEqual(1);
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.0)).toEqual(2);
    expect(getHistogramBinIndexFromValue(histogramSpec, -10.0)).toEqual(4);
  });

  it('gets histogram indices for numbers between bins', () => {
    const histogramSpec: HistogramSpec = {
      rangeLeft: 0.0,
      rangeRight: 1.0,
      numberOfBins: 4,
      isBounded: true,
      isDivergingScheme: false,
    };
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.499)).toEqual(1);
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.5)).toEqual(2);
    expect(getHistogramBinIndexFromValue(histogramSpec, 0.501)).toEqual(2);
  });
});

describe('getHistogramRangeFromBinIndex test', () => {
  it('gets histogram bin range', () => {
    const histogramSpec: HistogramSpec = {
      rangeLeft: 0.0,
      rangeRight: 1.0,
      numberOfBins: 5,
      isBounded: true,
      isDivergingScheme: false,
    };
    const range0 = getHistogramRangeFromBinIndex(histogramSpec, 0);
    expect(range0.left).toEqual(0.0);
    expect(range0.right).toEqual(0.2);
    const range1 = getHistogramRangeFromBinIndex(histogramSpec, 1);
    expect(range1.left).toEqual(0.2);
    expect(range1.right).toEqual(0.4);
    const range4 = getHistogramRangeFromBinIndex(histogramSpec, 4);
    expect(range4.left).toEqual(0.8);
    expect(range4.right).toEqual(1.0);
  });
});

describe('getConfidenceIntervalFromAggregatedStats test', () => {
  it('gets the confidence interval for a reversed axis', () => {
    const scores = [0.3, 0.0, 0.1, 0.2, -0.1];
    const scoreSum = scores.reduce((acc, val) => acc + val, 0);
    const scoreSqSum = scores.reduce((acc, val) => acc + val * val, 0);

    const isAxisReversed = true;
    const confidenceInterval = getConfidenceIntervalForMeanFromAggregatedStats(
      scores.length,
      scoreSum,
      scoreSqSum,
      isAxisReversed,
    );

    // Symmetrical.
    const meanScore = scoreSum / scores.length;
    const middlePoint = (confidenceInterval[0] + confidenceInterval[1]) * 0.5;
    const smallNumber = 0.0001;
    expect(Math.abs(middlePoint - meanScore)).toBeLessThan(smallNumber);

    // Direction check (if the axis is reversed, left value must be higher).
    expect(confidenceInterval[0]).toBeGreaterThanOrEqual(meanScore);
    expect(confidenceInterval[1]).toBeLessThanOrEqual(meanScore);
  });

  it('gets the confidence interval for a non-reversed axis', () => {
    const scores = [0.3, 0.0, -0.8, 0.2, -0.3];
    const scoreSum = scores.reduce((acc, val) => acc + val, 0);
    const scoreSqSum = scores.reduce((acc, val) => acc + val * val, 0);

    const isAxisReversed = false;
    const confidenceInterval = getConfidenceIntervalForMeanFromAggregatedStats(
      scores.length,
      scoreSum,
      scoreSqSum,
      isAxisReversed,
    );

    // Direction check.
    const meanScore = scoreSum / scores.length;
    expect(confidenceInterval[0]).toBeLessThanOrEqual(meanScore);
    expect(confidenceInterval[1]).toBeGreaterThanOrEqual(meanScore);
  });

  it('gets the confidence intervals for multiple confidence levels', () => {
    const scores = [0.3, 0.0, -0.8, 0.2, -0.3];
    const scoreSum = scores.reduce((acc, val) => acc + val, 0);
    const scoreSqSum = scores.reduce((acc, val) => acc + val * val, 0);

    const isAxisReversed = false;
    const confidenceIntervalFor95 =
      getConfidenceIntervalForMeanFromAggregatedStats(
        scores.length,
        scoreSum,
        scoreSqSum,
        isAxisReversed,
        0.95,
      );
    const confidenceIntervalFor99 =
      getConfidenceIntervalForMeanFromAggregatedStats(
        scores.length,
        scoreSum,
        scoreSqSum,
        isAxisReversed,
        0.99,
      );

    // Range size.
    const rangeSizeFor95 =
      confidenceIntervalFor95[1] - confidenceIntervalFor95[0];
    const rangeSizeFor99 =
      confidenceIntervalFor99[1] - confidenceIntervalFor99[0];

    expect(rangeSizeFor95).toBeLessThan(rangeSizeFor99);
  });

  it('gets the confidence interval for rates', () => {
    const countWin = 55;
    const countLoss = 45;
    const confidenceInterval = getConfidenceIntervalForRate(
      countWin,
      countLoss,
    );

    // Direction check.
    const rate = countWin / (countWin + countLoss);
    expect(confidenceInterval[0]).toBeLessThanOrEqual(rate);
    expect(confidenceInterval[1]).toBeGreaterThanOrEqual(rate);
  });

  it('gets the confidence interval for rates for multiple sample sizes', () => {
    // Win 12, Loss 8
    const confidenceIntervalForSmallSample = getConfidenceIntervalForRate(
      12,
      8,
    );
    // Win 60, Loss 40
    const confidenceIntervalForLargeSample = getConfidenceIntervalForRate(
      60,
      40,
    );

    // Range size.
    const rangeSizeForSmall =
      confidenceIntervalForSmallSample[1] - confidenceIntervalForSmallSample[0];
    const rangeSizeForLarge =
      confidenceIntervalForLargeSample[1] - confidenceIntervalForLargeSample[0];

    expect(rangeSizeForLarge).toBeLessThan(rangeSizeForSmall);
  });
});

describe('getCosineSimilarity test', () => {
  it('gets the vector normalization', () => {
    const unnormalizedVector = [1.0, 9.0, 4.0, 1.0, 1.0];
    const normalizedVector = normalizeVector(unnormalizedVector);
    const normalizedVectorAnswer = [0.1, 0.9, 0.4, 0.1, 0.1];

    expect(normalizedVectorAnswer[0]).toEqual(normalizedVector[0]);
    expect(normalizedVectorAnswer[1]).toEqual(normalizedVector[1]);
    expect(normalizedVectorAnswer[2]).toEqual(normalizedVector[2]);
  });

  it('gets the cosine similarity', () => {
    const queryVector = [0.2, 0.4];
    const matrix = [
      [0.1, 0.2],
      [0.1, 0.21],
      [0.1, -0.1],
    ];
    const normalizedMatrix = matrix.map((vector: number[]) =>
      normalizeVector(vector),
    );
    const similarities = computeSimilaritiesBetweenVectorAndNormalizedMatrix(
      queryVector,
      normalizedMatrix,
    );

    // If norms are the same, similarity would be 1.0.
    const verySmallNumber = 0.0001;
    expect(similarities[0] - 1.0).toBeLessThan(verySmallNumber);
    // If more similar, similarity would be higher.
    expect(similarities[1]).toBeGreaterThan(similarities[2]);
  });
});
