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
import {html, LitElement, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {computed, makeObservable, observable} from 'mobx';

import {core} from '../core';
import {DEFAULT_CHART_HEIGHT_FOR_CUSTOM_FUNCS, DEFAULT_SXS_HISTOGRAM_HEIGHT_FOR_CUSTOM_FUNCS,} from '../lib/constants';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import type {ChartSelectionKey, CustomFunction, Example, Field,} from '../lib/types';
import {AOrB, ChartType, CustomFuncReturnType, CustomFuncType,} from '../lib/types';
import {getFieldIdForCustomFunc, makeNewCustomFunc} from '../lib/utils';
import {AppState} from '../services/state_service';

import {styles} from './custom_functions.css';

/**
 * Side-by-side stacked bar charts for A and B for Custom Functions.
 * This is for return type binary.
 */
@customElement('comparator-binary-stacked-bar-chart')
export class BinaryStackedBarChart extends LitElement {
  @property({type: Number}) svgWidth = 100;
  @property({type: Number}) svgHeight = 40;
  @property({type: Number}) customFuncId = -1;
  @property({type: Number}) countA = 0;
  @property({type: Number}) countB = 0;
  @property({type: Number}) numExamples = 0;

  private readonly appState = core.getService(AppState);

  static override styles = [sharedStyles, styles];

  private readonly topPadding = 10;
  private readonly bottomPadding = 15;
  private readonly barSidePadding = 10;

  @computed
  get barAreaHeight(): number {
    return this.svgHeight - this.topPadding - this.bottomPadding;
  }

  @computed
  get barWidth(): number {
    return this.svgWidth * 0.5 - this.barSidePadding * 2;
  }

  constructor() {
    super();
    makeObservable(this);
  }

  override render() {
    const trueRateA =
      this.numExamples === 0 ? 0.0 : this.countA / this.numExamples;
    const trueRateB =
      this.numExamples === 0 ? 0.0 : this.countB / this.numExamples;

    // Y-position separating the bars for false (grey) and for true (colored).
    const yPositionA = this.barAreaHeight * (1.0 - trueRateA);
    const yPositionB = this.barAreaHeight * (1.0 - trueRateB);

    // CSS classes for the bars.
    const selections =
        this.appState.selectionsFromCustomFuncResults[this.customFuncId];
    const styleBarForFalse = (model: AOrB) => classMap({
      'custom-func-results-bar': true,
      'value-no': true,
      'selected': selections[model] === false,
    });
    const styleBarForTrue = (model: AOrB) => classMap({
      'custom-func-results-bar': true,
      'model-a': model === AOrB.A,
      'model-b': model === AOrB.B,
    });
    // Expanded area for colored bars (in case the height is too small).
    const styleClickableAreasForTrue = (model: AOrB) =>
      classMap({
        'clickable-transparent-area': true,
        'selected': selections[model] === true,
      });

    const handleClickBar = (
        customFuncId: number,
        model: AOrB,
        isTrue: boolean,
        ) => {
      const selections =
          this.appState.selectionsFromCustomFuncResults[customFuncId];
      if (selections[model] === isTrue) {
        selections[model] = null;
      } else {
        selections[model] = isTrue;
        this.appState.selectedCustomFuncId = customFuncId;
      }
    };

    const renderBottomAxis = svg`
        <g transform="translate(0, ${this.barAreaHeight})">
          <line class="axis" x1="0" x2=${this.svgWidth} y1=${1} y2=${1} />
          <text class="model-label" x=${this.svgWidth * 0.25} y=${2}>A</text>
          <text class="model-label" x=${this.svgWidth * 0.75} y=${2}>B</text>
        </g>`;

    // Render percentage stacked bar charts for Models A and B.
    const renderBarsForFalse = svg`
        <rect class=${styleBarForFalse(AOrB.A)}
            x=${this.barSidePadding} y="0"
            width=${this.barWidth} height=${yPositionA}
            @click=${
        () => void handleClickBar(this.customFuncId, AOrB.A, false)} />
        <rect class=${styleBarForFalse(AOrB.B)}
            x=${this.svgWidth * 0.5 + this.barSidePadding} y="0"
            width=${this.barWidth} height=${yPositionB}
            @click=${
        () => void handleClickBar(this.customFuncId, AOrB.B, false)} />`;

    const renderBarsForTrue = svg`
        <rect class=${styleBarForTrue(AOrB.A)}
            x=${this.barSidePadding} y=${yPositionA}
            width=${this.barWidth} height=${this.barAreaHeight * trueRateA} />
        <rect class=${styleBarForTrue(AOrB.B)}
            x=${this.svgWidth * 0.5 + this.barSidePadding} y=${yPositionB}
            width=${this.barWidth} height=${this.barAreaHeight * trueRateB} />`;

    const renderNumberLabelsForTrueCount = svg`
        <text class="number-label"
          x=${this.svgWidth * 0.25} y=${yPositionA} dy="-2">
          ${this.countA}
        </text>
        <text class="number-label"
          x=${this.svgWidth * 0.75} y=${yPositionB} dy="-2">
          ${this.countB}
        </text>`;

    // Clickable area for true values, expanded to the bottom axis (extra 10px),
    // in case the height of bars is very small. If count is 0, not clickable.
    // prettier-ignore
    const renderClickableAreasForTrue = svg`
        ${
        trueRateA > 0.0 ? svg`
            <rect class=${styleClickableAreasForTrue(AOrB.A)}
              x=${this.barSidePadding} y=${yPositionA}
              width=${this.barWidth}
              height=${this.barAreaHeight * trueRateA + 10}
              @click=${
                              () => void handleClickBar(
                                  this.customFuncId, AOrB.A, true)} />` :
                          ''}
        ${
        trueRateB > 0.0 ? svg`
            <rect class=${styleClickableAreasForTrue(AOrB.B)}
              x=${this.svgWidth * 0.5 + this.barSidePadding} y=${yPositionB}
              width=${this.barWidth}
              height=${this.barAreaHeight * trueRateB + 10}
              @click=${
                              () => void handleClickBar(
                                  this.customFuncId, AOrB.B, true)} />` :
                          ''}`;

    return html` <svg width=${this.svgWidth} height=${this.svgHeight}>
      <g transform="translate(0, ${this.topPadding})">
        ${renderBottomAxis} ${renderBarsForFalse} ${renderBarsForTrue}
        ${renderNumberLabelsForTrueCount} ${renderClickableAreasForTrue}
      </g>
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-binary-stacked-bar-chart': BinaryStackedBarChart;
  }
}

/**
 * Custom Functions component.
 */
@customElement('comparator-custom-functions')
export class CustomFunctionsElement extends MobxLitElement {
  private readonly appState = core.getService(AppState);

  static override styles = [sharedStyles, styles];

  private readonly svgWidth = 130;

  @observable
  editedCustomFunc: CustomFunction = makeNewCustomFunc(
      this.appState.newCustomFuncId,
  );

  private renderChartForBooleanType(customFunc: CustomFunction) {
    const svgHeight = DEFAULT_CHART_HEIGHT_FOR_CUSTOM_FUNCS;

    const filteredExamples = this.appState.filteredExamples;

    const aggregatedResults: {[key: string]: {[key: string]: number}} = {
      'A': {'true': 0, 'false': 0},
      'B': {'true': 0, 'false': 0},
    };

    // Aggregate the number of true and false values over filtered examples.
    // Casted to string just for aggregation (to avoid boolean key in JS).
    const fieldId = getFieldIdForCustomFunc(customFunc.id);
    filteredExamples.forEach((ex) => {
      if ((ex.custom_fields[fieldId] as boolean[])[0] != null) {
        aggregatedResults['A'][
          (ex.custom_fields[fieldId] as boolean[])[0].toString()
        ] += 1;
      }
      if ((ex.custom_fields[fieldId] as boolean[])[1] != null) {
        aggregatedResults['B'][
          (ex.custom_fields[fieldId] as boolean[])[1].toString()
        ] += 1;
      }
    });

    return html` <comparator-binary-stacked-bar-chart
      .svgWidth=${this.svgWidth}
      .svgHeight=${svgHeight}
      .customFuncId=${customFunc.id}
      .countA=${aggregatedResults['A']['true']}
      .countB=${aggregatedResults['B']['true']}
      .numExamples=${filteredExamples.length}>
    </comparator-binary-stacked-bar-chart>`;
  }

  // TODO: Merge into the side-by-side histogram code in charts.ts.
  private renderChartForNumberType(customFunc: CustomFunction) {
    const getHistogramSpec = () =>
        this.appState.histogramSpecForCustomFuncs[customFunc.id];
    const getHistogramSpecForDiff = () =>
        this.appState.histogramSpecForCustomFuncsOfDiff[customFunc.id];

    const fieldId = getFieldIdForCustomFunc(customFunc.id);
    const chartSelectionKey = (model: string) =>
        ({chartType: ChartType.CUSTOM_FUNCTION, fieldId, model}) as
        ChartSelectionKey;
    const getHistogramDataForA = () =>
      this.appState
        .getFilteredExamplesExceptForParticularChart(chartSelectionKey('A'))
        .filter(
          (ex: Example) =>
            (ex.custom_fields[fieldId] as Array<number | null>)[0] != null,
        )
        .map((ex: Example) => (ex.custom_fields[fieldId] as number[])[0]);
    const getHistogramDataForB = () =>
      this.appState
        .getFilteredExamplesExceptForParticularChart(chartSelectionKey('B'))
        .filter(
          (ex: Example) =>
            (ex.custom_fields[fieldId] as Array<number | null>)[1] != null,
        )
        .map((ex: Example) => (ex.custom_fields[fieldId] as number[])[1]);
    const getHistogramDataForDiff = () =>
      this.appState
        .getFilteredExamplesExceptForParticularChart(chartSelectionKey('A-B'))
        .filter(
          (ex: Example) =>
            (ex.custom_fields[fieldId] as Array<number | null>)[0] != null &&
            (ex.custom_fields[fieldId] as Array<number | null>)[1] != null,
        )
        .map(
          (ex: Example) =>
            (ex.custom_fields[fieldId] as number[])[0] -
            (ex.custom_fields[fieldId] as number[])[1],
        );

    const handleClickHistogramBar = (binIndex: number, model: string) => {
      const selections =
          this.appState.selectionsFromCustomFuncResults[customFunc.id];
      if (selections[model] === binIndex) {
        selections[model] = null;
      } else {
        selections[model] = binIndex;
        this.appState.selectedCustomFuncId = customFunc.id;
      }
    };

    const handleClickHistogramBarForA = (binIndex: number) =>
      void handleClickHistogramBar(binIndex, AOrB.A);
    const handleClickHistogramBarForB = (binIndex: number) =>
      void handleClickHistogramBar(binIndex, AOrB.B);
    const handleClickHistogramBarForDiff = (binIndex: number) =>
      void handleClickHistogramBar(binIndex, 'A-B');

    // Check if any of the histogram bars or this bar is selected.
    const selections =
        this.appState.selectionsFromCustomFuncResults[customFunc.id];
    const isAnyBinSelectedForA = () => selections['A'] != null;
    const isAnyBinSelectedForB = () => selections['B'] != null;
    const isAnyBinSelectedForDiff = () => selections['A-B'] != null;
    const isThisBinSelectedForA = (binIndex: number) =>
      selections['A'] === binIndex;
    const isThisBinSelectedForB = (binIndex: number) =>
      selections['B'] === binIndex;
    const isThisBinSelectedForDiff = (binIndex: number) =>
      selections['A-B'] === binIndex;

    if (getHistogramSpec() !== undefined) {
      return html` <comparator-histogram
          .getHistogramSpec=${getHistogramSpec}
          .getRawDataValues=${getHistogramDataForA}
          .handleClickHistogramBar=${handleClickHistogramBarForA}
          .isAnyBinSelected=${isAnyBinSelectedForA}
          .isThisBinSelected=${isThisBinSelectedForA}
          .specificColorScheme=${'A'}
          .svgWidth=${this.svgWidth}
          .svgHeight=${DEFAULT_SXS_HISTOGRAM_HEIGHT_FOR_CUSTOM_FUNCS}
          .showBottomAxis=${false}
          .titleOnLeft=${'A'}>
        </comparator-histogram>
        <comparator-histogram
          .getHistogramSpec=${getHistogramSpec}
          .getRawDataValues=${getHistogramDataForB}
          .handleClickHistogramBar=${handleClickHistogramBarForB}
          .isAnyBinSelected=${isAnyBinSelectedForB}
          .isThisBinSelected=${isThisBinSelectedForB}
          .specificColorScheme=${'B'}
          .svgWidth=${this.svgWidth}
          .svgHeight=${DEFAULT_SXS_HISTOGRAM_HEIGHT_FOR_CUSTOM_FUNCS}
          .showBottomAxis=${true}
          .titleOnLeft=${'B'}>
        </comparator-histogram>
        <comparator-histogram
          .getHistogramSpec=${getHistogramSpecForDiff}
          .getRawDataValues=${getHistogramDataForDiff}
          .handleClickHistogramBar=${handleClickHistogramBarForDiff}
          .isAnyBinSelected=${isAnyBinSelectedForDiff}
          .isThisBinSelected=${isThisBinSelectedForDiff}
          .svgWidth=${this.svgWidth}
          .svgHeight=${DEFAULT_SXS_HISTOGRAM_HEIGHT_FOR_CUSTOM_FUNCS}
          .showBottomAxis=${true}
          .titleOnLeft=${'A-B'}>
        </comparator-histogram>`;
    } else {
      return '';
    }
  }

  private renderCustomFunctionRow(customFunc: CustomFunction) {
    const handleClickTableRow = (customFuncId: number) => {
      if (this.appState.selectedCustomFuncId === customFuncId) {
        this.appState.selectedCustomFuncId = null;
      } else {
        this.appState.selectedCustomFuncId = customFuncId;
      }
    };

    const customFuncRowStyle = (customFuncId: number) => classMap({
      'selected': customFuncId === this.appState.selectedCustomFuncId,
    });

    // prettier-ignore
    const renderChart =
        (customFunc.returnType === CustomFuncReturnType.BOOLEAN) ? html`
          <td class="results-chart">
            ${this.renderChartForBooleanType(customFunc)}
          </td>` :
                                                                   html`
          <td class="results-chart">
            ${this.renderChartForNumberType(customFunc)}
          </td>`;

    const handleClickEditIcon = () => {
      this.editedCustomFunc = {
        ...this.appState.customFunctions[customFunc.id],
      };
      this.appState.selectedCustomFuncId = customFunc.id;
      this.appState.isShowCustomFuncEditor = true;
    };

    const handleClickRemoveIcon = () => {
      // Double-check if id exists before delete.
      if (this.appState.customFunctions[customFunc.id] !== undefined) {
        // If this function is selected, deselect it.
        if (this.appState.selectedCustomFuncId === customFunc.id) {
          this.appState.selectedCustomFuncId = null;
        }

        // If sorted by this function, reset it.
        const fieldId = getFieldIdForCustomFunc(customFunc.id);
        if (
          this.appState.currentSorting.customField != null &&
          this.appState.currentSorting.customField.id === fieldId
        ) {
          this.appState.resetSorting();
        }

        delete this.appState.selectionsFromCustomFuncResults[customFunc.id];
        delete this.appState.customFunctions[customFunc.id];

        this.appState.columns = this.appState.columns.filter(
          (field: Field) => field.id !== fieldId,
        );
        this.appState.updateStatusMessage('Removed the custom function.', true);
      }
    };

    const styleEditIcon = classMap({
      'icon': true,
      'clickable': true,
      'disabled': customFunc.precomputed === true,
    });

    // TODO: Improve the design for displaying custom func rows.
    // prettier-ignore
    return html`
      <tr class=${customFuncRowStyle(customFunc.id)}>
        <td class="function-info clickable"
          @click=${() => void handleClickTableRow(customFunc.id)}>
          <div class="function-name">${customFunc.name}</div>
          <div class="function-type">${customFunc.returnType}</div>
        </td>
          ${renderChart}
        </td>
        <td class="edit-remove-icons">
          <mwc-icon class=${styleEditIcon} @click=${handleClickEditIcon}>
            edit
          </mwc-icon>
          <mwc-icon class="icon clickable" @click=${handleClickRemoveIcon}>
            cancel
          </mwc-icon>
        </td>
      </tr>`;
  }

  private renderCustomFunctionList() {
    const customFuncRows =
        Object.values(this.appState.customFunctions)
            .map(
                (customFunc) => this.renderCustomFunctionRow(customFunc),
            );

    return html` <table class="statement-table">
      <tbody> ${customFuncRows} </tbody>
    </table>`;
  }

  private renderCustomFunctionEditor() {
    const handleCustomFuncNameChange = (e: Event) => {
      this.editedCustomFunc.name = (e.target as HTMLInputElement).value;
    };
    const handleCustomFuncBodyChange = (e: Event) => {
      this.editedCustomFunc.functionBody = (e.target as HTMLInputElement).value;
    };

    const handleClickRun = () => {
      if (this.editedCustomFunc.functionBody === '') {
        this.appState.updateStatusMessage('Write an expression.');
        return;
      }

      // If name is empty, use the body.
      if (this.editedCustomFunc.name === '') {
        this.editedCustomFunc.name = this.editedCustomFunc.functionBody;
      }

      this.appState.runCustomFunction(
          this.appState.examples,
          this.editedCustomFunc,
      );
    };

    const handleClickCreateNewFuncButton = () => {
      if (this.appState.isShowCustomFuncEditor === false) {
        this.editedCustomFunc = makeNewCustomFunc(
            this.appState.newCustomFuncId,
        );
        this.appState.isShowCustomFuncEditor = true;
      } else {
        this.appState.isShowCustomFuncEditor = false;
      }
    };

    // prettier-ignore
    return html`
        <div class="edit-custom-function">
          <div class="edit-custom-function-title clickable"
            @click=${handleClickCreateNewFuncButton}>
            <div>Create New Function</div>
            <div>
              ${
        this.appState.isShowCustomFuncEditor === false ?
            html`<mwc-icon class="expand-icon">unfold_more</mwc-icon>` :
            html`<mwc-icon class="expand-icon">close</mwc-icon>`}
            </div>
          </div>
            ${
        this.appState.isShowCustomFuncEditor === true ?
            html`
              <div class="edit-custom-function-form">
                <div class="field-row">
                  <div class="field-row-label">Name</div>
                  <input type="text" class="func-name-input"
                      @change=${handleCustomFuncNameChange}
                      placeholder='e.g., "Starts with Sure"'
                      .value=${this.editedCustomFunc.name} />
                </div>

                <div class="field-row">
                  <div class="field-row-label">Syntax</div>
                  <div class="field-row-content">
                    ${
                Object.values(CustomFuncType)
                    .filter(funcType => funcType !== CustomFuncType.PRECOMPUTED)
                    .map(
                        val => html`
                          <div>
                            <input type="radio" name="custom-func-type"
                              id="custom-func-type-${val}" value=${val}
                              .checked=${
                            val === this.editedCustomFunc.functionType}
                              @change=${
                            () => this.editedCustomFunc.functionType = val}
                            />
                            <label for="custom-func-type-${val}">
                              ${val}
                            </label>
                          </div>`)}
                  </div>
                </div>

                <div class="field-row">
                  <div class="field-row-label">Expr.</div>
                  <textarea rows="4"
                    @change=${handleCustomFuncBodyChange}
                    placeholder=${
                this.editedCustomFunc.functionType === CustomFuncType.REGEXP ?
                    'Regular expression for pattern matching (e.g., "^Sure")' :
                    'JavaScript expression that takes "output" (and "input") and returns boolean or number (e.g., output.length)'}
                    .value=${this.editedCustomFunc.functionBody}>
                  </textarea>
                </div>

                <div class="field-row">
                  <div class="field-row-label">Return</div>
                  <div class="field-row-content">
                    ${
                Object.values(CustomFuncReturnType)
                    .map(
                        val => html`
                      <div>
                        <input type="radio" name="custom-func-return-type"
                          id="custom-func-return-type-${val}" value=${val}
                          .checked=${val === this.editedCustomFunc.returnType}
                          @change=${
                            () => this.editedCustomFunc.returnType = val}
                        />
                        <label for="custom-func-return-type-${val}">
                          ${val}
                        </label>
                      </div>`)}
                  </div>
                </div>

                <button class="run-button" @click=${handleClickRun}>
                  Run
                </button>
              </div>
              ` :
            html``}
        </div>`;
  }

  override render() {
    return html` <div class="sidebar-component">
      <div class="sidebar-component-title">
        Custom Functions
        <span class="additional-note">(Click row to see the values)</span>
      </div>
      <div class="sidebar-component-content">
        ${this.renderCustomFunctionList()}
        ${this.renderCustomFunctionEditor()}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-custom-functions': CustomFunctionsElement;
  }
}
