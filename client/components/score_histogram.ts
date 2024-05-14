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
import './histogram';

import {MobxLitElement} from '@adobe/lit-mobx';
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {core} from '../core';
import {FIELD_ID_FOR_SCORE} from '../lib/constants';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import {ChartType, Example} from '../lib/types';
import {AppState} from '../services/state_service';

import {styles} from './score_histogram.css';

/**
 * Component for visualizing the score distribution as a histogram.
 */
@customElement('comparator-score-histogram')
export class ScoreHistogramElement extends MobxLitElement {
  private readonly appState = core.getService(AppState);

  static override styles = [sharedStyles, styles];

  readonly svgWidth = 220;
  readonly svgHeight = 110;

  renderScoreHistogram() {
    const chartSelectionKey = {
      chartType: ChartType.HISTOGRAM,
      fieldId: FIELD_ID_FOR_SCORE,
      model: null,
    };
    const getHistogramRawDataValues = () =>
      this.appState
        .getFilteredExamplesExceptForParticularChart(chartSelectionKey)
        .filter((ex: Example) => ex.score != null)
        .map((ex: Example) => ex.score!);

    const handleClickHistogramBar = (binIndex: number) => {
      if (this.appState.selectedHistogramBinForScores === binIndex) {
        this.appState.selectedHistogramBinForScores = null;
      } else {
        this.appState.selectedHistogramBinForScores = binIndex;
      }
    };

    const isAnyBinSelected = () =>
      this.appState.selectedHistogramBinForScores !== null;
    const isThisBinSelected = (binIndex: number) =>
      binIndex === this.appState.selectedHistogramBinForScores;

    // prettier-ignore
    return html`
        <div class="sidebar-component">
          <div class="sidebar-component-title">
            Score Distribution
          </div>
          <div class="sidebar-component-content">
            <comparator-histogram
              .getHistogramSpec=${() => this.appState.histogramSpecForScores}
              .getRawDataValues=${getHistogramRawDataValues}
              .handleClickHistogramBar=${handleClickHistogramBar}
              .isAnyBinSelected=${isAnyBinSelected}
              .isThisBinSelected=${isThisBinSelected}
              .svgWidth=${this.svgWidth}
              .svgHeight=${this.svgHeight}
              .neutralColorThreshold=${() => this.appState.winRateThreshold}
              .showAxisEndDescription=${true}
              .isFlipXAxis=${() => this.appState.isFlipScoreHistogramAxis}>
            </comparator-histogram>
          </div>
        </div>`;
  }

  override render() {
    return html` ${this.renderScoreHistogram()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-score-histogram': ScoreHistogramElement;
  }
}
