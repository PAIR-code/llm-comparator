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
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {makeObservable, observable} from 'mobx';

import {core} from '../core';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import {AppState} from '../services/state_service';

import {styles} from './dataset_selection.css';

/**
 * Component for selecting data files.
 */
@customElement('comparator-dataset-selection')
export class DatasetSelectionElement extends MobxLitElement {
  private readonly appState = core.getService(AppState);

  @observable
  isShowFileUploadView = this.appState.isDatasetPathUploadedFile === true;
  @observable editedDatasetPath = '';

  static override get styles() {
    return [sharedStyles, styles];
  }

  constructor() {
    super();
    makeObservable(this);
  }

  private getDocumentationLinkString() {
    const documentationLink = 'https://github.com/PAIR-code/llm-comparator';

    return html`
      <div>
        The json file must contain these three properties:
        <span class="filepath">metadata</span>,
        <span class="filepath">models</span>,
        and <span class="filepath">examples</span>.
        <br />
        Each example in <span class="filepath">examples</span> must have
        <span class="filepath">input_text</span>,
        <span class="filepath">tags</span>,
        <span class="filepath">output_text_a</span>,
        <span class="filepath">output_text_b</span>,
        and <span class="filepath">score</span>.
        <br />
        Please refer to our document for details:
        <a href="${documentationLink}" target="_blank">${documentationLink}</a>
      </div>
    `;
  }

  private renderViewForSpecifyingDataPath() {
    // Fill the textarea if a dataset has been loaded.
    if (
      this.appState.datasetPath != null &&
      this.appState.isDatasetPathUploadedFile === false &&
      this.editedDatasetPath === ''
    ) {
      this.editedDatasetPath = this.appState.datasetPath;
    }

    const handleClickLoadButton = () =>
      this.appState.loadData(this.editedDatasetPath, null);

    const handleClickDatasetPath = (datasetPath: string) => {
      this.appState.loadData(datasetPath, null);
    };

    const handleChangeDatasetPath = (e: Event) => {
      this.editedDatasetPath = (e.target as HTMLInputElement).value;
    };

    const selectedClassMap = (datasetPath: string) =>
      classMap({
        'clickable': true,
        'selected': this.appState.datasetPath === datasetPath,
      });

    const textareaPlaceholder = 'Enter a URL to load the json file from.';
    const urlLoadPath =
        this.appState.appLink + '?results_path=https://.../...json';
    const panelIntro = html`
      Enter the URL path of a json file prepared for LLM Comparator.`;
    const panelOutro = html`
      ${this.getDocumentationLinkString()}<br/>
      Note that the server hosting the file must allow
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
        target="_blank"
      >Cross-Origin Resource Sharing</a>.`;

    // prettier-ignore
    const panelInstruction = html`
        ${panelIntro}
        <div class="textarea-wrapper">
          <textarea type="text" class="textarea-filepath"
            placeholder=${textareaPlaceholder}
            size="70"
            rows="4"
            @change=${handleChangeDatasetPath}
          >${this.editedDatasetPath}</textarea>
          <button @click=${handleClickLoadButton}>
            Load
          </button>
        </div>
        ${panelOutro}

        <br /><br /><br />
        If you don't have your run,
        click one of the following example runs.

        <ul>
          ${
        this.appState.exampleDatasetPaths.map(
            path => html`<li class=${selectedClassMap(path)}
                @click=${() => void handleClickDatasetPath(path)}>${
                path}</li>`)}
        </ul>

        Note: You can also directly load the tool with a path by
        opening an URL like:<br />
        <span class="filepath">
          ${urlLoadPath}
        </span>
        `;
    return panelInstruction;
  }

  private renderViewForUploadingData() {
    const handleFileUpload = (e: Event) => {
      const input = e.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.appState.loadData(file.name, file);
      }
    };

    return html`
      <div class="file-upload">
        <label for="upload">Upload your json file: </label>
        <input type="file" id="upload" @change=${handleFileUpload} />
      </div>

      ${this.getDocumentationLinkString()}
    `;
  }

  override render() {
    if (this.appState.isOpenDatasetSelectionPanel === false) {
      return html``;
    }

    const handleClickCloseButton = () => {
      this.appState.isOpenDatasetSelectionPanel = false;
    };

    const stylePanelTitle = (isUpload: boolean) => classMap({
      'selected': isUpload === this.isShowFileUploadView,
      'clickable': true,
    });
    const panelTitle = html` <span
        class=${stylePanelTitle(false)}
        @click=${() => (this.isShowFileUploadView = false)}>
        Select Data
      </span>
      <span>|</span>
      <span
        class=${stylePanelTitle(true)}
        @click=${() => (this.isShowFileUploadView = true)}>
        Upload File
      </span>`;

    const panelInstruction = this.isShowFileUploadView === true ?
        this.renderViewForUploadingData() :
        this.renderViewForSpecifyingDataPath();

    return html` <div class="dataset-selection-container">
      <div class="dataset-selection">
        ${this.appState.datasetPath !== null
          ? html` <div
              class="close-button clickable"
              @click=${handleClickCloseButton}>
              <mwc-icon>close</mwc-icon>
            </div>`
          : ''}
        <div class="panel-title">${panelTitle}</div>
        <div class="panel-instruction"> ${panelInstruction} </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-dataset-selection': DatasetSelectionElement;
  }
}
