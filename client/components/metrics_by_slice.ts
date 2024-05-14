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

// tslint:disable:no-new-decorators
import {MobxLitElement} from '@adobe/lit-mobx';
import {html, svg} from 'lit';
import {customElement} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {computed, makeObservable, observable} from 'mobx';

import {core} from '../core';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import {
  AOrB,
  ChartType,
  Example,
  SliceWinRate,
  WinRateResult,
} from '../lib/types';
import {
  compareNumbersWithNulls,
  formatRateToPercentage,
  getAvgScore,
  getConfidenceIntervalForMeanFromAggregatedStats,
  getConfidenceIntervalForRate,
  getWinRate,
  makeNewSliceWinRate,
} from '../lib/utils';
import {AppState} from '../services/state_service';

import {styles} from './metrics_by_slice.css';

enum SortColumn {
  COUNT = 'count',
  AVG_SCORE = 'avg_score',
  WIN_RATE = 'win_rate',
  TAG = 'tag',
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Component for visualizing avg score and win rate metrics by slice.
 */
@customElement('comparator-metrics-by-slice')
export class MetricsBySliceElement extends MobxLitElement {
  private readonly appState = core.getService(AppState);

  static override styles = [sharedStyles, styles];

  private readonly distributionAreaWidth = 60;
  private readonly barAreaWidth = 60;
  private readonly barHeight = 16;

  private readonly numRowsDisplayedWhenCollapsed = 10;

  @observable sortColumn: SortColumn = SortColumn.COUNT;
  @observable sortOrder: SortOrder = SortOrder.DESC;

  @observable isChartCollapsed = true;

  private readonly winRateMiddlePoint = 0.5;

  /**
   * Determine the set of values.
   */
  @computed get listTagValues(): string[] {
    const valueSet = new Set<string>(
      this.appState.examples.map((ex: Example) => ex.tags).flat(),
    );
    return [...valueSet];
  }

  /**
   * Determine the win rate for a score and accumulate to SliceWinRate.
   */
  private accumulateWinRateForExample(
    sliceWinRate: SliceWinRate,
    ex: Example,
    threshold = this.appState.winRateThreshold,
  ) {
    sliceWinRate.count += 1;
    if (ex.score == null) {
      sliceWinRate.results[WinRateResult.Unknown] += 1;
    } else if (ex.score > this.appState.scoreMiddlePoint + threshold) {
      sliceWinRate.results[WinRateResult.A] += 1;
    } else if (ex.score < this.appState.scoreMiddlePoint - threshold) {
      sliceWinRate.results[WinRateResult.B] += 1;
    } else {
      sliceWinRate.results[WinRateResult.Tie] += 1;
    }
    if (ex.score != null) {
      sliceWinRate.scoreSum += ex.score;
      sliceWinRate.scoreSqSum += ex.score ** 2;
    }
  }

  /**
   * Compute win rates grouped by tags only for selected examples
   * (i.e., filteredExamples), but keep the default order of the tags
   * obtained from the counts for the tags for all examples.
   */
  @computed
  private get computeWinRatesByTags(): SliceWinRate[] {
    const chartSelectionKey = {
      chartType: ChartType.TAG,
      fieldId: 'tag',
      model: null,
    };
    const filteredExamples =
      this.appState.getFilteredExamplesExceptForParticularChart(
        chartSelectionKey,
      );

    // Compute win rates grouped by tags over the filtered examples.
    const aggregatedByTags: {[key: string]: SliceWinRate} = {};
    aggregatedByTags['All'] = makeNewSliceWinRate('All');
    this.listTagValues.forEach((tag: string) => {
      aggregatedByTags[tag] = makeNewSliceWinRate(tag);
    });

    filteredExamples.forEach((ex: Example) => {
      this.accumulateWinRateForExample(aggregatedByTags['All'], ex);
      ex.tags.forEach((tag: string) => {
        this.accumulateWinRateForExample(aggregatedByTags[tag], ex);
      });
    });

    // Add a small number for tie break (if rate is same, use count).
    const smallNumber = 0.0001;
    const rate = (
      winnerCount: number,
      tieCount: number,
      totalCount: number,
    ) => {
      if (totalCount === 0) {
        return 0;
      }
      return (winnerCount + 0.5 * tieCount + smallNumber) / totalCount;
    };

    return Object.values(aggregatedByTags).sort((i, j) => {
      if (this.sortColumn === SortColumn.COUNT) {
        if (this.sortOrder === SortOrder.DESC) {
          return j.count - i.count;
        } else {
          return i.count - j.count;
        }
      } else if (this.sortColumn === SortColumn.AVG_SCORE) {
        return compareNumbersWithNulls(
          getAvgScore(i),
          getAvgScore(j),
          this.sortOrder === SortOrder.DESC,
        );
      } else if (this.sortColumn === SortColumn.WIN_RATE) {
        if (this.sortOrder === SortOrder.DESC) {
          return (
            rate(j.results['a'], j.results['tie'], j.count) -
            rate(i.results['a'], i.results['tie'], i.count)
          );
        } else {
          return (
            rate(j.results['b'], j.results['tie'], j.count) -
            rate(i.results['b'], i.results['tie'], i.count)
          );
        }
      } else {
        if (this.sortOrder === SortOrder.DESC) {
          return j.sliceName.localeCompare(i.sliceName);
        } else {
          return i.sliceName.localeCompare(j.sliceName);
        }
      }
    });
  }

