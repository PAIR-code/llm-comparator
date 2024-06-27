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

import '@material/mwc-icon';

import {MobxLitElement} from '@adobe/lit-mobx';
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {makeObservable, observable} from 'mobx';

import {core} from '../core';
import {DEFAULT_NUM_EXAMPLES_TO_DISPLAY, FIELD_ID_FOR_INDEX, FIELD_ID_FOR_INPUT, FIELD_ID_FOR_OUTPUT_A, FIELD_ID_FOR_OUTPUT_B, FIELD_ID_FOR_RATIONALE_LIST, FIELD_ID_FOR_RATIONALES, FIELD_ID_FOR_SCORE, FIELD_ID_FOR_TAGS, LINE_HEIGHT_IN_CELL,} from '../lib/constants';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import {CustomFuncReturnType, CustomFunction, CustomFuncType, Example, Field, FieldType, IndividualRating, RatingChartSelection, RationaleListItem, SequenceChunk, SequenceChunkType, SortColumn, SortCriteria, SortOrder,} from '../lib/types';
import {constructImageSrcFromByte, getFieldIdForCustomFunc, getTextDiff, isEqualSorting, isPerModelFieldType, printCustomFuncResultValue, renderDiffString, renderSearchedString, toFixedIfNeeded,} from '../lib/utils';
import {AppState} from '../services/state_service';

import {styles} from './example_table.css';

/**
 * Main table component.
 */
@customElement('comparator-example-table')
export class ExampleTableElement extends MobxLitElement {
  private readonly appState = core.getService(AppState);

  static override get styles() {
    return [sharedStyles, styles];
  }

  @observable showSearchBoxes = false;

  constructor() {
    super();
    makeObservable(this);
  }

  private styleCustomField(field: Field, modelIndex: number | null = null) {
    return classMap({
      'custom-number': field.type === FieldType.NUMBER,
      'custom-string': field.type === FieldType.STRING,
      'custom-category': field.type === FieldType.CATEGORY,
      'custom-text': field.type === FieldType.TEXT,
      'custom-url': field.type === FieldType.URL,
      'custom-image': field.type === FieldType.IMAGE_PATH ||
          field.type === FieldType.IMAGE_BYTE,
      'custom-per-model': isPerModelFieldType(field) === true,
      'custom-per-model-boolean': field.type === FieldType.PER_MODEL_BOOLEAN,
      'custom-per-model-number': field.type === FieldType.PER_MODEL_NUMBER,
      'custom-per-model-category': field.type === FieldType.PER_MODEL_CATEGORY,
      'custom-per-model-text': field.type === FieldType.PER_MODEL_TEXT,
      'custom-per-model-first': modelIndex === 0,
      'custom-per-model-last': modelIndex === this.appState.models.length - 1,
      'custom-per-rating-string': field.type === FieldType.PER_RATING_STRING,
      'custom-per-rating-per-model-category':
          field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY,
    });
  }

  private renderCustomFuncResultChip(
      value: boolean|number|null,
      customFunc: CustomFunction,
  ) {
    const customFuncResultChipStyle = classMap({
      'custom-func-result-chip': true,
      'greyscale': customFunc.returnType === CustomFuncReturnType.BOOLEAN &&
          value !== true,
    });

    return html` <div class=${customFuncResultChipStyle}>
      ${customFunc.name}:
      <strong> ${printCustomFuncResultValue(value)} </strong>
    </div>`;
  }

  private styleHolder(exampleIndex: number) {
    return styleMap({
      'height': this.appState.getIsExampleExpanded(exampleIndex) !== true ?
          `${
              this.appState.numberOfLinesPerOutputCell *
              LINE_HEIGHT_IN_CELL}px` :
          'auto',
      'min-height': this.appState.getIsExampleExpanded(exampleIndex) === true ?
          `${
              this.appState.numberOfLinesPerOutputCell *
              LINE_HEIGHT_IN_CELL}px` :
          null,
    });
  }

