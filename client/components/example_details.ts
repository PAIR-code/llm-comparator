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
import {classMap} from 'lit/directives/class-map.js';
import {computed, makeObservable, observable} from 'mobx';

import {core} from '../core';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import {
  AOrB,
  Field,
  FieldType,
  IndividualRating,
  SortOrder,
} from '../lib/types';
import {
  compareNumbersWithNulls,
  getHistogramBinIndexFromValue,
  getHistogramFilterLabel,
} from '../lib/utils';
import {AppState} from '../services/state_service';

import {styles} from './example_details.css';

/**
 * Component for visualizing raw rater scores, etc.
 */
@customElement('comparator-example-details')
export class ExampleDetailsElement extends MobxLitElement {
  private readonly appState = core.getService(AppState);

  static override styles = [sharedStyles, styles];

  // Sort by score.
  @observable sortOrder = SortOrder.NONE;

  @computed
  get selectedExample() {
    return this.appState.selectedExample;
  }

  // List of filtered ratings. Two types of filters: a score range from the
  // histogram and a custom field of per_rating_per_model_category type.
  @computed
  get filteredRatings() {
    if (this.selectedExample == null) {
      return [];
    }

    return this.selectedExample.individual_rater_scores
      .filter(
        (rating: IndividualRating) =>
          this.appState.selectedHistogramBinForRatingsForSelectedExample ==
            null ||
          (rating.score != null &&
            getHistogramBinIndexFromValue(
              this.appState.histogramSpecForScores,
              rating.score,
            ) ===
              this.appState.selectedHistogramBinForRatingsForSelectedExample),
      )
      .filter((rating: IndividualRating) => {
        const selection = this.appState.selectedBarChartValueForSelectedExample;
        return (
          selection == null ||
          rating.custom_fields[selection.fieldId][selection.modelIndex] ===
            selection.value
        );
      });
  }

  // List of ratings that will be rendered as a table.
  @computed
  get sortedRatings() {
    return this.filteredRatings.sort(
      (a: IndividualRating, b: IndividualRating) =>
        this.sortOrder === SortOrder.NONE
          ? 1
          : compareNumbersWithNulls(
              a.score,
              b.score,
              this.sortOrder === SortOrder.DESC,
            ),
    );
  }

  constructor() {
    super();
    makeObservable(this);
  }

  // Score histogram for the individual ratings for a selected example.
  private renderScoreHistogram() {
    const svgWidth = 220;
    const svgHeight = 110;

    const getHistogramRawDataValues = () => {
      return this.filteredRatings
        .filter((rating) => rating.score != null)
        .map((rating) => rating.score as number);
    };

    const handleClickHistogramBar = (binIndex: number) => {
      if (
        this.appState.selectedHistogramBinForRatingsForSelectedExample ===
        binIndex
      ) {
        this.appState.selectedHistogramBinForRatingsForSelectedExample = null;
      } else {
        this.appState.selectedHistogramBinForRatingsForSelectedExample =
          binIndex;
      }
    };

    const isAnyBinSelected = () =>
      this.appState.selectedHistogramBinForRatingsForSelectedExample !== null;
    const isThisBinSelected = (binIndex: number) =>
      binIndex ===
      this.appState.selectedHistogramBinForRatingsForSelectedExample;

    // prettier-ignore
    return html` <comparator-histogram
      .getHistogramSpec=${() => this.appState.histogramSpecForScores}
      .getRawDataValues=${getHistogramRawDataValues}
      .handleClickHistogramBar=${handleClickHistogramBar}
      .isAnyBinSelected=${isAnyBinSelected}
      .isThisBinSelected=${isThisBinSelected}
      .svgWidth=${svgWidth}
      .svgHeight=${svgHeight}
      .neutralColorThreshold=${() => this.appState.winRateThreshold}
      .showAxisEndDescription=${true}
      .isFlipXAxis=${() => this.appState.isFlipScoreHistogramAxis}>
    </comparator-histogram>`;
  }