  constructor() {
    super();
    makeObservable(this);
  }

  // Render one of the three bars (e.g., for a, b, or tie) in a row.
  private renderWinRateBar(entry: SliceWinRate, result: WinRateResult) {
    const results = entry.results;

    const barCount = results[result];
    const barWidth =
      (this.barAreaWidth * barCount) / (entry.count - results['unknown']);

    const xOffset =
      (this.barAreaWidth *
        (result === 'b'
          ? results['a'] + results['tie']
          : result === 'tie'
            ? results['a']
            : 0)) /
      (entry.count - results['unknown']);
    const xTextOffset = result !== 'b' ? 3 : barWidth - 3;
    const textClass = classMap({'right-aligned': result === 'b'});

    // prettier-ignore
    return svg`
        <g transform="translate(${xOffset}, 0)">
          <rect class="bar win-rate-result-${result}"
            x="0" y="0" width=${barWidth} height=${this.barHeight} />
          ${result !== 'tie' && barCount > 0 ?
            svg`
              <text class=${textClass}
                x=${xTextOffset} y=${this.barHeight - 4}>
                ${barCount}
              </text>` :
            ''}
        </g>`;
  }

  // Check if the value is significantly higher or lower than the base value.
  private isSignificantWinner(
    model: AOrB,
    value: number | null,
    baseValue: number,
    intervalLeft: number,
    intervalRight: number,
  ) {
    if (value == null) {
      return false;
    }

    if (model === AOrB.A) {
      return (
        value - baseValue > 0 &&
        intervalLeft - baseValue > 0 &&
        intervalRight - baseValue > 0
      );
    } else {
      return (
        value - baseValue < 0 &&
        intervalLeft - baseValue < 0 &&
        intervalRight - baseValue < 0
      );
    }
  }

  // Render a confidence interval chart for average scores.
  private renderScoreConfIntervalChart(
    avgScore: number | null,
    intervalLeft: number,
    intervalRight: number,
  ) {
    if (avgScore == null) {
      return html`<svg
        width=${this.distributionAreaWidth}
        height=${this.barHeight}></svg>`;
    }

    const histogramSpec = this.appState.histogramSpecForScores;
    const xValue = (score: number) => {
      const ratio = (score - histogramSpec.rangeLeft) /
          (histogramSpec.rangeRight - histogramSpec.rangeLeft);
      return this.distributionAreaWidth *
          (this.appState.isFlipScoreHistogramAxis === true ? (1.0 - ratio) :
                                                             ratio);
    };

    const styleElement = (className: string) => classMap({
      'avg-score-point': className === 'avg-score-point',
      'error-bar': className === 'error-bar',
      'a-win-color': this.isSignificantWinner(
          AOrB.A,
          avgScore,
          this.appState.scoreMiddlePoint,
          intervalLeft,
          intervalRight,
          ),
      'b-win-color': this.isSignificantWinner(
          AOrB.B,
          avgScore,
          this.appState.scoreMiddlePoint,
          intervalLeft,
          intervalRight,
          ),
    });

    // TODO: Use tooltip for confidence interval details.
    const tooltipText = `${`95% CI: [${intervalLeft.toFixed(
      3,
    )}, ${intervalRight.toFixed(3)}]`}`;

    // prettier-ignore
    return html`
        <svg
          width=${this.distributionAreaWidth + 2}
          height=${this.barHeight}>
          <g transform="translate(1, ${this.barHeight * 0.5})">
            <line class="middle-point-vertical"
              x1=${xValue(this.appState.scoreMiddlePoint)}
              x2=${xValue(this.appState.scoreMiddlePoint)}
              y1=${-this.barHeight * 0.5}
              y2=${this.barHeight * 0.5} />
            <line class=${styleElement('error-bar')}
              x1=${xValue(intervalLeft)}
              x2=${xValue(intervalRight)}
              y1="0"
              y2="0" />
            <circle class=${styleElement('avg-score-point')}
              cx=${xValue(avgScore)}
              cy="0"
              r=${3}>
              <title>${tooltipText}</title>
            </circle>
          </g>
        </svg>`;
  }

