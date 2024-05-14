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
import {computed, makeObservable, observable} from 'mobx';

import {
  DEFAULT_HISTOGRAM_SPEC,
  HISTOGRAM_BOTTOM_AXIS_HEIGHT,
} from '../lib/constants';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import {AOrB, HistogramSpec} from '../lib/types';
import {
  getFloatPrecisionForHistogram,
  getHistogramBinIndexFromValue,
  getHistogramRangeFromBinIndex,
} from '../lib/utils';

import {styles} from './histogram.css';

/**
 * Component for histograms for the distribution of scores or custom funcs.
 * TODO: Extract common parts in the bar chart.
 */
@customElement('comparator-histogram')
export class HistogramElement extends MobxLitElement {
  @property({type: Object}) getHistogramSpec: () => HistogramSpec = () =>
    DEFAULT_HISTOGRAM_SPEC;
  @property({type: Object}) getRawDataValues: () => number[] = () => [];

  @property({type: Object})
  handleClickHistogramBar: (binIndex: number) => void = () => {};
  @property({type: Object}) isAnyBinSelected: () => boolean = () => false;
  @property({type: Object})
  isThisBinSelected: (binIndex: number) => boolean = () => false;

  @property({type: Number}) svgWidth = 220;
  @property({type: Number}) svgHeight = 70;

  @property({type: Object}) neutralColorThreshold: () => number | null = () =>
    null;

  @property({type: String})
  specificColorScheme: string | null = null; // 'A', 'B', or null
  @property({type: Boolean}) showBottomAxis = true;
  @property({type: Boolean}) showAxisEndDescription = false;
  @property({type: Boolean}) isSimplified = false;

  @property({type: Object}) isFlipXAxis: () => boolean = () => false;

  @property({type: String}) titleOnLeft: string | null = null;

  private readonly barSidePadding = 1;
  private readonly topPaddingDefault = 10;
  private readonly topPaddingForSimplified = 3;
  private readonly rightPadding = 5;
  private readonly titlePadding = 20;
  private readonly bottomAxisHeight = 18;
  private readonly bottomAxisEndDescriptionHeight = 12;
  private readonly paddingBetweenBarAndAxisLine = 1;

  @observable showRuleLabel = false;
  private readonly minHeightToAlwaysShowRuleLabel = 50;

  static override styles = [sharedStyles, styles];

  @computed
  get leftPadding(): number {
    return this.titleOnLeft == null ? this.rightPadding : this.titlePadding;
  }

  @computed
  get topPadding(): number {
    return this.isSimplified === true
      ? this.topPaddingForSimplified
      : this.topPaddingDefault;
  }

  @computed
  get histogramAreaWidth(): number {
    return this.svgWidth - this.leftPadding - this.rightPadding;
  }

  @computed
  get binWidth(): number {
    const numberOfBins = this.getHistogramSpec().numberOfBins;
    if (numberOfBins === 0) {
      return 0;
    } else {
      return Math.floor(this.histogramAreaWidth / numberOfBins);
    }
  }

  @computed
  get bottomAxisAreaHeight(): number {
    return this.showAxisEndDescription === true
      ? this.bottomAxisHeight + this.bottomAxisEndDescriptionHeight
      : this.bottomAxisEndDescriptionHeight;
  }

  @computed
  get barMaxHeight(): number {
    return this.svgHeight - this.topPadding - this.bottomAxisAreaHeight;
  }

  @computed
  get useDivergingColorScheme(): boolean {
    return this.getHistogramSpec().isDivergingScheme === true;
  }

  @computed
  get binnedData(): number[] {
    const values = Array.from<number>({
      length: this.getHistogramSpec().numberOfBins,
    }).fill(0);
    this.getRawDataValues().forEach((value: number) => {
      const binIndex = getHistogramBinIndexFromValue(
        this.getHistogramSpec(),
        value,
      );
      values[binIndex] += 1;
    });

    return values;
  }

  @computed
  get maxCount(): number {
    return Math.max(1, Math.max(...this.binnedData));
  }

  @computed
  get mean(): number {
    const rawDataValues = this.getRawDataValues();
    if (rawDataValues.length === 0) {
      return 0;
    } else {
      return rawDataValues.reduce((a, b) => a + b, 0.0) / rawDataValues.length;
    }
  }

