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
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {computed, makeObservable} from 'mobx';

import {styles as sharedStyles} from '../lib/shared_styles.css';

import {styles} from './bar_chart.css';

/**
 * Entry that stores multiple numbers for aggregations (e.g., weighted sum).
 * The count indicates the number of rows to be shown when filtered.
 */
export interface AggregatedEntry {
  count: number;
  weight: number;
}

/**
 * Component for bar charts. Currently for rating scores by individual raters.
 * TODO: Extract common parts in the histogram.
 */
@customElement('comparator-bar-chart')
export class BarChartElement extends MobxLitElement {
  static override styles = [sharedStyles, styles];

  // Ordered list of categories to be presented on the left axis.
  @property({type: Object}) getValueDomain: () => string[] = () => [];

  // Assign a number greater than 1 for grouped bar charts.
  // Then we use getGroupedDataValues instead of getDataValues.
  @property({type: Number}) groupCount = 1;

  // Indicate if a list of a list of values is available.
  @property({type: Boolean}) isNested = false;

  // List of raw values that will be aggregated in this component.
  // For groupCount == 1, use getDataValues; for >1, use getGroupedDataValues.
  // For isNested === true, use getGroupedNestedDataValues.
  @property({type: Object}) getDataValues: () => string[] = () => [];
  @property({type: Object}) getGroupedDataValues: () => string[][] = () => [];
  // List of list of raw values that will be aggregated with weights.
  // For each group (model), for each examples, there exist a list of values
  // (e.g., from multiple raters).
  @property({type: Object}) getGroupedNestedDataValues: () => string[][][] =
    () => [];

  @property({type: Object})
  handleClickBar: (value: string, groupIndex?: number) => void = () => {};
  @property({type: Object}) isAnyBarSelected: (groupIndex?: number) => boolean =
    () => false;
  @property({type: Object})
  isThisBarSelected: (value: string, groupIndex?: number) => boolean = () =>
    false;

  // Highlight certain values (bolded).
  @property({type: Object}) getHighlightedValues: () => string[] = () => [];

  @property({type: Number}) svgWidth = 280;

  @property({type: Number}) barHeight = 14;

  private readonly verticalPaddingBetweenBarsWithinGroup = 1;
  private readonly verticalPadding = 1;

  @property({type: Number}) leftAxisWidth = 110;
  private readonly rightPaddingDefault = 25;
  private readonly rightPaddingForNested = 55;

  @computed
  get aggregatedData(): {[key: string]: AggregatedEntry[]} {
    // Initialize group-by counts.
    const aggregatedCount: {[key: string]: AggregatedEntry[]} = {};
    this.getValueDomain().forEach((value: string) => {
      // prettier-ignore
      const entryPair = Array.from({length: this.groupCount}, () => {
        return {count: 0, weight: 0.0};
      });
      aggregatedCount[value] = entryPair;
    });

    if (this.isNested === true) {
      // For per-rating per-model category types.
      const groupedNestedDataValues: string[][][] =
        this.getGroupedNestedDataValues();
      groupedNestedDataValues.forEach(
        (nestedValues: string[][], groupIndex: number) => {
          // Compute the weighted sum based on count.
          // e.g., if "good" appears 7 times and "bad" appears 3 times,
          // "good" gets 0.7 for weight.
          nestedValues.forEach((values: string[]) => {
            const elementCount = values.length;
            values.forEach((value: string) => {
              aggregatedCount[value][groupIndex].weight += 1.0 / elementCount;
            });
            // Whether a value exists in an array.
            new Set(values).forEach((value: string) => {
              aggregatedCount[value][groupIndex].count += 1;
            });
          });
        },
      );
    } else {
      // For per-model category types when groupCount > 1; otherwise for
      // category types.
      const groupedDataValues: string[][] =
        this.groupCount > 1
          ? this.getGroupedDataValues()
          : [this.getDataValues()];
      groupedDataValues.forEach((values: string[], groupIndex: number) => {
        values.forEach((value: string) => {
          aggregatedCount[value][groupIndex].count += 1;
          aggregatedCount[value][groupIndex].weight += 1.0;
        });
      });
    }
    return aggregatedCount;
  }

  @computed get verticalPaddingForGroup(): number {
    return Math.ceil(this.barHeight / 2);
  }

  @computed get rightPadding(): number {
    return this.isNested === true
      ? this.rightPaddingForNested
      : this.rightPaddingDefault;
  }

  @computed
  get binHeight(): number {
    return (
      (this.barHeight + this.verticalPaddingBetweenBarsWithinGroup) *
        this.groupCount +
      this.verticalPaddingForGroup * 2
    );
  }