  private renderAvgScoreCell(entry: SliceWinRate) {
    const avgScore = getAvgScore(entry);

    const histogramSpec = this.appState.histogramSpecForScores;
    const [intervalLeft, intervalRight] =
      getConfidenceIntervalForMeanFromAggregatedStats(
        entry.count,
        entry.scoreSum,
        entry.scoreSqSum,
        histogramSpec.rangeLeft - histogramSpec.rangeRight > 0,
      );

    const styleAvgScoreNumber = classMap({
      'a-win-color-bg-darker': this.isSignificantWinner(
          AOrB.A,
          avgScore,
          this.appState.scoreMiddlePoint,
          intervalLeft,
          intervalRight,
          ),
      'b-win-color-bg-darker': this.isSignificantWinner(
          AOrB.B,
          avgScore,
          this.appState.scoreMiddlePoint,
          intervalLeft,
          intervalRight,
          ),
    });

    const renderScoreConfIntervalChart = this.renderScoreConfIntervalChart(
      avgScore,
      intervalLeft,
      intervalRight,
    );

    return html` <div class="score-avg-container">
      <div class="number">
        <span class=${styleAvgScoreNumber}>
          ${avgScore == null ? '' : avgScore.toFixed(2)}
        </span>
      </div>
      <div class="score-avg-chart">${renderScoreConfIntervalChart}</div>
    </div>`;
  }

  // Render a win rate chart using a stacked percentage bar chart.
  private renderWinRateChart(
      winRate: number,
      entry: SliceWinRate,
      intervalLeft: number|null,
      intervalRight: number|null,
  ) {
    const styleElement = (className: string) =>
      classMap({
        'win-rate-point': className === 'win-rate-point',
        'win-rate-confidence-interval':
          className === 'win-rate-confidence-interval',
        'a-win-color':
          intervalLeft != null &&
          intervalRight != null &&
          this.isSignificantWinner(
            AOrB.A,
            winRate,
            this.winRateMiddlePoint,
            intervalLeft,
            intervalRight,
          ),
        'b-win-color':
          intervalLeft != null &&
          intervalRight != null &&
          this.isSignificantWinner(
            AOrB.B,
            winRate,
            this.winRateMiddlePoint,
            intervalLeft,
            intervalRight,
          ),
      });

    const renderConfidenceInterval =
      intervalLeft != null && intervalRight != null
        ? svg`
        <line class=${styleElement('win-rate-confidence-interval')}
          x1=${(this.barAreaWidth * intervalLeft).toFixed()}
          y1=${this.barHeight * 0.5}
          x2=${(this.barAreaWidth * intervalRight).toFixed()}
          y2=${this.barHeight * 0.5} />`
        : svg``;

    // TODO: Use tooltip for confidence interval details.
    const tooltipText =
      intervalLeft != null && intervalRight != null
        ? `${`95% CI: [${intervalLeft.toFixed(3)}, ${intervalRight.toFixed(
            3,
          )}]`}`
        : '';

    const renderWinRatePoint = svg`
        <circle class=${styleElement('win-rate-point')}
          cx=${(this.barAreaWidth * winRate).toFixed()}
          r="3"
          cy=${this.barHeight * 0.5}>
          <title>${tooltipText}</title>
        </circle>`;

    // prettier-ignore
    return html`
        <svg width=${this.barAreaWidth + 2} height=${this.barHeight}>
          <g transform="translate(1, 0)">
            ${entry.count - entry.results[WinRateResult.Unknown] > 0 ?
              svg`
                ${this.renderWinRateBar(entry, WinRateResult.Tie)}
                ${this.renderWinRateBar(entry, WinRateResult.B)}
                ${this.renderWinRateBar(entry, WinRateResult.A)}
                <line class="middle-point-vertical"
                  x1=${this.barAreaWidth * 0.5}
                  y1="0"
                  x2=${this.barAreaWidth * 0.5}
                  y2=${this.barHeight} />
                ${renderConfidenceInterval}
                ${renderWinRatePoint}` :
              ''}
            </g>
        </svg>`;
  }