  constructor() {
    super();
    makeObservable(this);
  }

  private renderBottomAxis() {
    const tickLength = 2;
    const paddingBetweenTickAndLabel = 1;

    const renderAxis = svg`
        <line class="axis"
          x1="0"
          x2=${this.histogramAreaWidth}
          y1=${this.paddingBetweenBarAndAxisLine}
          y2=${this.paddingBetweenBarAndAxisLine} />`;

    const axisEndLabelWidth = 50; // width for "A is better"
    const axisEndLabelHeight = 11;

    // If axis not flipped, B for left, A for right;
    // else (axis flipped), A for left, B for right.
    const styleAxisEndLabelBg = (isRightSide: boolean) => classMap({
      'axis-end-label-bg': true,
      'a-win-color': isRightSide === !this.isFlipXAxis(),
      'b-win-color': isRightSide === this.isFlipXAxis(),
    });
    const renderAxisEndDescriptions = this.showAxisEndDescription === true ?
        svg`
          <rect class=${styleAxisEndLabelBg(false)}
            x="0" y=${this.bottomAxisHeight}
            width=${axisEndLabelWidth} height=${axisEndLabelHeight}
            rx="3" ry="3" />
          <rect class=${styleAxisEndLabelBg(true)}
            x=${this.histogramAreaWidth - axisEndLabelWidth}
            y=${this.bottomAxisHeight}
            width=${axisEndLabelWidth} height=${axisEndLabelHeight}
            rx="3" ry="3" />

          <text class="axis-end-desc left-aligned"
            x="0" y=${this.bottomAxisHeight}
            dx="2" dy="1">
            ${this.isFlipXAxis() === true ? 'A' : 'B'} is better
          </text>
          <text class="axis-end-desc right-aligned"
            x=${this.histogramAreaWidth} y=${this.bottomAxisHeight}
            dx="-2" dy="1">
            ${this.isFlipXAxis() === true ? 'B' : 'A'} is better
          </text>` :
        '';

    const numberOfBins = this.getHistogramSpec().numberOfBins;

    const renderTickLabel = (tickIndex: number) => {
      let value = null;
      if (this.getHistogramSpec().isBounded === true) {
        // Displaying only the left and right ends (Custom Funcs).
        if (tickIndex === 0 || tickIndex === numberOfBins) {
          value = getHistogramRangeFromBinIndex(
            this.getHistogramSpec(),
            tickIndex,
          ).left;
        }
      } else {
        // Displaying except the left and right ends (score).
        if (tickIndex > 0 && tickIndex < numberOfBins) {
          value = getHistogramRangeFromBinIndex(
            this.getHistogramSpec(),
            tickIndex,
          ).left;
        }
      }

      // If displaying only the ends, left or right aligned.
      const styleAxisLabel = classMap({
        'axis-label': true,
        'left-aligned': this.getHistogramSpec().isBounded === true &&
            (this.isFlipXAxis() === false && tickIndex === 0 ||
             this.isFlipXAxis() === true && tickIndex === numberOfBins),
        'right-aligned': this.getHistogramSpec().isBounded === true &&
            (this.isFlipXAxis() === false && tickIndex === numberOfBins ||
             this.isFlipXAxis() === true && tickIndex === 0),
      });

      // prettier-ignore
      return svg`
          <text class=${styleAxisLabel}
            y=${this.paddingBetweenBarAndAxisLine + tickLength +
                paddingBetweenTickAndLabel}>
            ${value != null ?
              value.toFixed(
                  getFloatPrecisionForHistogram(this.getHistogramSpec())) :
              ''}
          </text>`;
    };

    const renderTicks =
        Array
            .from<number>({
              length: this.getHistogramSpec().numberOfBins + 1,
            })
            .map((tick, tickIndex) => {
              const xOffsetRatio =
                  tickIndex / this.getHistogramSpec().numberOfBins;
              const xOffset = this.histogramAreaWidth *
                  (this.isFlipXAxis() === true ? (1.0 - xOffsetRatio) :
                                                 xOffsetRatio);
              // prettier-ignore
              return svg`
                  <g transform="translate(${xOffset}, 0)">
                    <line class="axis"
                      x1="0"
                      x2="0"
                      y1=${this.paddingBetweenBarAndAxisLine}
                      y2=${this.paddingBetweenBarAndAxisLine + tickLength} />
                    ${renderTickLabel(tickIndex)}
                  </g>`;
            });

    return svg`
        <g class="bottom-axis"
          transform="translate(0, ${this.barMaxHeight})">
          ${renderAxis}
          ${renderAxisEndDescriptions}
          ${renderTicks}
        </g>`;
  }