  @computed
  get svgHeight(): number {
    return (
      this.binHeight * this.getValueDomain().length + this.verticalPadding * 2
    );
  }

  @computed
  get barMaxWidth(): number {
    return this.svgWidth - this.rightPadding - this.leftAxisWidth;
  }

  constructor() {
    super();
    makeObservable(this);
  }

  private renderLeftAxis() {
    const paddingBetweenBarAndAxisLine = 1;
    const tickLength = 2;
    const paddingBetweenTickAndLabel = 2;

    const renderAxis = svg`
        <line class="axis"
          x1=${-paddingBetweenBarAndAxisLine}
          x2=${-paddingBetweenBarAndAxisLine}
          y1="0"
          y2=${this.binHeight * this.getValueDomain().length} />`;

    const styleAxisLabel = (value: string) =>
      classMap({
        'axis-label': true,
        'highlighted': this.getHighlightedValues().includes(value),
      });

    // prettier-ignore
    const renderTicks = this.getValueDomain().map(
        (value, tickIndex) => svg`
          <g transform="translate(0, ${(tickIndex + 0.5) * this.binHeight})">
            <line class="axis"
              x1=${-paddingBetweenBarAndAxisLine}
              x2=${-paddingBetweenBarAndAxisLine - tickLength}
              y1="0"
              y2="0" />
            <text class=${styleAxisLabel(value)}
              x=${-paddingBetweenBarAndAxisLine - tickLength -
                  paddingBetweenTickAndLabel}>
              <title>${value}</title>
              ${value}
            </text>
          </g>`);

    return svg`
        ${renderAxis}
        ${renderTicks}`;
  }

  private renderGroupedBar(
    value: string,
    entryPair: AggregatedEntry[],
    maxCount: number,
    index: number,
  ) {
    const renderBars = entryPair.map(
      (entry: AggregatedEntry, groupIndex: number) => {
        // Bar widths are determined based on weights.
        const barWidth = (entry.weight * this.barMaxWidth) / maxCount;

        const binRectClass = (value: string) =>
          classMap({
            'bar': true,
            'some-selected': this.isAnyBarSelected(groupIndex),
            'selected': this.isThisBarSelected(value, groupIndex),
            'a-color': this.groupCount === 2 && groupIndex === 0,
            'b-color': this.groupCount === 2 && groupIndex === 1,
          });
        const binTextClass = (value: string) =>
          classMap({
            'bar-label': true,
            'some-selected': this.isAnyBarSelected(groupIndex),
            'selected': this.isThisBarSelected(value, groupIndex),
          });

        const barAreaHeight =
          this.barHeight + this.verticalPaddingBetweenBarsWithinGroup;
        return svg`
        <g transform="translate(0,
                                ${
                                  this.verticalPaddingForGroup +
                                  barAreaHeight * groupIndex
                                })">
          <rect class=${binRectClass(value)}
            x="0"
            y="0"
            width=${barWidth}
            height=${this.barHeight} />
          <text class=${binTextClass(value)}
            x=${barWidth}
            y=${barAreaHeight * 0.5}
            dx="1">
            ${
              entry.weight > 0.0
                ? this.isNested === true
                  ? `${entry.weight.toFixed(1)} (${entry.count})`
                  : entry.count
                : ''
            }
          </text>
          <rect class="clickable-transparent-area clickable"
            x="0"
            y="0"
            width=${this.barMaxWidth}
            height=${this.barHeight}
            @click=${() => void this.handleClickBar(value, groupIndex)} />
        </g>`;
      },
    );

    // prettier-ignore
    return svg`
        <g transform="translate(0, ${index * this.binHeight})">
          ${renderBars}
        </g>`;
  }

  override render() {
    const aggregatedWeights: number[] = Object.values(this.aggregatedData)
      .flat(2)
      .map((entry: AggregatedEntry) => entry.weight);
    const maxWeight = Math.max(1.0, Math.max(...aggregatedWeights));

    const renderGroupedBars = this.getValueDomain().map(
      (value: string, index: number) => {
        const entryPair = this.aggregatedData[value];
        return this.renderGroupedBar(value, entryPair, maxWeight, index);
      },
    );

    // prettier-ignore
    return html`
        <svg class="bar-chart"
          width=${this.svgWidth}
          height=${this.svgHeight}>
          <g transform="translate(${
              this.leftAxisWidth}, ${this.verticalPadding})">
            <g>${this.renderLeftAxis()}</g>
            <g>${renderGroupedBars}</g>
          </g>
        </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-bar-chart': BarChartElement;
  }
}