  private renderWinRateCell(entry: SliceWinRate) {
    const winRate = getWinRate(entry);

    const [winRateIntervalLeft, winRateIntervalRight] =
      getConfidenceIntervalForRate(
        entry.results['a'] + entry.results['tie'] * 0.5,
        entry.results['b'] + entry.results['tie'] * 0.5,
      );

    const styleWinRateNumber = classMap({
      'a-win-color-bg-darker': this.isSignificantWinner(
          AOrB.A,
          winRate,
          this.winRateMiddlePoint,
          winRateIntervalLeft,
          winRateIntervalRight,
          ),
      'b-win-color-bg-darker': this.isSignificantWinner(
          AOrB.B,
          winRate,
          this.winRateMiddlePoint,
          winRateIntervalLeft,
          winRateIntervalRight,
          ),
    });

    const renderWinRateChart = this.renderWinRateChart(
        winRate,
        entry,
        winRateIntervalLeft,
        winRateIntervalRight,
    );

    return html` <div class="win-rate-container">
      <div class="number">
        <span class=${styleWinRateNumber}>
          ${entry.count > 0 ? html`${formatRateToPercentage(winRate)}` : ''}
        </span>
      </div>
      <div class="win-rate-chart"> ${renderWinRateChart} </div>
    </div>`;
  }

  // Render a stacked bar chart for a slice.
  private renderSliceRow(entry: SliceWinRate) {
    const sliceName = entry.sliceName;

    const handleClickSliceRow = () => {
      if (sliceName === 'All' || sliceName === this.appState.selectedTag) {
        this.appState.selectedTag = null;
      } else {
        this.appState.selectedTag = sliceName;
      }
    };

    return html` <tr
      class=${classMap({
        'clickable': true,
        'selected': entry.sliceName === this.appState.selectedTag,
      })}
      @click=${handleClickSliceRow}>
      <td class="tag-and-count" title=${entry.sliceName}>
        <span class="tag">${entry.sliceName}</span>
        <small class="count">
          (<span class="number">${entry.count}</span>)
        </small>
      </td>
      <td class="score-avg">${this.renderAvgScoreCell(entry)}</td>
      <td class="win-rate">${this.renderWinRateCell(entry)}</td>
    </tr>`;
  }

  // Render a list of stacked bar charts for slices.
  private renderWinRateBySliceChart() {
    const renderSliceRows = this.computeWinRatesByTags.map(
      (entry: SliceWinRate) => this.renderSliceRow(entry),
    );

    const styleComponentContent = classMap({
      'sidebar-component-content': true,
      'collapsed': this.isChartCollapsed === true,
    });

    const handleClickSortHeader = (columnName: SortColumn) => {
      if (this.sortColumn === columnName) {
        this.sortOrder =
          this.sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
      } else {
        this.sortColumn = columnName;
      }
    };
    const styleHeaderCell = (columnName: string) =>
      classMap({
        'tag': columnName === 'tag',
        'example-count': columnName === 'count',
        'score-avg': columnName === 'avg_score',
        'win-rate': columnName === 'win_rate',
        'clickable': true,
        'sort-selected': this.sortColumn === columnName,
      });

    // prettier-ignore
    return html`
        <div class="sidebar-component">
          <div class="sidebar-component-title">
            Metrics by Prompt Category
          </div>
          <div class=${styleComponentContent}>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th class="tag-and-count">
                      <span class=${styleHeaderCell('tag')}
                        title="Click to sort by tag name"
                        @click=${
        () => void handleClickSortHeader(SortColumn.TAG)}>
                        Category
                      </span>
                      <span class=${styleHeaderCell('count')}
                        title="Click to sort by example count"
                        @click=${
        () => void handleClickSortHeader(SortColumn.COUNT)}>
                        (cnt)
                      </span>
                    </th>
                    <th class=${styleHeaderCell('avg_score')}
                      title="Click to sort by average score"
                      @click=${
        () => void handleClickSortHeader(SortColumn.AVG_SCORE)}>
                      Avg Score
                    </th>
                    <th class=${styleHeaderCell('win_rate')}
                      title="Click to sort by win rate"
                      @click=${
        () => void handleClickSortHeader(SortColumn.WIN_RATE)}>
                      Win Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  ${renderSliceRows}
                </tbody>
              </table>
            </div>
          </div>
          ${
        renderSliceRows.length > this.numRowsDisplayedWhenCollapsed ?
            html`
              <div class="sidebar-component-footer">
                <div @click=${
                () => this.isChartCollapsed = !this.isChartCollapsed}>
                  ${
                this.isChartCollapsed === true ? html`<span>Expand</span>` :
                                                 html`<span>Collapse</span>`}
                </div>
              </div>` :
            ''}
        </div>`;
  }

  override render() {
    return html`${this.renderWinRateBySliceChart()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-metrics-by-slice': MetricsBySliceElement;
  }
}