  private renderPerModelField(
      values: boolean[]|number[]|string[],
      field: Field,
      exampleIndex: number,
  ) {
    if (values.length !== 2) {
      throw new Error('Per-model fields must have exactly 2 values.');
    } else {
      const cells = values.map((value, modelIndex) => {
        const renderValue = () => {
          // TDOO(b/348680044): Remove category from the if clause.
          if (field.type === FieldType.PER_MODEL_NUMBER ||
              field.type === FieldType.PER_MODEL_BOOLEAN ||
              field.type === FieldType.PER_MODEL_CATEGORY) {
            if (typeof value === 'number') {
              return toFixedIfNeeded(value);
            } else {
              return value;
            }
          } else {
            const styleHolder = this.styleHolder(exampleIndex);
            return html`<div class="text-holder" style=${styleHolder}>${
                value}</div>`;
          }
        };
        return html` <td class=${this.styleCustomField(field, modelIndex)}>
              ${renderValue()}
            </td>`;
      });
      return html`${cells}`;
    }
  }

  // Per-rating per-model-category case.
  // (e.g., Quality: [['Awesome' (A), 'Bad' (B)] (Rater #0), ...]).
  // We use rowIndex and columnIndex instead of example and field, to ensure
  // the charts get updated when state variables get updated.
  private renderPerRatingPerModelCategoryField(
    rowIndex: number,
    columnIndex: number,
  ) {
    // For drawing side-by-side bar charts.
    const getValueDomain = () => {
      const field = this.appState.visibleColumns[columnIndex];
      return this.appState.valueDomainsForCustomFields[field.id];
    };

    // Data for side-by-side bar charts.
    // e.g., if there exist three ratings, the return format will be like
    // [["Awesome", "Bad", "Good"], ["Okay", "Bad", "Good"]].
    const getBarChartData = () => {
      if (rowIndex >= this.appState.examplesForMainTable.length) {
        return [];
      } else {
        const ex = this.appState.examplesForMainTable[rowIndex];
        const field = this.appState.visibleColumns[columnIndex];
        // rating.custom_fields[field.id] must have two values (one for
        // Model A, the other for Model B, e.g., Quality for response A is
        // "Awesome", for B is "Okay").
        return [
          ex.individual_rater_scores.map(
            (rating) => (rating.custom_fields[field.id] as string[])[0],
          ),
          ex.individual_rater_scores.map(
            (rating) => (rating.custom_fields[field.id] as string[])[1],
          ),
        ];
      }
    };

    const isAnyBarSelected = (groupIndex: number | undefined) => {
      const field = this.appState.visibleColumns[columnIndex];
      return (
        this.appState.selectedBarChartValueForSelectedExample != null &&
        this.appState.selectedBarChartValueForSelectedExample.fieldId ===
          field.id &&
        this.appState.selectedBarChartValueForSelectedExample.modelIndex ===
          groupIndex
      );
    };

    const isThisBarSelected = (
      value: string,
      groupIndex: number | undefined,
    ) => {
      const field = this.appState.visibleColumns[columnIndex];
      return (
        this.appState.selectedBarChartValueForSelectedExample != null &&
        this.appState.selectedBarChartValueForSelectedExample.fieldId ===
          field.id &&
        this.appState.selectedBarChartValueForSelectedExample.modelIndex ===
          groupIndex &&
        this.appState.selectedBarChartValueForSelectedExample.value === value
      );
    };

    const handleClickBar = (value: string, groupIndex: number | undefined) => {
      const field = this.appState.visibleColumns[columnIndex];
      // One of the bars across all bars across all fields can be selected.
      const currentSelection =
        this.appState.selectedBarChartValueForSelectedExample;
      if (
        currentSelection != null &&
        currentSelection.fieldId === field.id &&
        currentSelection.modelIndex === groupIndex &&
        currentSelection.value === value
      ) {
        this.appState.selectedBarChartValueForSelectedExample = null;
      } else {
        this.appState.selectedExample =
          this.appState.examplesForMainTable[rowIndex];
        this.appState.showSelectedExampleDetails = true;
        this.appState.selectedBarChartValueForSelectedExample = {
          fieldId: field.id,
          modelIndex: groupIndex!,
          value,
        } as RatingChartSelection;
      }
    };

    const getHighlightedValues = () => {
      const field = this.appState.visibleColumns[columnIndex];
      return this.appState.selectedBarChartValues[field.id].filter(
        (value) => value != null,
      ) as string[];
    };

    return html` <td class="custom-per-rating-per-model-category">
      <div
        class="chart-holder"
        style=${
        this.styleHolder(this.appState.examplesForMainTable[rowIndex].index)}>
        <comparator-bar-chart
          .getValueDomain=${getValueDomain}
          .getGroupedDataValues=${getBarChartData}
          .groupCount=${2}
          .svgWidth=${130}
          .leftAxisWidth=${70}
          .barHeight=${6}
          .isAnyBarSelected=${isAnyBarSelected}
          .isThisBarSelected=${isThisBarSelected}
          .handleClickBar=${handleClickBar}
          .getHighlightedValues=${getHighlightedValues}>
        </comparator-bar-chart>
      </div>
    </td>`;
  }