  // Draw the shape of the bars for clipping.
  private clipShapeOfHistogramBar(
    count: number,
    maxCount: number,
    index: number,
  ) {
    const barHeight = (count * this.barMaxHeight) / maxCount;

    const xIndex = this.isFlipXAxis() === true ?
        this.binnedData.length - 1 - index :
        index;

    // prettier-ignore
    return svg`
        <rect
          x=${xIndex * this.binWidth + this.barSidePadding}
          y=${this.barMaxHeight - barHeight}
          width=${this.binWidth - this.barSidePadding * 2}
          height=${barHeight}
        />`;
  }

  // Specify fill colors of histogram bars and clip the shape.
  private renderColoredBarAreas() {
    const histogramSpec = this.getHistogramSpec();

    // Determine the width of each colored area (blue and orange).
    // e.g., if the win rate threshold is 0.3 and the left end of x-axis is 1.5,
    // the colored area would span from x=1.5 to x=0.3 (and -0.3 to -1.5).
    // In this case, `thresholdPoint` would be 0.3, and
    // `widthRatioOfColoredArea` would be 1.2/3.0 = 40%.
    const thresholdValue: number =
      this.neutralColorThreshold() != null ? this.neutralColorThreshold()! : 0;
    const thresholdPoint =
      (histogramSpec.rangeLeft + histogramSpec.rangeRight) * 0.5 -
      thresholdValue *
        Math.sign(histogramSpec.rangeRight - histogramSpec.rangeLeft);
    const widthRatioOfColoredArea =
      (thresholdPoint - histogramSpec.rangeLeft) /
      (histogramSpec.rangeRight - histogramSpec.rangeLeft);
    const thresholdWidth = this.histogramAreaWidth * widthRatioOfColoredArea;

    const styleHistogramBarDefault = classMap({
      'histogram-bar-clip-area': true,
      'a-color': this.specificColorScheme === 'A',
      'b-color': this.specificColorScheme === 'B',
    });

    return svg`
        <rect class=${styleHistogramBarDefault}
          x="0" y="0"
          width=${this.histogramAreaWidth} height=${this.barMaxHeight}
          clip-path="url(#clip-bars)" />
        ${
        this.useDivergingColorScheme === true &&
                this.neutralColorThreshold() != null ?
            svg`
                <rect class=${
                this.isFlipXAxis() === true ? 'a-win-color' : 'b-win-color'}
                  width=${thresholdWidth} height=${this.barMaxHeight}
                  x="0" y="0"
                  clip-path="url(#clip-bars)" />
                <rect class=${
                this.isFlipXAxis() === true ? 'b-win-color' : 'a-win-color'}
                  width=${thresholdWidth} height=${this.barMaxHeight}
                  x=${this.histogramAreaWidth - thresholdWidth} y="0"
                  clip-path="url(#clip-bars)" />` :
            ''}`;
  }

  // Render number labels above bars and clickable transparent areas.
  private renderHistogramBarElements(
    count: number,
    maxCount: number,
    index: number,
  ) {
    if (this.isSimplified === true) {
      return svg``;
    }

    const barHeight = (count * this.barMaxHeight) / maxCount;

    const binTextClass = (binIndex: number) =>
      classMap({
        'histogram-bar-label': true,
        'some-selected': this.isAnyBinSelected(),
        'selected': this.isThisBinSelected(binIndex),
      });

    const binClickableAreaClass = (binIndex: number) =>
      classMap({
        'clickable-transparent-area': true,
        'clickable': true,
        'some-selected': this.isAnyBinSelected(),
        'selected': this.isThisBinSelected(binIndex),
      });

    const xOffset = (binIndex: number) => this.binWidth *
        (this.isFlipXAxis() === true ? (this.binnedData.length - 1 - binIndex) :
                                       binIndex);

    // prettier-ignore
    const renderCountLabel = svg`
        <text class=${binTextClass(index)}
          x=${this.binWidth * 0.5}
          y=${this.barMaxHeight - barHeight}
          dy="-1">
          ${count > 0 ? count : ''}
        </text>`;
    const renderClickableArea = svg`
        <rect class=${binClickableAreaClass(index)}
          x=${this.barSidePadding}
          y=${-this.topPadding}
          width=${this.binWidth - this.barSidePadding * 2}
          height=${this.topPadding + this.barMaxHeight}
          @click=${() => void this.handleClickHistogramBar(index)}
        />`;

    return svg`
        <g transform="translate(${xOffset(index)}, 0)">
          ${renderCountLabel}
          ${renderClickableArea}
        </g>`;
  }