  // TODO: Create a separate data-table component.
  private renderRaterTable() {
    const selectedExample = this.selectedExample;
    if (selectedExample == null) {
      return html``;
    }

    const readableRating = (
      label: string | null,
      isFlipped: boolean | null,
    ) => {
      if (label == null) {
        return '';
      } else if (label.endsWith('Than') || label.endsWith('SameAs')) {
        return isFlipped === true ? `B is ${label} A` : `A is ${label} B`;
      } else {
        return label;
      }
    };

    const styleScore = (score: number | null) =>
      classMap({
        'center-aligned': true,
        'a-win':
          this.appState.isScoreDivergingScheme === true &&
          score != null &&
          score > this.appState.scoreMiddlePoint,
        'b-win':
          this.appState.isScoreDivergingScheme === true &&
          score != null &&
          score < this.appState.scoreMiddlePoint,
      });

    const styleSortIcons = (order: SortOrder) =>
      classMap({
        'sort-icon': true,
        'up': order === SortOrder.ASC,
        'down': order === SortOrder.DESC,
        'active': this.sortOrder === order,
      });
    const handleClickSortIcon = (order: SortOrder) => {
      if (order === this.sortOrder) {
        this.sortOrder = SortOrder.NONE;
      } else {
        this.sortOrder = order;
      }
    };
    const renderSortIcons = () =>
      html` <div class="sort-icons-container">
        <mwc-icon
          class=${styleSortIcons(SortOrder.ASC)}
          @click=${() => void handleClickSortIcon(SortOrder.ASC)}>
          arrow_drop_up
        </mwc-icon>
        <mwc-icon
          class=${styleSortIcons(SortOrder.DESC)}
          @click=${() => void handleClickSortIcon(SortOrder.DESC)}>
          arrow_drop_down
        </mwc-icon>
      </div>`;

    // Table header.
    const renderCustomFieldHeaderCell = (field: Field) => {
      if (field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY) {
        return html` <th class="" colspan="2">${field.name}</th>`;
      } else {
        return html` <th class="">${field.name}</th>`;
      }
    };

    const renderCustomFieldHeaderCellSecondRow = (field: Field) => {
      if (field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY) {
        return html` <th><span class="model-a">A</span></th>
          <th><span class="model-b">B</span></th>`;
      } else {
        return html`<th></th>`;
      }
    };

    const renderHeaderRow = html` <tr>
        <th class="index" rowspan="2">Index</th>
        <th class="score" rowspan="2">Score ${renderSortIcons()}</th>
        <th class="label" rowspan="2">Rating</th>
        <th class="flipped" rowspan="2">Flipped?</th>
        <th class="rationale" rowspan="2">Rationale</th>
        ${
        this.appState.customFieldsOfPerRatingType.map(
            (field: Field) => renderCustomFieldHeaderCell(field),
            )}
      </tr>
      <tr class="second-row">
        ${
        this.appState.customFieldsOfPerRatingType.map(
            (field: Field) => renderCustomFieldHeaderCellSecondRow(field),
            )}
      </tr>`;

    // Table body.

    // Selection for a custom field of per_rating_per_model_category type.
    // It can be specified by clicking a bar on bar charts in the main table.
    const selection = this.appState.selectedBarChartValueForSelectedExample;

    const renderCustomField = (rating: IndividualRating, field: Field) => {
      const styleCell = (modelIndex: number, value: string | null) =>
        classMap({
          'highlighted':
            selection != null &&
            selection.fieldId === field.id &&
            selection.modelIndex === modelIndex &&
            selection.value === value,
        });

      if (field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY) {
        const value = (rating.custom_fields[field.id] as Array<
          string | null
        >) || [null, null];
        if (value.length !== 2) {
          throw new Error(`Invalid value for field ${field.id}: ${value}`);
        }
        return html` <td class=${styleCell(0, value[0])}>${value[0]}</td>
          <td class=${styleCell(1, value[1])}>${value[1]}</td>`;
      } else {
        return html` <td>${rating.custom_fields[field.id]}</td>`;
      }
    };

    const renderRow = (rating: IndividualRating) => {
      return html` <tr>
        <td class="center-aligned">${rating.index}</td>
        <td class=${styleScore(rating.score)}>${rating.score}</td>
        <td>${readableRating(rating.rating_label, rating.is_flipped)}</td>
        <td class="center-aligned">
          ${rating.is_flipped == null
            ? 'Unknown'
            : rating.is_flipped === true
              ? 'Y'
              : 'N'}
        </td>
        <td class="rationale"> ${rating.rationale} </td>
        ${this.appState.customFieldsOfPerRatingType.map((field: Field) =>
          renderCustomField(rating, field),
        )}
      </tr>`;
    };

    const renderSortedRatings = this.sortedRatings.map(
      (rating: IndividualRating) => renderRow(rating),
    );

    return html` <table>
      <thead>${renderHeaderRow}</thead>
      <tbody>${renderSortedRatings}</tbody>
    </table>`;
  }