  private renderRow(example: Example, rowIndex: number) {
    const handleDoubleClickRow = () => {
      this.appState.isExampleExpanded[example.index] =
          this.appState.getIsExampleExpanded(example.index) === true ? false :
                                                                       true;
    };
    const styleRow = classMap({
      'selected': this.appState.selectedExample === example,
      'monospace': this.appState.useMonospace === true,
    });

    const styleHolder = this.styleHolder(example.index);

    // Use text diff only when both are texts.
    const textDiff =
      typeof example.output_text_a === 'string' &&
      typeof example.output_text_b === 'string'
        ? getTextDiff(example.output_text_a, example.output_text_b)
        : getTextDiff('', '');

    // Render text string. It determines which strings to highlight.
    const renderTextString =
        (rawText: string, parsedText: string[]|null, searchQuery: string,
         selectedCustomFunc: CustomFunction|null) => {
          if (searchQuery !== '') {
            // If there is a search query.
            return renderSearchedString(rawText, searchQuery);
          } else if (
              selectedCustomFunc != null &&
              selectedCustomFunc.functionType === CustomFuncType.REGEXP) {
            // If there is a selected custom function that use regexp.
            return renderSearchedString(
                rawText, selectedCustomFunc.functionBody, false);
          } else if (
              parsedText != null && this.appState.isShowTextDiff === true) {
            // If match highlighting is enabled.
            return renderDiffString(parsedText, textDiff.isEquals);
          } else {
            return rawText;
          }
        };

    // Make sure to have no additional space within <div></div> because of the
    // white-space property.
    const renderText = (
        rawText: string|SequenceChunk[],
        parsedText: string[]|null,
        fieldId: string,
        ) => {
      const searchQuery = this.appState.searchFilters[fieldId];

      if (typeof rawText === 'string') {
        // Condition for custom func, used only for the response columns.
        const selectedCustomFunc = fieldId === FIELD_ID_FOR_OUTPUT_A ||
                fieldId === FIELD_ID_FOR_OUTPUT_B ?
            this.appState.selectedCustomFunc :
            null;
        return html` <div class="text-holder" style=${styleHolder}
          >${
            renderTextString(
                rawText, parsedText, searchQuery, selectedCustomFunc)}</div>`;
      } else {
        // Sequence chunks.
        return html` <div class="sequence-chunks-holder" style=${styleHolder}>
          ${rawText.map((chunk: SequenceChunk) =>
            chunk.type === SequenceChunkType.TEXT
              ? html`<div class="text-chunk"
                  >${searchQuery !== ''
                    ? renderSearchedString(chunk.data, searchQuery)
                    : chunk.data}</div
                >`
              : html`<div>
                  <img src=${constructImageSrcFromByte(chunk.data)} />
                </div>`,
          )}
        </div>`;
      }
    };

    // Use <ul> if there are two or more.
    const renderTag = (tag: string) => html`<li title="${tag}">${tag}</li>`;
    const renderTags =
      example.tags.length === 0
        ? ''
        : example.tags.length === 1
          ? example.tags[0]
          : html`<ul
              >${example.tags.map((tag: string) => renderTag(tag))}</ul
            >`;

    const handleClickRaterDetails = () => {
      if (
        this.appState.selectedExample === example &&
        this.appState.showSelectedExampleDetails === true
      ) {
        this.appState.selectedExample = null;
        this.appState.showSelectedExampleDetails = false;
      } else {
        this.appState.selectedExample = example;
        this.appState.showSelectedExampleDetails = true;
      }
    };

    // For those who are unfamiliar about how to interpret scores,
    // transform a float into the form of "A|B \n (abs(score))".
    const isABetter = this.appState.isWinnerFromScore('A', example.score);
    const isBBetter = this.appState.isWinnerFromScore('B', example.score);
    const isAAndBSame =
      example.score != null && example.score === this.appState.scoreMiddlePoint;

    const getHistogramRawDataValues = () => {
      if (rowIndex >= this.appState.examplesForMainTable.length) {
        return [];
      } else {
        return this.appState.examplesForMainTable[
          rowIndex
        ].individual_rater_scores
          .filter((rating) => rating.score != null)
          .map((rating) => rating.score as number);
      }
    };
    const renderHistogram = html` <comparator-histogram
      .getHistogramSpec=${() => this.appState.histogramSpecForScores}
      .getRawDataValues=${getHistogramRawDataValues}
      .svgWidth=${40}
      .svgHeight=${35}
      .showBottomAxis=${false}
      .neutralColorThreshold=${() => this.appState.winRateThreshold}
      .isSimplified=${true}
      .isFlipXAxis=${() => this.appState.isFlipScoreHistogramAxis}>
    </comparator-histogram>`;

    const scoreDescription = this.appState.isScoreDivergingScheme === true ?
        isABetter === true ?
        html`<div class="score-description a-win-color">A is better</div>` :
            isBBetter === true ?
        html`<div class="score-description b-win-color">B is better</div>` :
            isAAndBSame === true ?
        html`<div class="score-description">same</div>` :
        html`<div class="score-description">similar</div>` :
        '';
    const raterInfoLink = example.individual_rater_scores.length > 0 ?
        html`<div class="rater-info-link">
            ${example.individual_rater_scores.length}
            rater${example.individual_rater_scores.length > 1 ? 's' : ''}
          </div>
          ${renderHistogram}` :
        '';
    const renderScore = example.score == null ? 'Null' : html`
        <div class="score-holder" style=${styleHolder}>
          <div class="score-number">${example.score.toFixed(2)}</div>
          ${scoreDescription}
          ${raterInfoLink}
        </div>`;

    const styleScore = classMap({
      'score': true,
      'clickable': true,
      'a-win':
        this.appState.isScoreDivergingScheme === true && isABetter === true,
      'b-win':
        this.appState.isScoreDivergingScheme === true && isBBetter === true,
    });

    // Rationale summary.
    const styleRationaleItem = (rationaleItem: RationaleListItem) =>
      // Check if there is a selected or hovered cluster from the sidebar.
      classMap({
        'cluster-selected':
          rationaleItem.assignedClusterIds != null &&
          ((this.appState.selectedRationaleClusterId != null &&
            rationaleItem.assignedClusterIds.includes(
              this.appState.selectedRationaleClusterId,
            )) ||
            (this.appState.hoveredRationaleClusterId != null &&
              rationaleItem.assignedClusterIds.includes(
                this.appState.hoveredRationaleClusterId,
              ))),
      });

    const handleMouseenterRationaleItem = (
      rationaleItem: RationaleListItem,
    ) => {
      // There can be multiple matchedRationaleClusterIds because an item can be
      // assigned to multiple clusters.
      this.appState.matchedRationaleClusterIds =
        rationaleItem.assignedClusterIds || [];
    };
    const handleMouseleaveRationaleItem = () => {
      this.appState.matchedRationaleClusterIds = [];
    };

    const searchQueryForRationaleList =
      this.appState.searchFilters[FIELD_ID_FOR_RATIONALE_LIST];

    // prettier-ignore
    const renderRationaleList = example.rationale_list != null &&
            (isABetter === true || isBBetter === true) ?
        html`
            <div class="list-holder"
              style=${this.styleHolder(example.index)}>
              <ul class="rationale-list">
                ${
            example.rationale_list.map(
                (item: RationaleListItem) => html`
                    <li class=${styleRationaleItem(item)}
                      @mouseenter=${
                    () => void handleMouseenterRationaleItem(item)}
                      @mouseleave=${handleMouseleaveRationaleItem}>
                      ${
                    searchQueryForRationaleList == null ?
                        item.rationale :
                        renderSearchedString(
                            item.rationale, searchQueryForRationaleList)}
                    </li>`)}
              </ul>
            </div>` :
        '';

    // Tag chips.
    const renderTagChips =
      this.appState.isShowTagChips === true && example.tags.length > 0
        ? html`<ul class="tag-chips"
            >${example.tags.map(
              (tag: string) => html`<li class="tag-chip">${tag}</li>`,
            )}</ul
          >`
        : html``;

    // Custom function chips.
    const selectedCustomFunc = this.appState.selectedCustomFunc;

    const renderCustomFuncResultChip = (modelIndex: number) =>
        selectedCustomFunc != null ?
        this.renderCustomFuncResultChip(
            ((example.custom_fields[getFieldIdForCustomFunc(
                  selectedCustomFunc.id)] as Array<boolean|null>) ||
             Array<number|null>)[modelIndex],
            selectedCustomFunc,
            ) :
        html``;

    // Custom fields.
    const renderCustomField = (field: Field, columnIndex: number) => {
      if (field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY) {
        return this.renderPerRatingPerModelCategoryField(rowIndex, columnIndex);
      } else if (!(isPerModelFieldType(field) === true)) {
        // Non-per-model cases.
        let content = html``;

        // prettier-ignore
        if (example.custom_fields[field.id] == null) {
          content = html``;
        } else if (field.type === FieldType.NUMBER) {
          content = html`
              ${toFixedIfNeeded(example.custom_fields[field.id] as number)}`;
        } else if (field.type === FieldType.STRING ||
                  field.type === FieldType.CATEGORY) {
          content = html`
              <div class="text-holder" style=${styleHolder}
              >${example.custom_fields[field.id]}</div>`;
        } else if (field.type === FieldType.TEXT) {
          content = html`${renderText(
            example.custom_fields[field.id] as string,
            null,
            field.id,
          )}`;
        } else if (field.type === FieldType.URL) {
          content = html`
              <div class="text-holder" style=${styleHolder}
              ><a href=${example.custom_fields[field.id] as string}
                  target="_blank"
              >${example.custom_fields[field.id]}</a></div>`;
        } else if (field.type === FieldType.IMAGE_PATH) {
          content = html`
              <div class="text-holder" style=${styleHolder}
              ><img src=${example.custom_fields[field.id] as string} /></div>`;
        } else if (field.type === FieldType.IMAGE_BYTE) {
          content = html`
              <div class="text-holder" style=${styleHolder}
              ><img src=${constructImageSrcFromByte(
                  example.custom_fields[field.id] as string)} /></div>`;
        } else if (field.type === FieldType.PER_RATING_STRING) {
          content = html`
              <div class="text-holder" style=${styleHolder}
              >${example.individual_rater_scores.map(
                     (rating: IndividualRating) =>
                       rating.custom_fields[field.id]).join('\n')}</div>`;
        }

        return html`<td class=${this.styleCustomField(field)}>${content}</td>`;
      } else {
        // Per-model cases.
        const values =
            example.custom_fields[field.id] as boolean[] | string[] | number[];
        return this.renderPerModelField(values, field, example.index);
      }
    };

    // Rationales across all the ratings for each example are concatenated.
    // It would be useful for searching over rationale text, but should be
    // carefully used because they can be flipped and better to be viewed with
    // scores.
    const rationalesText = example.individual_rater_scores
      .map((rating: IndividualRating) => rating.rationale)
      .join('\n__________\n\n');

    const columns = this.appState.visibleColumns;
    const renderRow = columns.map((field: Field, columnIndex: number) => {
      if (field.id === FIELD_ID_FOR_INDEX) {
        return html` <td>${example.index}</td>`;
      } else if (field.id === FIELD_ID_FOR_INPUT) {
        return html` <td class="input-text">
          ${renderText(example.input_text, null, field.id)} ${renderTagChips}
        </td>`;
      } else if (field.id === FIELD_ID_FOR_OUTPUT_A) {
        return html` <td class="output-text">
          ${renderText(example.output_text_a, textDiff.parsedA, field.id)}
          ${renderCustomFuncResultChip(0)}
        </td>`;
      } else if (field.id === FIELD_ID_FOR_OUTPUT_B) {
        return html` <td class="output-text">
          ${renderText(example.output_text_b, textDiff.parsedB, field.id)}
          ${renderCustomFuncResultChip(1)}
        </td>`;
      } else if (field.id === FIELD_ID_FOR_TAGS) {
        return html` <td class="tags"> ${renderTags} </td>`;
      } else if (field.id === FIELD_ID_FOR_SCORE) {
        return html` <td
          class=${styleScore}
          @click=${handleClickRaterDetails}
          title=${example.individual_rater_scores.length > 0
            ? 'Click to see individual ratings'
            : ''}>
          ${renderScore}
        </td>`;
      } else if (field.id === FIELD_ID_FOR_RATIONALES) {
        return html` <td class="rationales">
          ${renderText(rationalesText, null, field.id)}
        </td>`;
      } else if (field.id === FIELD_ID_FOR_RATIONALE_LIST) {
        return html` <td class="rationale-list"> ${renderRationaleList} </td>`;
      } else {
        return renderCustomField(field, columnIndex);
      }
    });

    return html` <tr class=${styleRow} @dblclick=${handleDoubleClickRow}>
      ${renderRow}
    </tr>`;
  }