  // Render a vertical bar (i.e., rule) that indicates the mean value.
  private renderMeanRule() {
    if (this.isSimplified === true || this.getRawDataValues().length <= 1) {
      return svg``;
    }

    const binIndex = getHistogramBinIndexFromValue(
      this.getHistogramSpec(),
      this.mean,
    );
    const binStartingPosition =
      (binIndex * this.histogramAreaWidth) /
        this.getHistogramSpec().numberOfBins +
      this.barSidePadding;

    const {left, right} = getHistogramRangeFromBinIndex(
      this.getHistogramSpec(),
      binIndex,
    );
    const binProportion = (this.mean - left) / (right - left);
    const binInsideOffset =
      binProportion * (this.binWidth - this.barSidePadding * 2);

    const xPositionBeforeFlipConsidered = binStartingPosition + binInsideOffset;
    const xPosition = this.isFlipXAxis() === true ?
        this.histogramAreaWidth - xPositionBeforeFlipConsidered :
        xPositionBeforeFlipConsidered;

    const styleMeanRuleLabel = classMap({
      'mean-rule-label': true,
      'shown':
        this.svgHeight >= this.minHeightToAlwaysShowRuleLabel ||
        this.showRuleLabel,
    });

    return svg`
        <g class="mean-rule-container">
          <line class="mean-rule"
            x1=${xPosition} y1=${0}
            x2=${xPosition} y2=${this.barMaxHeight + 1}
            @mouseenter=${() => (this.showRuleLabel = true)}
            @mouseleave=${() => (this.showRuleLabel = false)}
          />
          <text class=${styleMeanRuleLabel}
            x=${xPosition + 2} y=${this.barMaxHeight * 0.1}>
            &mu;=${this.mean.toFixed(2)}
          </text>
        </g>`;
  }

  private renderTitleOnLeft() {
    const paddingBetweenAxisAndTitle = 3;

    // prettier-ignore
    return this.titleOnLeft != null ?
        svg`
          <g class="left-title">
            <line class="axis"
              x1="0" x2="0"
              y1="0" y2=${this.barMaxHeight + this.paddingBetweenBarAndAxisLine}
            />
            <text class="chart-title"
              x="0" dx=${-paddingBetweenAxisAndTitle}
              y=${this.barMaxHeight * 0.5}>
              ${this.titleOnLeft}
            </text>
          </g>` :
        '';
  }

  override render() {
    const histogramSpec = this.getHistogramSpec();
    // In case when histogram spec is reset when changing datasets.
    if (histogramSpec === undefined) {
      return html``;
    }

    const binnedData = this.binnedData;
    const renderHistogramElementsForBars = binnedData.map((value, index) =>
      this.renderHistogramBarElements(value, this.maxCount, index),
    );

    const clipShapeOfHistogramBars = binnedData.map((value, index) =>
      this.clipShapeOfHistogramBar(value, this.maxCount, index),
    );

    const adjustedSvgHeight =
      this.showBottomAxis === true
        ? this.svgHeight
        : this.svgHeight - HISTOGRAM_BOTTOM_AXIS_HEIGHT;

    // prettier-ignore
    return html`
        <svg class="histogram"
          width=${this.svgWidth}
          height=${adjustedSvgHeight}>
          <g transform="translate(${this.leftPadding}, ${this.topPadding})">
            ${this.renderTitleOnLeft()}
            ${this.renderBottomAxis()}
            <g class="bars">
              <clipPath id="clip-bars">
                ${clipShapeOfHistogramBars}
              </clipPath>
              ${this.renderColoredBarAreas()}
              ${renderHistogramElementsForBars}
            </g>
            ${this.renderMeanRule()}
          </g>
        </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-histogram': HistogramElement;
  }
}