  // Filter chips at the top of the panel.
  private renderFilterChip(label: string, handleClickCancelButton: () => void) {
    return html`<div class="filter-chip">
      <span>${label}</span>
      <mwc-icon class="chip-cancel-icon" @click=${handleClickCancelButton}>
        cancel
      </mwc-icon>
    </div>`;
  }

  private renderFilterChips() {
    // Score filter.
    const labelScore = getHistogramFilterLabel(
      'score',
      this.appState.histogramSpecForScores,
      this.appState.selectedHistogramBinForRatingsForSelectedExample,
      null,
    );
    const handleClickCancelButtonForScore = () => {
      this.appState.selectedHistogramBinForRatingsForSelectedExample = null;
    };

    // Custom field filter.
    const selection = this.appState.selectedBarChartValueForSelectedExample;
    const selectionField =
      selection == null
        ? null
        : this.appState.getFieldFromId(selection.fieldId);
    // prettier-ignore
    const labelCustomField = selection == null || selectionField == null ?
        '' :
        `${selectionField.name}(${
        Object.values(AOrB)[selection.modelIndex]}) = ${selection.value}`;

    const handleClickCancelButtonForCustomField = () => {
      this.appState.selectedBarChartValueForSelectedExample = null;
    };

    return html`
      ${this.appState.selectedHistogramBinForRatingsForSelectedExample != null
        ? this.renderFilterChip(labelScore, handleClickCancelButtonForScore)
        : html``}
      ${this.appState.selectedBarChartValueForSelectedExample != null
        ? this.renderFilterChip(
            labelCustomField,
            handleClickCancelButtonForCustomField,
          )
        : html``}
    `;
  }

  override render() {
    const showSelectedExampleDetails = this.appState.showSelectedExampleDetails;
    const selectedExample = this.appState.selectedExample;

    if (showSelectedExampleDetails === false || selectedExample == null) {
      return html``;
    }

    const handleClickCloseButton = () => {
      this.appState.showSelectedExampleDetails = false;
      this.appState.selectedExample = null;
      this.appState.selectedHistogramBinForRatingsForSelectedExample = null;
      this.appState.selectedBarChartValueForSelectedExample = null;
    };

    const handleClickExpandButton = () => {
      this.appState.exampleDetailsPanelExpanded =
        !this.appState.exampleDetailsPanelExpanded;
    };

    // prettier-ignore
    return html`
        <div class="panel-container">
          <div class="panel-header">
            <div class="panel-title">
              <h3>Individual Ratings for Selected Example</h3>
              <div class="filter-chips">${this.renderFilterChips()}</div>
            </div>
            <div class="buttons">
              <mwc-icon class="clickable" @click=${handleClickExpandButton}>
                ${this.appState.exampleDetailsPanelExpanded === true ?
                  'expand_more' :
                  'expand_less'}
              </mwc-icon>
              <mwc-icon class="clickable" @click=${handleClickCloseButton}>
                close
              </mwc-icon>
            </div>
          </div>
          <div class="panel-contents">
            <div class="score-distribution-chart">
              ${this.renderScoreHistogram()}
            </div>
            <div class="rating-table">
              ${this.renderRaterTable()}
            </div>
          </div>
        </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-example-details': ExampleDetailsElement;
  }
}
