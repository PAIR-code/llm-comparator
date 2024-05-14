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
import '@material/mwc-icon';
import '@material/mwc-switch';

import {MobxLitElement} from '@adobe/lit-mobx';
import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {core} from '../core';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import {Field} from '../lib/types';
import {AppState} from '../services/state_service';

import {styles} from './settings.css';

/**
 * A numeric input element.
 */
@customElement('comparator-numeric-input')
export class NumericInput extends LitElement {
  @property({type: Number}) min = 1;
  @property({type: Number}) max = 20;
  @property({type: Number}) step = 1;
  @property({type: Number}) value = 5;

  static override styles = css`
    input {
      width: 40px;
    }
  `;

  override render() {
    const onInputChange = (e: Event) => {
      const {value} = e.target as HTMLInputElement;
      const numberValue = Number(value);
      if (numberValue < this.min) {
        this.value = this.min;
      } else if (numberValue > this.max) {
        this.value = this.max;
      } else {
        this.value = numberValue;
      }
      this.dispatchEvent(new Event('change'));
    };

    return html` <input
      type="number"
      .min=${this.min.toString()}
      .max=${this.max.toString()}
      .step=${this.step.toString()}
      .value=${this.value.toString()}
      @change=${onInputChange} />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-numeric-input': NumericInput;
  }
}

/**
 * Renders the data table settings pop-up on the left side.
 */
@customElement('comparator-settings')
export class ComparatorSettingsElement extends MobxLitElement {
  static override get styles() {
    return [sharedStyles, styles];
  }

  private readonly appState = core.getService(AppState);

  private renderMainToggles() {
    const handleChangeRationaleClusterSimilarityThreshold = (e: Event) => {
      this.appState.rationaleClusterSimilarityThreshold =
          Number((e.target as HTMLInputElement).value);
      this.appState.reassignClusters();
    };

    // prettier-ignore
    return html` <div class="settings-row">
        <mwc-switch
          id="toggle-highlight-matches"
          ?selected=${this.appState.isShowTextDiff}
          @click=${
        () => (this.appState.isShowTextDiff = !this.appState.isShowTextDiff)}>
        </mwc-switch>
        <label for="toggle-highlight-matches">Highlight matches</label>
      </div>

      <div class="settings-row">
        <mwc-switch
          id="toggle-monospace"
          ?selected=${this.appState.useMonospace}
          @click=${
        () => (this.appState.useMonospace = !this.appState.useMonospace)}>
        </mwc-switch>
        <label for="toggle-monospace">Use monospace font</label>
      </div>

      <div class="settings-row">
        <comparator-numeric-input
          id="num-lines-in-cell"
          min="2"
          max="20"
          value="${this.appState.numberOfLinesPerOutputCell}"
          @change=${
        (e: Event) =>
            (this.appState.numberOfLinesPerOutputCell = Number(
                 (e.target as HTMLInputElement).value,
                 ))}>
        </comparator-numeric-input>
        <label for="num-lines-in-cell">lines displayed in cell</label>
      </div>

      <div class="settings-row">
        <comparator-numeric-input
          id="up-to-num-example"
          min="5"
          max="500"
          value="${this.appState.numExamplesToDisplay}"
          @change=${
        (e: Event) =>
            (this.appState.numExamplesToDisplay = Number(
                 (e.target as HTMLInputElement).value,
                 ))}>
        </comparator-numeric-input>
        <label for="up-to-num-example">examples displayed max</label>
      </div>

      <div class="settings-row">
        <mwc-switch
          id="toggle-show-tag-chips"
          ?selected=${this.appState.isShowTagChips}
          @click=${
        () => (this.appState.isShowTagChips = !this.appState.isShowTagChips)}>
        </mwc-switch>
        <label for="toggle-show-sidebar">Show tags on prompts</label>
      </div>

      <div class="settings-row">
        <mwc-switch
          id="toggle-flip-score-histogram-axis"
          ?selected=${this.appState.isFlipScoreHistogramAxis}
          @click=${
        () =>
            (this.appState.isFlipScoreHistogramAxis =
                 !this.appState.isFlipScoreHistogramAxis)}>
        </mwc-switch>
        <label for="toggle-show-sidebar">Flip score histogram axis</label>
      </div>

      <div class="settings-row">
        <comparator-numeric-input
          id="win-rate-threshold"
          min="0.0"
          max="5.0"
          step="0.05"
          value="${this.appState.winRateThreshold}"
          @change=${
        (e: Event) =>
            (this.appState.winRateThreshold = Number(
                 (e.target as HTMLInputElement).value,
                 ))}>
        </comparator-numeric-input>
        <label for="win-rate-threshold">score threshold for win rate</label>
      </div>

      ${
        this.appState.hasRationaleClusters === true ? html`
        <div class="settings-row">
          <comparator-numeric-input
            id="rationale-cluster-similarity-threshold"
            min="0.0"
            max="1.0"
            step="0.05"
            value="${this.appState.rationaleClusterSimilarityThreshold}"
            @change=${handleChangeRationaleClusterSimilarityThreshold}>
          </comparator-numeric-input>
          <label for="rationale-cluster-similarity-threshold">
            similarity threshold for rationale summary
          </label>
        </div>` :
                                                      html``}

      <div class="settings-row">
        <mwc-switch
          id="toggle-show-sidebar"
          ?selected=${this.appState.isShowSidebar}
          @click=${
        () => (this.appState.isShowSidebar = !this.appState.isShowSidebar)}>
        </mwc-switch>
        <label for="toggle-show-sidebar">Show sidebar</label>
      </div>`;
  }

  private renderColumnVisibilityToggles() {
    const renderColumnToggle = (field: Field) =>
      html` <div class="settings-row">
        <mwc-switch
          id="toggle-column-${field.id}"
          ?selected=${field.visible}
          @click=${() => (field.visible = !field.visible)}>
        </mwc-switch>
        <label for="toggle-column-${field.id}">${field.name}</label>
      </div>`;

    return html` <section>
      ${this.appState.columns.map((field: Field) => renderColumnToggle(field))}
    </section>`;
  }

  override render() {
    // prettier-ignore
    return html`
        <div id="settings-panel">
          <div class="panel-title">
            Settings
            <mwc-icon class="icon" title="Close Settings Panel"
              @click=${() => this.appState.isOpenSettingsPanel = false}>
              close
            </mwc-icon>
          </div>

          <section>
            ${this.renderMainToggles()}
          </section>

          <section>
            <div class="section-title">
              Table Column Visibility
            </div>
            ${this.renderColumnVisibilityToggles()}
          </section>
        </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-settings': ComparatorSettingsElement;
  }
}
