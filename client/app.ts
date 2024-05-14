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
import './components/charts';
import './components/custom_functions';
import './components/dataset_selection';
import './components/example_details';
import './components/example_table';
import './components/metrics_by_slice';
import './components/rationale_summary';
import './components/score_histogram';
import './components/settings';
import './components/toolbar';

import {MobxLitElement} from '@adobe/lit-mobx';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {makeObservable, observable} from 'mobx';

import {core} from './core';
import {styles as sharedStyles} from './lib/shared_styles.css';
import {AppState} from './services/state_service';

/**
 * Root component for the LLM Comparator app.
 */
@customElement('llm-comparator-app')
export class LlmComparatorAppElement extends MobxLitElement {
  private readonly appState = core.getService(AppState);

  static override get styles() {
    return [sharedStyles, css``];
  }

  @observable isShowFeedbackTooltip = false;

  constructor() {
    super();
    makeObservable(this);
  }

  renderHeader() {
    const toggleSettingsIcon = () => {
      this.appState.isOpenSettingsPanel = !this.appState.isOpenSettingsPanel;
    };

    const feedbackLink =
        'https://github.com/PAIR-code/llm-comparator/issues';
    const documentationLink = 'https://github.com/PAIR-code/llm-comparator';

    const handleClickLoadData = () => {
      this.appState.isOpenDatasetSelectionPanel =
          !this.appState.isOpenDatasetSelectionPanel;
    };
    const renderLoadDataLink = html`
        <button class="load-data-button" @click=${handleClickLoadData}>
          Load Data
        </button>`;

    // prettier-ignore
    return html`
      <div id="header">
        <img class="favicon" src="static/favicon.svg" alt="LLM Comparator" />
        <h1>LLM Comparator</h1>
        ${renderLoadDataLink}
        <div class="header-icon-container">
          <div class="link-icon">
            <mwc-icon class="icon" title="Toggle Settings Panel"
              @click=${toggleSettingsIcon}>
              settings
            </mwc-icon>
          </div>
          <div class="link-icon">
            <a href=${feedbackLink} target="_blank">
              <mwc-icon class="icon" title="Send Feedback">
                feedback
              </mwc-icon>
            </a>
          </div>
          <div class="link-icon">
            <a href=${documentationLink} target="_blank">
              <mwc-icon class="icon" title="Open Documentation Page">
                help_outline
              </mwc-icon>
            </a>
          </div>
        </div>
      </div>`;
  }

  renderStatusMessage() {
    return html`
        <div class="status-message-container">
          <div>${this.appState.statusMessage}</div>
          <div class="dismiss-button clickable"
            @click=${() => this.appState.isOpenStatusMessage = false}>
            Dismiss
          </div>
        </div>`;
  }

  renderSidebar() {
    const components = html`
        <comparator-score-histogram></comparator-score-histogram>
        <comparator-metrics-by-slice></comparator-metrics-by-slice>
        <comparator-rationale-summary></comparator-rationale-summary>
        <comparator-custom-functions></comparator-custom-functions>
        <comparator-charts></comparator-charts>`;
    return html`<div id="sidebar">${components}</div>`;
  }

  override render() {
    const styleExampleDetailsPanel = classMap({
      'expanded': this.appState.exampleDetailsPanelExpanded === true,
    });

    // prettier-ignore
    return html`
        <div id="container">
          ${this.renderHeader()}
          <div id="main">
            <comparator-dataset-selection></comparator-dataset-selection>
            ${
        this.appState.isOpenSettingsPanel === true ?
            html`<comparator-settings></comparator-settings>` :
            ''}
            <div id="main-panel">
              <comparator-toolbar></comparator-toolbar>
              <div id="main-table" class="table-panel">
                <comparator-example-table></comparator-example-table>
              </div>
              ${
        this.appState.showSelectedExampleDetails === true &&
                this.appState.selectedExample != null ?
            html`
                  <div id="example-details" class=${styleExampleDetailsPanel}>
                    <comparator-example-details></comparator-example-details>
                  </div>` :
            ''}
            </div>
            ${this.appState.isShowSidebar === true ? this.renderSidebar() : ''}
        </div>
          ${
        this.appState.isOpenStatusMessage === true ?
            this.renderStatusMessage() :
            ''}
        </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'llm-comparator-app': LlmComparatorAppElement;
  }
}
