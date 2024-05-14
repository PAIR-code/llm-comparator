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

import {MobxLitElement} from '@adobe/lit-mobx';
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {core} from '../core';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import {AOrB, CustomFuncReturnType, CustomFunction, Field, FieldType, RationaleCluster, SortColumn,} from '../lib/types';
import {getBarFilterLabel, getHistogramFilterLabel} from '../lib/utils';
import {AppState} from '../services/state_service';

import {styles} from './toolbar.css';

/**
 * Toolbar component at the top of the main table.
 */
@customElement('comparator-toolbar')
export class ToolbarElement extends MobxLitElement {
  private readonly appState = core.getService(AppState);

  static override get styles() {
    return [sharedStyles, styles];
  }

  private renderFilterChip(label: string, handleClickCancel: () => void) {
    return html` <div class="filter-chip">
      <span>${label}</span>
      <mwc-icon class="chip-cancel-icon" @click=${handleClickCancel}>
        cancel
      </mwc-icon>
    </div>`;
  }

  private renderFilterChips() {
    const chipForTag =
      this.appState.selectedTag != null
        ? this.renderFilterChip(
            `Categories contain "${this.appState.selectedTag}"`,
            () => {
              this.appState.selectedTag = null;
            },
          )
        : '';

    const chipForSearch = Object.entries(this.appState.searchFilters)
      .filter(([fieldId, stringToSearch]) => stringToSearch !== '')
      .map(([fieldId, stringToSearch]) => {
        const field = this.appState.getFieldFromId(fieldId);
        return this.renderFilterChip(
          `${field ? field.name : fieldId} matches "${stringToSearch}"`,
          () => {
            this.appState.resetSearchFilter(fieldId);
          },
        );
      });

    const chipForScore =
      this.appState.selectedHistogramBinForScores != null
        ? this.renderFilterChip(
            `${getHistogramFilterLabel(
              'score',
              this.appState.histogramSpecForScores,
              this.appState.selectedHistogramBinForScores,
            )}`,
            () => {
              this.appState.selectedHistogramBinForScores = null;
            },
          )
        : '';

    const chipsForCustomFuncs =
        Object
            .values(
                this.appState.customFunctions,
                )
            .flatMap((customFunc: CustomFunction) => {
              // Return each model if not null.
              const selections =
                  this.appState.selectionsFromCustomFuncResults[customFunc.id];
              return Object.entries(selections)
                  .filter(([key, value]) => value != null)
                  .map(([key, value]) => {
                    const histogramSpec =
                        customFunc.returnType === CustomFuncReturnType.NUMBER ?
                        key === 'A-B' ?
                        this.appState
                                .histogramSpecForCustomFuncsOfDiff[customFunc
                                                                       .id] :
                        this.appState
                                .histogramSpecForCustomFuncs[customFunc.id] :
                        null;

                    const label =
                        customFunc.returnType === CustomFuncReturnType.BOOLEAN ?
                        getBarFilterLabel(
                            customFunc.name,
                            key,
                            selections[key] as boolean | null,
                            ) :
                        getHistogramFilterLabel(
                            customFunc.name,
                            histogramSpec,
                            selections[key] as number,
                            key,
                        );
                    const cancelCallback = () => {
                      selections[key] = null;
                    };
                    return this.renderFilterChip(label, cancelCallback);
                  });
            });

    const chipsForHistogramsForCustomFields =
      this.appState.customFieldsOfNumberType
        .filter(
          (field: Field) =>
            this.appState.selectedHistogramBinForCustomFields[field.id] != null,
        )
        .map((field: Field) =>
          this.renderFilterChip(
            getHistogramFilterLabel(
              field.name,
              this.appState.histogramSpecForCustomFields[field.id],
              this.appState.selectedHistogramBinForCustomFields[
                field.id
              ] as number,
            ),
            () => {
              this.appState.selectedHistogramBinForCustomFields[field.id] =
                null;
            },
          ),
        );

    // Chips for selections on side by side histograms.
    const chipsForSideBySideHistograms =
      this.appState.customFieldsOfPerModelNumberType.flatMap((field: Field) => {
        const selections = this.appState.selectedHistogramBinForCustomFields[
          field.id
        ] as {[key: string]: number | null};
        return Object.values(AOrB)
          .filter((model: string) => selections[model] != null)
          .map((model: string) => {
            const label = getHistogramFilterLabel(
              field.name,
              this.appState.histogramSpecForCustomFields[field.id],
              selections[model] as number,
              model,
            );
            const cancelCallback = () => {
              selections[model] = null;
            };
            return this.renderFilterChip(label, cancelCallback);
          });
      });

    // Chips for selections on bar charts.
    // Note that selectedBarChartFields[field.id] is a single-item array.
    const chipsForBarChartsForCustomFields =
      this.appState.customFieldsOfCategoryType
        .filter(
          (field: Field) =>
            this.appState.selectedBarChartValues[field.id][0] != null,
        )
        .map((field: Field) =>
          this.renderFilterChip(
            `${field.name} = "${
              this.appState.selectedBarChartValues[field.id][0]
            }"`,
            () => {
              this.appState.selectedBarChartValues[field.id][0] = null;
            },
          ),
        );

    // Chips for selections on grouped bar charts for per_model_category type.
    // Note that selectedBarChartFields[field.id] is a two-item array
    // (e.g., [null, 'sports'] if none of the bars for A are selected, but
    // the bar for 'sports' is selected for B).
    const chipsForGroupedBarChartsForCustomFields =
      this.appState.customFieldsOfPerModelCategoryTypeIncludingPerRating.flatMap(
        (field: Field) => {
          const selection = this.appState.selectedBarChartValues[field.id];
          return Object.values(AOrB)
            .map((model: AOrB, groupIndex: number) => [model, groupIndex])
            .filter(
              ([model, groupIndex]) => selection[groupIndex as number] != null,
            )
            .map(([model, groupIndex]) => {
              const isPerRating =
                field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY;
              const operator = isPerRating === true ? 'has' : '=';
              return this.renderFilterChip(
                `${field.name}(${model}) ${operator} "${
                  selection[groupIndex as number]
                }"`,
                () => {
                  selection[groupIndex as number] = null;
                },
              );
            });
        },
      );

    const chipForRationaleCluster =
      this.appState.selectedRationaleClusterId != null
        ? this.renderFilterChip(
            `Rationale Cluster = "${
              this.appState.rationaleClusters.filter(
                (cluster: RationaleCluster) =>
                  cluster.id === this.appState.selectedRationaleClusterId,
              )[0].title
            }"`,
            () => {
              this.appState.selectedRationaleClusterId = null;
            },
          )
        : '';

    return html` ${chipForTag} ${chipForSearch} ${chipForScore}
    ${chipsForCustomFuncs} ${chipForRationaleCluster}
    ${chipsForHistogramsForCustomFields} ${chipsForSideBySideHistograms}
    ${chipsForBarChartsForCustomFields}
    ${chipsForGroupedBarChartsForCustomFields}`;
  }