  private renderHeaderRow() {
    const styleTextColumn =
      this.appState.numberOfShownTextColumns !== 3
        ? styleMap({
            'width': `${(100 / this.appState.numberOfShownTextColumns).toFixed(
              1,
            )}%`,
          })
        : styleMap({});

    const handleClickSortIcon = (sorting: SortCriteria) => {
      const currentSorting = this.appState.currentSorting;
      if (isEqualSorting(currentSorting, sorting)) {
        this.appState.resetSorting();
      } else {
        this.appState.updateSorting(sorting);
      }
    };

    const currentSorting = this.appState.currentSorting;
    const styleSortIcons = (sorting: SortCriteria) =>
      classMap({
        'sort-icon': true,
        'up': sorting.order === SortOrder.ASC,
        'down': sorting.order === SortOrder.DESC,
        'active': isEqualSorting(currentSorting, sorting),
      });

    const isRenderSortIconsForFuncs =
        this.appState.selectedCustomFunc != null &&
        this.appState.selectedCustomFunc.returnType ===
            CustomFuncReturnType.NUMBER;

    const renderSortIcons = (
      column: SortColumn,
      customField: Field | null = null,
      modelIndex: number | null = null,
    ) => {
      const sortingCriteria = (order: SortOrder) =>
        ({column, customField, modelIndex, order}) as SortCriteria;
      return html` <div class="sort-icons-container">
        <mwc-icon
          class=${styleSortIcons(sortingCriteria(SortOrder.ASC))}
          @click=${() =>
            void handleClickSortIcon(sortingCriteria(SortOrder.ASC))}>
          arrow_drop_up
        </mwc-icon>
        <mwc-icon
          class=${styleSortIcons(sortingCriteria(SortOrder.DESC))}
          @click=${() =>
            void handleClickSortIcon(sortingCriteria(SortOrder.DESC))}>
          arrow_drop_down
        </mwc-icon>
      </div>`;
    };

    const renderSearchIcon = html` <div class="search-icon-container">
      <mwc-icon
        class="sort-icon"
        @click=${() => (this.showSearchBoxes = !this.showSearchBoxes)}>
        search
      </mwc-icon>
    </div>`;

    const renderSearchInput = (fieldId: string) => {
      // Fired when a user clicks the button, types the "Enter" key, or
      // clicks the x button.
      const handleApplySearchFilter = () => {
        this.appState.searchFilters[fieldId] =
          this.appState.searchFilterInputs[fieldId];
      };
      // Fired when a user types keystrokes.
      const handleChangeSearchFieldText = (e: Event) => {
        // Temporarily save to the table component's observable variables
        // to avoid excessive computations between every keystroke.
        this.appState.searchFilterInputs[fieldId] = (
          e.target as HTMLInputElement
        ).value;
        if (this.appState.searchFilterInputs[fieldId].length === 0) {
          handleApplySearchFilter();
        }
      };
      return this.showSearchBoxes === true ? html` <div class="search-field">
        <input
          type="search"
          @input=${handleChangeSearchFieldText}
          @change=${handleApplySearchFilter}
          placeholder="Enter text for search"
          .value=${this.appState.searchFilterInputs[fieldId] || ''} />
        <button @click=${handleApplySearchFilter}>Filter</button>
      </div>` :
                                             '';
    };

    const columns = this.appState.visibleColumns;
    // prettier-ignore
    const firstRow = columns
      .filter((field: Field) => field.visible === true)
      .map((field: Field) => {
        if (field.id === FIELD_ID_FOR_INDEX) {
          return html` <th class="example-index" rowspan="2">#</th>`;
        } else if (field.id === FIELD_ID_FOR_INPUT) {
          return html` <th
            class="input-text"
            rowspan="2"
            style=${styleTextColumn}>
            ${field.name}
            ${renderSearchIcon}
            ${renderSearchInput(FIELD_ID_FOR_INPUT)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_OUTPUT_A) {
          return html` <th
            class="output-text output-a"
            rowspan="2"
            style=${styleTextColumn}>
            ${field.name}
            ${renderSearchIcon}
            <br />(${this.appState.models[0].name})
            ${
              isRenderSortIconsForFuncs === true ?
                  renderSortIcons(SortColumn.FUNC_A) :
                  ''}
            ${renderSearchInput(FIELD_ID_FOR_OUTPUT_A)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_OUTPUT_B) {
          return html` <th
            class="output-text output-b"
            rowspan="2"
            style=${styleTextColumn}>
            ${field.name}
            ${renderSearchIcon}
            <br />(${this.appState.models[1].name})
            ${
              isRenderSortIconsForFuncs === true ?
                  renderSortIcons(SortColumn.FUNC_B) :
                  ''}
            ${renderSearchInput(FIELD_ID_FOR_OUTPUT_B)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_TAGS) {
          return html` <th class="tags" rowspan="2">
            ${field.name} ${renderSortIcons(SortColumn.TAGS)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_SCORE) {
          return html` <th class="score" rowspan="2">
            ${field.name} ${renderSortIcons(SortColumn.SCORE)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_RATIONALES) {
          return html` <th class="rationales" rowspan="2">
            ${field.name}
              <br /><small>(Be careful! A and B might be flipped.)</small>
              ${renderSearchIcon}
              ${renderSearchInput(FIELD_ID_FOR_RATIONALES)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_RATIONALE_LIST) {
          return html`
              <th class="rationale-list" rowspan="2">
                ${field.name}
                ${renderSearchIcon}
                ${renderSearchInput(FIELD_ID_FOR_RATIONALE_LIST)}
              </th>`;
        } else if (isPerModelFieldType(field) === true) {
          return html` <th colspan="2" class=${this.styleCustomField(field)}>
            <div class="custom-field-name" title=${field.name}>
              ${field.name}
            </div>
          </th>`;
        } else if (field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY) {
          return html` <th class=${this.styleCustomField(field)} rowspan="2">
            <div class="custom-field-name" title=${field.name}>
              ${field.name}
            </div>
          </th>`;
        } else {
          const sortIcons = field.type === FieldType.IMAGE_PATH ||
                  field.type === FieldType.IMAGE_BYTE ||
                  field.type === FieldType.TEXT ?
              '' :
              renderSortIcons(SortColumn.CUSTOM_ATTRIBUTE, field);
          const searchIconAndInput = field.type === FieldType.TEXT ? html`
                ${renderSearchIcon}
                ${renderSearchInput(field.id)}` :
                                                                     '';
          return html` <th class=${this.styleCustomField(field)} rowspan="2">
            <div class="custom-field-name" title=${field.name}>
              ${field.name}
            </div>
            ${sortIcons}
            ${searchIconAndInput}
          </th>`;
        }
      });

    const secondRow = columns
      .filter((field: Field) => field.visible === true)
      .filter((field: Field) => isPerModelFieldType(field) === true)
      .map(
        (field: Field) =>
          html` <th>
              <span class="model-a">A</span>
              ${renderSortIcons(SortColumn.CUSTOM_ATTRIBUTE, field, 0)}
            </th>
            <th>
              <span class="model-b">B</span>
              ${renderSortIcons(SortColumn.CUSTOM_ATTRIBUTE, field, 1)}
            </th>`,
      );

    return html` <tr class="header-row">${firstRow}</tr>
      <tr class="second-row">${secondRow}</tr>`;
  }

  // Render button for displaying 50 more examples.
  private renderDisplayMoreButton() {
    // Show the button only when number of examples that can be displayed is
    // greater than the number of currently shown.
    const numFilteredExamples = this.appState.filteredExamples.length;
    const numExamplesToShowMore = Math.min(
      DEFAULT_NUM_EXAMPLES_TO_DISPLAY,
      numFilteredExamples - this.appState.numExamplesToDisplay,
    );
    const handleClickMoreExamples = () => {
      this.appState.numExamplesToDisplay += numExamplesToShowMore;
    };

    // prettier-ignore
    return html`
      <div>
        ${numFilteredExamples > this.appState.numExamplesToDisplay ?
          html`
            <button class="display-more-button clickable"
              @click=${handleClickMoreExamples}>
              Display ${numExamplesToShowMore} more examples
            </button>` :
          ''}
      </div>`;
  }

  override render() {
    const styleHeader = classMap({
      'search-box-shown': this.showSearchBoxes,
    });

    try {
      const renderRows = this.appState.examplesForMainTable.map(
        (example: Example, rowIndex: number) =>
          this.renderRow(example, rowIndex),
      );

      // prettier-ignore
      return html`
          <table>
            <thead class=${styleHeader}>
              ${this.renderHeaderRow()}
            </thead>
            <tbody>
              ${renderRows}
            </tbody>
          </table>
          ${this.renderDisplayMoreButton()}
      `;
    } catch (error) {
      console.error(error);
      this.appState.updateStatusMessage(
        'Encountered an error while displaying the table.',
      );
      return;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-example-table': ExampleTableElement;
  }
}