  override render() {
    // Number of examples.
    const totalNum = this.appState.examples.length;
    const filteredNum = this.appState.filteredExamples.length;
    const shownNum = this.appState.examplesForMainTable.length;

    // Filter chips.
    const renderFilterChips = this.renderFilterChips();

    const isAnyFilter = filteredNum < totalNum;

    // Sorting.
    const currentSorting = this.appState.currentSorting;

    // prettier-ignore
    return html`
      <div id="toolbar">
        <div class="toolbar-item example-count">
          <span>
            ${shownNum} displayed
            ${
        filteredNum !== totalNum ? html`
                of <strong>${this.appState.filteredExamples.length}</strong>
                filtered` :
                                   ''}
            (${totalNum} total)
          </span>
        </div>

        <div class="toolbar-item filters">
          ${
        isAnyFilter === true ?
            html`<label>Filters:</label> ${renderFilterChips}` :
            ''}
        </div>

        ${
        currentSorting.column !== SortColumn.NONE ?
            html`
              <div class="toolbar-item">
                <label>Sorted by:</label>
                <span>
                  <strong>
                    ${
                currentSorting.column === SortColumn.CUSTOM_ATTRIBUTE ?
                    currentSorting.customField!.name :
                    currentSorting.column}
                    ${
                currentSorting.modelIndex != null ?
                    ` for Response ${
                        Object.values(AOrB)[currentSorting.modelIndex]}` :
                    ''}
                  </strong>
                  ${currentSorting.order}
                </span>
              </div>` :
            ''}
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-toolbar': ToolbarElement;
  }
}
