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
import {computed, makeObservable, observable} from 'mobx';

import {BUILT_IN_DEMO_FILES, DEFAULT_COLUMN_LIST, DEFAULT_HISTOGRAM_SPEC, DEFAULT_NUM_EXAMPLES_TO_DISPLAY, DEFAULT_RATIONALE_CLUSTER_SIMILARITY_THRESHOLD, DEFAULT_SORTING_CRITERIA, DEFAULT_WIN_RATE_THRESHOLD, FIELD_ID_FOR_INPUT, FIELD_ID_FOR_OUTPUT_A, FIELD_ID_FOR_OUTPUT_B, FIELD_ID_FOR_RATIONALE_LIST, FIELD_ID_FOR_RATIONALES, FIELD_ID_FOR_SCORE, FIVE_POINT_LIKERT_HISTOGRAM_SPEC, INITIAL_CUSTOM_FUNCTIONS,} from '../lib/constants';
import type {ChartSelectionKey, CustomFieldSchema, CustomFunction, Example, Field, HistogramSpec, IndividualRating, Metadata, Model, RatingChartSelection, RationaleCluster, RationaleListItem, SortCriteria,} from '../lib/types';
import {AOrB, ChartType, CustomFuncReturnType, DataResponse, ErrorResponse, FieldType, SortColumn, SortOrder,} from '../lib/types';
import {compareNumbersWithNulls, compareStringsWithNulls, convertToNumber, extractTextFromTextOrSequenceChunks, getFieldIdForCustomFunc, getHistogramBinIndexFromValue, getMinAndMax, groupByAndSortKeys, groupByValues, initializeCustomFuncSelections, isPerRatingFieldType, mergeTwoArrays, searchText,} from '../lib/utils';

import {CustomFunctionService} from './custom_function_service';
import {Service} from './service';

/**
 * State Service that manages all states for the app.
 */
export class AppState extends Service {
  constructor(private readonly customFunctionService: CustomFunctionService) {
    super();
    makeObservable(this);
  }

  // Fields from data files.
  @observable
  metadata: Metadata = {
    source_path: '',
    custom_fields_schema: [],
    sampling_step_size: 1,
  };
  @observable models: Model[] = [{name: ''}, {name: ''}];
  @observable examples: Example[] = [];
  @observable rationaleClusters: RationaleCluster[] = [];

  // Dataset path.
  @observable datasetPath: string|null = null;
  @observable isDatasetPathUploadedFile = false;
  @observable isOpenDatasetSelectionPanel = true;

  @observable exampleDatasetPaths: string[] = BUILT_IN_DEMO_FILES;

  // Tags.
  @observable selectedTag: string|null = null;

  // Table sorting.
  @observable currentSorting: SortCriteria = DEFAULT_SORTING_CRITERIA;

  // Example expansion (key: index). If not exists, assume false.
  @observable isExampleExpanded: {[key: number]: boolean} = {};
  getIsExampleExpanded(index: number): boolean {
    return this.isExampleExpanded[index] ?? false;
  }

  // Example details.
  @observable selectedExample: Example|null = null;
  @observable showSelectedExampleDetails = false;
  @observable exampleDetailsPanelExpanded = false;

  // Rationale clusters.
  @observable hasRationaleClusters = false;
  // When a user clicks or hovers a row from the rationale summary table.
  @observable selectedRationaleClusterId: number | null = null;
  @observable hoveredRationaleClusterId: number | null = null;
  // When a user hovers over a rationale item in the bulleted list from the
  // main table, its assigned clusters on the cluster table are highlighted.
  // Each item can be assigned to multiple clusters.
  @observable matchedRationaleClusterIds: number[] = [];

  @observable
  rationaleClusterSimilarityThreshold =
      DEFAULT_RATIONALE_CLUSTER_SIMILARITY_THRESHOLD;

  // Columns.
  // TODO: Use a url service to sync the visibility state.
  @observable columns: Field[] = DEFAULT_COLUMN_LIST;

  // Charts.
  // Toggleable sidebar components.
  @observable showSidebarComponents: {[key: string]: boolean} = {};

  // Bar charts.
  // Selections for simple bar charts and grouped bar charts.
  // Its key is the id of a Field.
  // For simple bar charts, a single-item array, e.g., [null] (non-selected);
  // for grouped bar charts, a two-item array, e.g., ['sports', null]
  // (if the bar for 'sports' is selected for A; no bars are selected for B).
  // TODO: Merge selection variables into one.
  @observable selectedBarChartValues: {[key: string]: Array<string | null>} =
    {};

  // Histograms.
  @observable histogramSpecForScores: HistogramSpec = DEFAULT_HISTOGRAM_SPEC;
  // Selections for the score histogram. A selected bin's index is stored.
  @observable selectedHistogramBinForScores: number | null = null;

  @observable histogramSpecForCustomFields: {[key: string]: HistogramSpec} = {};
  // Selections for histograms for custom fields.
  // Its key is the id of a Field.
  // If no bins are selected: null; if a bin is selected: store its index.
  @observable
  selectedHistogramBinForCustomFields: {
    [key: string]: number | null | {[key: string]: number | null};
  } = {};

  // Histogram selections for individual ratings for a selected example.
  @observable selectedHistogramBinForRatingsForSelectedExample: number | null =
    null;
  // Bar chart selections for individual ratings for a selected example.
  // Only one selection is allowed for now.
  @observable
  selectedBarChartValueForSelectedExample: RatingChartSelection | null = null;

  // Score.
  @observable winRateThreshold = DEFAULT_WIN_RATE_THRESHOLD;
  @observable isFlipScoreHistogramAxis = true;

  // Status message.
  @observable statusMessage = '';
  @observable isOpenStatusMessage = false;

  private statusMessageTimeout: number | null = null;

  // Search filters (key: Field.id).
  @observable searchFilters: {[key: string]: string} = {};
  @observable searchFilterInputs: {[key: string]: string} = {};

  resetSearchFilter(fieldId: string) {
    this.searchFilters[fieldId] = '';
    this.searchFilterInputs[fieldId] = '';
  }

  // Settings.
  @observable isOpenSettingsPanel = false;

  @observable isShowTextDiff = true;
  @observable useMonospace = false;

  @observable numExamplesToDisplay = DEFAULT_NUM_EXAMPLES_TO_DISPLAY;

  @observable isShowTagChips = true;
  @observable isShowSidebar = true;

  @observable numberOfLinesPerOutputCell = 7;

  // Columns.
  getFieldFromId(fieldId: string): Field | undefined {
    return this.columns.find((field: Field) => field.id === fieldId);
  }

  isColumnVisible(fieldId: string) {
    // Default is true if not specified.
    const matchedField = this.getFieldFromId(fieldId);
    return matchedField !== undefined && matchedField.visible === true;
  }

  // Number of text columns hidden (among input_text, output_text_a, and _b).
  // Used to determine the width percentage for these columns.
  @computed
  get numberOfShownTextColumns() {
    return (
      (this.isColumnVisible(FIELD_ID_FOR_INPUT) === true ? 1 : 0) +
      (this.isColumnVisible(FIELD_ID_FOR_OUTPUT_A) === true ? 1 : 0) +
      (this.isColumnVisible(FIELD_ID_FOR_OUTPUT_B) === true ? 1 : 0) +
      (this.isColumnVisible(FIELD_ID_FOR_RATIONALES) === true ? 1 : 0) +
      this.metadata.custom_fields_schema.filter(
        (field) =>
          field.type === FieldType.TEXT && this.isColumnVisible(field.name),
      ).length
    );
  }

  // Scores.
  @computed
  get scoreMiddlePoint(): number {
    return (
      (this.histogramSpecForScores.rangeLeft +
        this.histogramSpecForScores.rangeRight) *
      0.5
    );
  }

  // Check if A or B is a winner from a score.
  isWinnerFromScore(model: string, score: number | null) {
    if (score == null) {
      return false;
    }

    if (model === 'A') {
      return score > this.scoreMiddlePoint + this.winRateThreshold;
    } else if (model === 'B') {
      return score < this.scoreMiddlePoint - this.winRateThreshold;
    } else {
      return false;
    }
  }

  @computed
  get isScoreDivergingScheme(): boolean {
    return (
      this.scoreMiddlePoint === 0 ||
      (this.histogramSpecForScores.rangeLeft ===
        FIVE_POINT_LIKERT_HISTOGRAM_SPEC.rangeLeft &&
        this.histogramSpecForScores.rangeRight ===
          FIVE_POINT_LIKERT_HISTOGRAM_SPEC.rangeRight)
    );
  }

  // Custom functions.
  @observable customFunctions: {[key: number]: CustomFunction} = {};

  @observable histogramSpecForCustomFuncs: {[key: number]: HistogramSpec} = {};
  @observable
  histogramSpecForCustomFuncsOfDiff: {[key: number]: HistogramSpec} = {};

  @observable selectedCustomFuncId: number|null = null;

  // Selections over bars in Custom Functions.
  // Format: {customFuncId: {modelName: barIndex}} (where modelName is
  // either 'A', 'B', or 'A-B').
  @observable
  selectionsFromCustomFuncResults:
      {[key: number]: {[key: string]: boolean|number|null};} = {};

  @computed
  get selectedCustomFunc(): CustomFunction|null {
    if (this.selectedCustomFuncId != null) {
      return this.customFunctions[this.selectedCustomFuncId];
    } else {
      return null;
    }
  }

  @computed
  get selectedCustomFuncName(): string {
    if (this.selectedCustomFunc != null) {
      return this.selectedCustomFunc.name;
    } else {
      return '';
    }
  }

  // Get new custom function id by getting the max id number + 1.
  // This is needed instead of using the size, in case some of them are deleted.
  @computed
  get newCustomFuncId(): number {
    if (Object.keys(this.customFunctions).length === 0) {
      return 0;
    } else {
      // tslint:disable-next-line:ban-unsafe-reflection
      return Math.max(...Object.keys(this.customFunctions).map(Number)) + 1;
    }
  }

  @observable isShowCustomFuncEditor = false;

  // Fields for number types for histograms.
  @computed
  get customFieldsOfNumberType(): Field[] {
    return this.columns.filter(
      (field: Field) => field.type === FieldType.NUMBER,
    );
  }

  // Fields for category types.
  @computed
  get customFieldsOfCategoryType(): Field[] {
    return this.columns.filter(
      (field: Field) => field.type === FieldType.CATEGORY,
    );
  }

  // Fields for per-model number types for histograms.
  @computed
  get customFieldsOfPerModelNumberType(): Field[] {
    return (
        this.columns
            .filter((field: Field) => field.type === FieldType.PER_MODEL_NUMBER)
            // TODO: Will not need when custom functions are
            // merged.
            .filter((field: Field) => field.id.startsWith('custom_field:')));
  }

  // Fields for per-model category types.
  @computed
  get customFieldsOfPerModelCategoryTypeIncludingPerRating(): Field[] {
    return (
        this.columns
            .filter(
                (field: Field) => field.type === FieldType.PER_MODEL_CATEGORY ||
                    field.type === FieldType.PER_MODEL_BOOLEAN ||
                    field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY,
                )
            // Exclude custom functions
            // TODO: Will not need when custom functions are
            // merged.
            .filter((field: Field) => field.id.startsWith('custom_field:')));
  }

  customFieldsOfPerRatingTypesWithNoAggregationSupport(): FieldType[] {
    return [FieldType.PER_RATING_STRING];
  }

  // Fields for per-rating types.
  get customFieldsOfPerRatingType(): Field[] {
    return this.columns.filter((field: Field) => isPerRatingFieldType(field));
  }

  // Fields without per-rating types.
  get customFieldsWithoutPerRatingType(): Field[] {
    return this.columns.filter(
      (field: Field) =>
        !isPerRatingFieldType(field) && field.type !== FieldType.BASE,
    );
  }

  // Visible columns.
  @computed
  get visibleColumns(): Field[] {
    return this.columns.filter((field: Field) => field.visible === true);
  }

  // Columns without per rating types.
  get columnsWithoutPerRatingTypes(): Field[] {
    return this.columns.filter((field: Field) => !isPerRatingFieldType(field));
  }

  // Value domains for custom fields (for per-rating per-model-category charts).
  @observable valueDomainsForCustomFields: {[key: string]: string[]} = {};

  // Get the value domain for custom fields for side-by-side bar charts.
  // We display all the axis values even when their counts are zero.
  private computeValueDomainForCustomField(field: Field) {
    const groupIndices = Array.from(
      {length: this.models.length},
      (unused, i) => i,
    );

    const values = groupIndices
      .map((groupIndex: number) =>
        this.examples
          .map((ex: Example) =>
            ex.individual_rater_scores
              .map(
                (rating: IndividualRating) =>
                  (rating.custom_fields[field.id] as string[])[groupIndex],
              )
              .flat(),
          )
          .flat(),
      )
      .flat();

    if (field.domain !== undefined) {
      // If a domain list is available, use it but extend in case the domain
      // list misses some existing entries.
      this.valueDomainsForCustomFields[field.id] = mergeTwoArrays(
        field.domain,
        groupByAndSortKeys(values),
      );
    } else {
      this.valueDomainsForCustomFields[field.id] = groupByAndSortKeys(values);
    }
  }

  // Individual rater scores. Return value domain in descending order.
  @computed
  get individualRatingScoreValueDomain(): string[] {
    const scores = new Set<number>();
    this.examples.forEach((ex) => {
      ex.individual_rater_scores
        .filter((rating) => rating.score != null)
        .forEach((rating) => {
          scores.add(rating.score as number);
        });
    });
    return Array.from(scores)
      .sort((a, b) => b - a)
      .map((score) => score.toString());
  }

  // Models.
  getModelIndexFromAOrB(model: string): number {
    if (model === 'A') {
      return 0;
    } else if (model === 'B') {
      return 1;
    } else {
      throw new Error(`Unknown model: ${model}`);
    }
  }

  // Apply multiple filters to the entire examples.
  // From this.examples, we apply three operations similar to SQL:
  // filtering (WHERE), sorting (ORDER BY), then taking first-k (LIMIT).
  // This one does not include histogram bin selections, as we need the data
  // for this when bins are selected.
  @computed
  get filteredExamplesExceptChartSelections(): Example[] {
    let examples = this.examples;

    // Search filters.
    Object.entries(this.searchFilters)
      .filter(([fieldId, stringToSearch]) => stringToSearch !== '')
      .forEach(([fieldId, stringToSearch]) => {
        examples = examples.filter((ex: Example) => {
          if (fieldId === FIELD_ID_FOR_INPUT) {
            return searchText(
              extractTextFromTextOrSequenceChunks(ex.input_text),
              stringToSearch,
            );
          } else if (fieldId === FIELD_ID_FOR_OUTPUT_A) {
            return searchText(
              extractTextFromTextOrSequenceChunks(ex.output_text_a),
              stringToSearch,
            );
          } else if (fieldId === FIELD_ID_FOR_OUTPUT_B) {
            return searchText(
              extractTextFromTextOrSequenceChunks(ex.output_text_b),
              stringToSearch,
            );
          } else if (fieldId === FIELD_ID_FOR_RATIONALES) {
            return searchText(
              ex.individual_rater_scores
                .map((rating: IndividualRating) => rating.rationale)
                .join('\n'),
              stringToSearch,
            );
          } else if (fieldId === FIELD_ID_FOR_RATIONALE_LIST) {
            return searchText(
              ex.rationale_list
                .map((item: RationaleListItem) => item.rationale)
                .join('\n'),
              stringToSearch,
            );
          } else {
            return (
              ex.custom_fields[fieldId] != null &&
              searchText(ex.custom_fields[fieldId]! as string, stringToSearch)
            );
          }
        });
      });

    // If there is a selection from custom functions for return type boolean,
    // apply filters.
    Object.values(this.customFunctions)
        .filter(
            (customFunc: CustomFunction) =>
                customFunc.returnType === CustomFuncReturnType.BOOLEAN,
            )
        .forEach((customFunc: CustomFunction) => {
          const fieldId = getFieldIdForCustomFunc(customFunc.id);
          const selections =
              this.selectionsFromCustomFuncResults[customFunc.id];

          Object.values(AOrB).forEach((model: AOrB, modelIndex: number) => {
            if (selections[model] != null) {
              examples = examples.filter(
                  (ex) => (ex.custom_fields[fieldId] as
                           boolean[])[modelIndex] === selections[model],
              );
            }
          });
        });

    return examples;
  }

  private applyHistogramFilterForScores(examplesBeforeThisFilter: Example[]) {
    let examples = examplesBeforeThisFilter;
    // Filter based on histogram bin selection.
    if (this.selectedHistogramBinForScores != null) {
      examples = examples
        .filter((ex) => ex.score != null)
        .filter(
          (ex) =>
            getHistogramBinIndexFromValue(
              this.histogramSpecForScores,
              ex.score!,
            ) === this.selectedHistogramBinForScores,
        );
    }
    return examples;
  }

  // TODO: Merge with the side-by-side histograms.
  private applyHistogramFilterForCustomFuncs(
      examplesBeforeThisFilter: Example[],
      excludeId: number|null = null,
      excludeModel: string|null = null,
  ) {
    let examples = examplesBeforeThisFilter;

    // If there is a selection from custom functions for return type number,
    // apply filters.
    Object.values(this.customFunctions)
        .filter(
            (customFunc: CustomFunction) =>
                customFunc.returnType === CustomFuncReturnType.NUMBER,
            )
        .forEach((customFunc: CustomFunction) => {
          const fieldId = getFieldIdForCustomFunc(customFunc.id);
          const selections =
              this.selectionsFromCustomFuncResults[customFunc.id];
          // Apply filters when either there is no excludeId or
          // it is not for (excludeId, excludeModel).
          Object.values(AOrB)
              .filter(
                  (model: AOrB) => excludeId == null ||
                      !(excludeId === customFunc.id && excludeModel === model),
                  )
              .forEach((model: AOrB) => {
                const modelIndex = this.getModelIndexFromAOrB(model);
                if (selections[model] != null) {
                  examples =
                      examples
                          .filter(
                              (ex) => (ex.custom_fields[fieldId] as
                                       Array<number|null>)[modelIndex] != null,
                              )
                          .filter(
                              (ex) => getHistogramBinIndexFromValue(
                                          this.histogramSpecForCustomFuncs
                                              [customFunc.id],
                                          (ex.custom_fields[fieldId] as
                                           number[])[modelIndex],
                                          ) === selections[model],
                          );
                }
              });

          // For A-B.
          if (selections['A-B'] != null &&
              (excludeId == null ||
               !(excludeId === customFunc.id && excludeModel === 'A-B'))) {
            examples = examples.filter((ex) => {
              const valA = (ex.custom_fields[fieldId] as Array<number|null>)[0];
              const valB = (ex.custom_fields[fieldId] as Array<number|null>)[1];
              if (valA != null && valB != null && typeof valA === 'number' &&
                  typeof valB === 'number') {
                return (
                    getHistogramBinIndexFromValue(
                        this.histogramSpecForCustomFuncsOfDiff[customFunc.id],
                        valA - valB,
                        ) === selections['A-B']);
              } else {
                return false;
              }
            });
          }
        });

    return examples;
  }

  private applyHistogramFilterForCustomFields(
    examplesBeforeThisFilter: Example[],
    excludeField: string | null = null,
    excludeModel: string | null = null,
  ) {
    let examples = examplesBeforeThisFilter;

    // Histogram bin selections for custom fields.
    Object.keys(this.selectedHistogramBinForCustomFields).forEach((fieldId) => {
      const selections = this.selectedHistogramBinForCustomFields[fieldId];

      if (selections != null && typeof selections === 'object') {
        // Per-model cases.
        // Apply filters when either there is no excludeField or
        // it is not for (excludeField, excludeModel).
        Object.values(AOrB)
          .filter(
            (model: AOrB) =>
              excludeField == null ||
              !(excludeField === fieldId && excludeModel === model),
          )
          .forEach((model: AOrB) => {
            const modelIndex = this.getModelIndexFromAOrB(model);
            if (selections[model] != null) {
              examples = examples
                // Filtering applies when values are not null.
                .filter(
                  (ex) =>
                    (ex.custom_fields[fieldId] as Array<number | null>)[
                      modelIndex
                    ] != null,
                )
                // Check if values are within the selected histogram bins.
                .filter(
                  (ex) =>
                    getHistogramBinIndexFromValue(
                      this.histogramSpecForCustomFields[fieldId],
                      (ex.custom_fields[fieldId] as number[])[modelIndex],
                    ) === selections[model],
                );
            }
          });
      } else {
        // Non-per-model cases.
        if (selections != null && fieldId !== excludeField) {
          examples = examples
            .filter((ex) => ex.custom_fields[fieldId] != null)
            .filter(
              (ex) =>
                getHistogramBinIndexFromValue(
                  this.histogramSpecForCustomFields[fieldId],
                  ex.custom_fields[fieldId]! as number,
                ) === selections,
            );
        }
      }
    });
    return examples;
  }

  private applyBarChartFilterForCustomFields(
    examplesBeforeThisFilter: Example[],
    excludeField: string | null = null,
    excludeGroupIndex: number | null = null,
  ) {
    let examples = examplesBeforeThisFilter;

    // Bar chart selections for custom fields.
    Object.entries(this.selectedBarChartValues).forEach(
      ([fieldId, selectionsForGroups]) => {
        selectionsForGroups
          // Append groupIndex to selection info.
          .map((selectionForGroup: string | null, groupIndex: number) => [
            selectionForGroup,
            groupIndex,
          ])
          // Apply filters unless there exist non-null matched
          // excludeField and excludeGroupIndex.
          .filter(
            ([selectionForGroup, groupIndex]) =>
              selectionForGroup != null &&
              !(
                excludeField != null &&
                excludeField === fieldId &&
                excludeGroupIndex != null &&
                excludeGroupIndex === groupIndex
              ),
          )
          .forEach(([selectionForGroup, groupIndex]) => {
            examples = examples.filter((ex) => {
              // fieldValue can be either array or not (depending on
              // grouped bar charts for per-model category or not).
              const fieldValue = ex.custom_fields[fieldId] as
                | Array<string | boolean | null>
                | string
                | Array<{[key: string]: number}>
                | null;
              const value =
                fieldValue instanceof Array
                  ? fieldValue[groupIndex as number]
                  : fieldValue;
              return value instanceof Object
                ? Object.keys(value).includes(selectionForGroup as string)
                : value != null && value.toString() === selectionForGroup;
            });
          });
      },
    );

    return examples;
  }

  private applyTagFilter(examplesBeforeThisFilter: Example[]) {
    let examples = examplesBeforeThisFilter;
    // Filter based on tag selection.
    if (this.selectedTag != null) {
      examples = examples.filter((example) =>
        example.tags.includes(this.selectedTag!),
      );
    }
    return examples;
  }

  private applyRationaleClusterFilter(examplesBeforeThisFilter: Example[]) {
    let examples = examplesBeforeThisFilter;
    if (this.selectedRationaleClusterId != null) {
      examples = examples.filter((example) => {
        const clusterIds = example.rationale_list
          .map((rationale: RationaleListItem) => rationale.assignedClusterIds)
          .flat();
        return clusterIds.includes(this.selectedRationaleClusterId!);
      });
    }
    return examples;
  }

  // Get the list of examples for cases when a particular bin selection is not
  // applied. This is to render non-selected bars in histograms, which are not
  // part of this.filteredExamples.
  // e.g., If there exist two selections, bin_for_score=2 and bin_for_field_x=5,
  // the table shows filteredExamples that apply both of the filters.
  // However, for the score histogram, it will show data for bin_for_field_x=5,
  // because we want to visualize other bars (bin_for_score != 2) too with
  // opacity < 1. In this case,
  // @computed this.filteredExamples has data only for the two filters applied.
  // this.getFilteredExamplesExceptForParticularChart({histogram, score})]
  // returns data for when the bin_for_score=2 filter is not applied.
  // this.getFilteredExamplesExceptForParticularChart({histogram, x}) returns
  // data for when the bin_for_field_x=5 filter is not applied.
  getFilteredExamplesExceptForParticularChart(
    chartKey: ChartSelectionKey,
  ): Example[] {
    let examples = this.filteredExamplesExceptChartSelections;

    if (
      chartKey.chartType === ChartType.HISTOGRAM &&
      chartKey.fieldId === FIELD_ID_FOR_SCORE
    ) {
      examples = this.applyHistogramFilterForCustomFuncs(examples);
      examples = this.applyHistogramFilterForCustomFields(examples);
      examples = this.applyBarChartFilterForCustomFields(examples);
      examples = this.applyTagFilter(examples);
      examples = this.applyRationaleClusterFilter(examples);
    } else if (chartKey.chartType === ChartType.HISTOGRAM) {
      examples = this.applyHistogramFilterForScores(examples);
      examples = this.applyHistogramFilterForCustomFuncs(examples);
      examples = this.applyBarChartFilterForCustomFields(examples);
      examples = this.applyTagFilter(examples);
      examples = this.applyRationaleClusterFilter(examples);

      // Ignore a custom field histogram, e.g., {histogram,
      // custom_field:input_len}.
      examples = this.applyHistogramFilterForCustomFields(
        examples,
        chartKey.fieldId,
        chartKey.model as string | null,
      );
    } else if (chartKey.chartType === ChartType.CUSTOM_FUNCTION) {
      examples = this.applyHistogramFilterForScores(examples);
      examples = this.applyHistogramFilterForCustomFields(examples);
      examples = this.applyBarChartFilterForCustomFields(examples);
      examples = this.applyTagFilter(examples);
      examples = this.applyRationaleClusterFilter(examples);

      // Ignore a custom func histogram, e.g.,
      // {custom_function, custom_function:3, B}".
      const splitFieldId = chartKey.fieldId.split(':');
      const customFuncIdOfHistogramToIgnore =
          splitFieldId.length === 2 ? Number(splitFieldId[1]) : null;
      const modelFromCustomFuncOfHistogramToIgnore = chartKey.model as string;
      examples = this.applyHistogramFilterForCustomFuncs(
          examples,
          customFuncIdOfHistogramToIgnore,
          modelFromCustomFuncOfHistogramToIgnore,
      );
    } else if (chartKey.chartType === ChartType.BAR_CHART) {
      examples = this.applyHistogramFilterForScores(examples);
      examples = this.applyHistogramFilterForCustomFuncs(examples);
      examples = this.applyHistogramFilterForCustomFields(examples);
      examples = this.applyTagFilter(examples);
      examples = this.applyRationaleClusterFilter(examples);

      // Ignore a custom field bar chart, e.g., {bar, custom_field:topic, 0}.
      const modelIndex =
        chartKey.model == null ? 0 : (chartKey.model as number);
      examples = this.applyBarChartFilterForCustomFields(
        examples,
        chartKey.fieldId,
        modelIndex,
      );
    } else if (chartKey.chartType === ChartType.TAG) {
      examples = this.applyHistogramFilterForScores(examples);
      examples = this.applyHistogramFilterForCustomFuncs(examples);
      examples = this.applyHistogramFilterForCustomFields(examples);
      examples = this.applyBarChartFilterForCustomFields(examples);
      examples = this.applyRationaleClusterFilter(examples);
    } else if (chartKey.chartType === ChartType.RATIONALE_CLUSTER) {
      examples = this.applyHistogramFilterForScores(examples);
      examples = this.applyHistogramFilterForCustomFuncs(examples);
      examples = this.applyHistogramFilterForCustomFields(examples);
      examples = this.applyBarChartFilterForCustomFields(examples);
      examples = this.applyTagFilter(examples);
    }
    return examples;
  }

  // Filtering with histogram and bar chart bin selections too.
  @computed
  get filteredExamples(): Example[] {
    let examples = this.filteredExamplesExceptChartSelections;

    // Histograms are used for three types of cases.
    examples = this.applyHistogramFilterForScores(examples);
    examples = this.applyHistogramFilterForCustomFuncs(examples);
    examples = this.applyHistogramFilterForCustomFields(examples);

    // Bar chart selections.
    examples = this.applyBarChartFilterForCustomFields(examples);

    // Tag selections.
    examples = this.applyTagFilter(examples);

    // Rationale cluster selections.
    examples = this.applyRationaleClusterFilter(examples);

    return examples;
  }

  // Apply sorting after filtering.
  @computed
  get sortedExamples(): Example[] {
    let examples = this.filteredExamples;

    const sorting = this.currentSorting;

    if (
      sorting.column === SortColumn.NONE ||
      sorting.order === SortOrder.NONE
    ) {
      return examples;
    }

    if (sorting.column === SortColumn.SCORE) {
      // Sort by scores.
      examples = examples
        .slice()
        .sort((a, b) =>
          compareNumbersWithNulls(
            a.score,
            b.score,
            sorting.order === SortOrder.DESC,
          ),
        );
    } else if (sorting.column === SortColumn.TAGS) {
      // Sort by tags (comma-separated list).
      examples = examples
        .slice()
        .sort((a, b) =>
          sorting.order === SortOrder.DESC
            ? b.tags.join(',').localeCompare(a.tags.join(','))
            : a.tags.join(',').localeCompare(b.tags.join(',')),
        );
    } else if (
      sorting.column === SortColumn.FUNC_A ||
      sorting.column === SortColumn.FUNC_B
    ) {
      // If there is a selection from custom functions for return type number,
      // apply sorting by desc order.
      const selectedCustomFunc = this.selectedCustomFunc;
      const modelIndex = sorting.column === SortColumn.FUNC_A ? 0 : 1;
      if (selectedCustomFunc != null &&
          selectedCustomFunc.returnType === CustomFuncReturnType.NUMBER) {
        const fieldId = getFieldIdForCustomFunc(selectedCustomFunc.id);
        examples = examples
          .slice()
          .sort((ex0, ex1) =>
            sorting.order === SortOrder.DESC
              ? (ex1.custom_fields[fieldId] as number[])[modelIndex] -
                (ex0.custom_fields[fieldId] as number[])[modelIndex]
              : (ex0.custom_fields[fieldId] as number[])[modelIndex] -
                (ex1.custom_fields[fieldId] as number[])[modelIndex],
          );
      }
    } else if (
      sorting.column === SortColumn.CUSTOM_ATTRIBUTE &&
      sorting.customField != null
    ) {
      // Sort by one of the custom fields.
      const fieldId = sorting.customField.id;
      const fieldType = this.columns.filter((field) => field.id === fieldId)[0]
        .type;

      if (fieldType === 'per_model_number' && sorting.modelIndex != null) {
        const getValueForPerModelNumber = (ex: Example) =>
          (ex.custom_fields[fieldId] as Array<number | null>)[
            sorting.modelIndex!
          ];
        examples = examples
          .slice()
          .sort((a, b) =>
            compareNumbersWithNulls(
              getValueForPerModelNumber(a),
              getValueForPerModelNumber(b),
              sorting.order === SortOrder.DESC,
            ),
          );
      } else if (
        (fieldType === 'per_model_boolean' ||
          fieldType === 'per_model_category') &&
        sorting.modelIndex != null
      ) {
        const castToString = (value: boolean | string | null) =>
          typeof value === 'boolean' ? String(value) : value;
        const getValueForPerModelString = (ex: Example) =>
          (ex.custom_fields[fieldId] as Array<boolean | string | null>).map(
            (value: boolean | string | null) => castToString(value),
          )[sorting.modelIndex!];
        examples = examples
          .slice()
          .sort((a, b) =>
            sorting.order === SortOrder.DESC
              ? compareStringsWithNulls(
                  getValueForPerModelString(b),
                  getValueForPerModelString(a),
                )
              : compareStringsWithNulls(
                  getValueForPerModelString(a),
                  getValueForPerModelString(b),
                ),
          );
      } else if (fieldType === 'number') {
        const getValueForNumber = (ex: Example) =>
          ex.custom_fields[fieldId] as number | null;
        examples = examples
          .slice()
          .sort((a, b) =>
            compareNumbersWithNulls(
              getValueForNumber(a),
              getValueForNumber(b),
              sorting.order === SortOrder.DESC,
            ),
          );
      } else {
        const getValueForString = (ex: Example) =>
          ex.custom_fields[fieldId] as string | null;
        examples = examples
          .slice()
          .sort((a, b) =>
            sorting.order === SortOrder.DESC
              ? compareStringsWithNulls(
                  getValueForString(b),
                  getValueForString(a),
                )
              : compareStringsWithNulls(
                  getValueForString(a),
                  getValueForString(b),
                ),
          );
      }
    } else if (sorting.column === SortColumn.RATIONALE_CLUSTER) {
      // Sort by rationale cluster similarity.
      // If there are multiple assignments, take the highest similarity values.
      const maxSimilarityValueFromRationaleListItems = (
          rationaleListItems: RationaleListItem[],
          ) =>
          Math.max(
              ...rationaleListItems
                  // Find items whose assigned clusters match the selected
                  // cluster.
                  .filter(
                      (rationaleItem: RationaleListItem) =>
                          (rationaleItem.assignedClusterIds || [])
                              .includes(
                                  this.selectedRationaleClusterId!,
                                  ),
                      )
                  // Get the similarity values for these assignments.
                  .map(
                      (rationaleItem: RationaleListItem) =>
                          rationaleItem
                              .similarities[this.selectedRationaleClusterId!],
                      ),
          );

      examples = examples
        .slice()
        .sort(
          (a, b) =>
            maxSimilarityValueFromRationaleListItems(b.rationale_list) -
            maxSimilarityValueFromRationaleListItems(a.rationale_list),
        );
    }

    return examples;
  }

  // Return the first-k examples (like LIMIT in SQL).
  @computed
  get examplesForMainTable() {
    return this.sortedExamples.slice(0, this.numExamplesToDisplay);
  }

  // Reset state variables.
  resetVariables() {
    // Settings.
    this.isShowTextDiff = true;

    // Selections.
    this.selectedExample = null;
    this.selectedTag = null;
    this.selectedCustomFuncId = null;

    this.isExampleExpanded = {};

    // TODO Merge selection variables.
    this.selectedHistogramBinForScores = null;
    this.selectedHistogramBinForCustomFields = {};
    this.selectedBarChartValues = {};
    this.selectionsFromCustomFuncResults = {};
    this.selectedRationaleClusterId = null;

    // Reset search filters.
    this.searchFilters = {};
    this.searchFilterInputs = {};
    // Initialize search filters.
    [
      FIELD_ID_FOR_INPUT,
      FIELD_ID_FOR_OUTPUT_A,
      FIELD_ID_FOR_OUTPUT_B,
      FIELD_ID_FOR_RATIONALES,
      FIELD_ID_FOR_RATIONALE_LIST,
    ].forEach((fieldId) => void this.resetSearchFilter(fieldId));

    this.currentSorting = DEFAULT_SORTING_CRITERIA;

    this.numExamplesToDisplay = DEFAULT_NUM_EXAMPLES_TO_DISPLAY;

    this.columns = DEFAULT_COLUMN_LIST;

    this.customFunctions = {};

    this.histogramSpecForCustomFuncs = {};
    this.histogramSpecForCustomFuncsOfDiff = {};
    this.histogramSpecForCustomFields = {};

    this.winRateThreshold = DEFAULT_WIN_RATE_THRESHOLD;

    this.hasRationaleClusters = false;
  }

  override initialize() {
    // Get url parameters.
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params: {[key: string]: string} = {};
    for (const [key, value] of urlSearchParams) {
      params[key] = decodeURIComponent(value);
    }

    // Get path parameters from url.
    if (params.hasOwnProperty('results_path')) {
      const datasetPath = params['results_path'];
      // Get max examples parameter from url.
      const maxExamplesToLoad = params.hasOwnProperty('max_examples')
        ? Number(params['max_examples'])
        : null;
      // Get sampling step size parameter from url.
      const samplingStepSize = params.hasOwnProperty('sampling_step_size')
        ? Number(params['sampling_step_size'])
        : null;
      // Get column visibility parameter from url.
      const columnsToHide = params.hasOwnProperty('hide_columns')
        ? params['hide_columns'].split(',')
        : [];
      this.loadData(
        datasetPath,
        null,
        maxExamplesToLoad,
        samplingStepSize,
        columnsToHide,
      );
    }
  }

  // Update the sorting option.
  updateSorting(sorting: SortCriteria) {
    this.currentSorting = sorting;
  }

  // Reset the sorting option.
  resetSorting() {
    this.currentSorting = DEFAULT_SORTING_CRITERIA;
  }

  // Update the status message.
  updateStatusMessage(message: string, hasTimeout = false) {
    this.statusMessage = message;
    this.isOpenStatusMessage = true;
    // Reset timeout.
    if (this.statusMessageTimeout != null) {
      clearTimeout(this.statusMessageTimeout);
    }

    // Set timeout.
    if (hasTimeout === true) {
      this.statusMessageTimeout = setTimeout(
        () => (this.isOpenStatusMessage = false),
        5000,
      );
    }
  }

  @computed
  get appLink() {
    return `https://pair-code.github.io/llm-comparator/`;
  }

  private determineHistogramSpecForScores() {
    let minValue = 0.0;
    let maxValue = 0.0;
    const individualRaterScores = this.examples.flatMap((ex) =>
      ex.individual_rater_scores.map((rating) => rating.score),
    );
    if (individualRaterScores.length > 0) {
      const minAndMaxFromIndividualScores = getMinAndMax(individualRaterScores);
      minValue = minAndMaxFromIndividualScores.minValue;
      maxValue = minAndMaxFromIndividualScores.maxValue;
    } else {
      const minAndMax = getMinAndMax(this.examples.map((ex) => ex.score));
      minValue = minAndMax.minValue;
      maxValue = minAndMax.maxValue;
    }

    if (minValue === 1.0 && maxValue === 5.0) {
      // Special case when the rating scheme is between 1.0 and 5.0.
      this.histogramSpecForScores = FIVE_POINT_LIKERT_HISTOGRAM_SPEC;
    } else if (minValue >= 1.0) {
      // Unknown scheme. If min > 1.0, it is highly unlikely that it uses
      // the default diverging scheme of the range between -3.0 to 3.0.
      this.histogramSpecForScores = {
        rangeLeft: minValue,
        rangeRight: maxValue,
        numberOfBins: 7,
        isBounded: true,
        isDivergingScheme: false,
      };
    } else {
      this.histogramSpecForScores = DEFAULT_HISTOGRAM_SPEC;
    }
    // TODO: Support custom higher ranges (e.g., 5.0 to -5.0).
  }

  // Add histogram spec for custom functions with return type number.
  // TODO: Merge with the side-by-side histograms.
  private addHistogramSpecForCustomFunc(customFunc: CustomFunction) {
    if (customFunc.returnType === CustomFuncReturnType.NUMBER) {
      const fieldId = getFieldIdForCustomFunc(customFunc.id);

      // For A and B individually.
      const minAndMaxValues = getMinAndMax([
        ...this.examples.map(
          (ex) => (ex.custom_fields[fieldId] as Array<number | null>)[0],
        ),
        ...this.examples.map(
          (ex) => (ex.custom_fields[fieldId] as Array<number | null>)[1],
        ),
      ] as Array<number | null>);
      const rangeLeft = minAndMaxValues.minValue;
      const verySmallValue = 1e-8;
      const rangeRight =
        minAndMaxValues.maxValue === rangeLeft
          ? minAndMaxValues.maxValue + verySmallValue
          : minAndMaxValues.maxValue;

      this.histogramSpecForCustomFuncs[customFunc.id] = {
        rangeLeft,
        rangeRight,
        numberOfBins: 6,
        isBounded: true,
        isDivergingScheme: false,
      };

      // For diff between A and B.
      const minAndMaxDiff = getMinAndMax(
        this.examples
          .filter(
            (ex) =>
              (ex.custom_fields[fieldId] as Array<number | null>)[0] != null &&
              (ex.custom_fields[fieldId] as Array<number | null>)[1] != null,
          )
          .map(
            (ex) =>
              (ex.custom_fields[fieldId] as number[])[0] -
              (ex.custom_fields[fieldId] as number[])[1],
          ),
      );

      const absoluteMax = Math.max(
        Math.abs(minAndMaxDiff.minValue),
        Math.abs(minAndMaxDiff.maxValue),
      );
      const rangeEnd = absoluteMax === 0 ? 1.0 : absoluteMax;

      this.histogramSpecForCustomFuncsOfDiff[customFunc.id] = {
        rangeLeft: -rangeEnd,
        rangeRight: rangeEnd,
        numberOfBins: 7,
        isBounded: true,
        isDivergingScheme: true,
      };
    }
  }

  // Add histogram spec for custom functions for custom fields.
  private addHistogramSpecForCustomFields(field: Field) {
    if (field.type === FieldType.NUMBER) {
      const {minValue, maxValue} = getMinAndMax(
        this.examples.map((ex) =>
          convertToNumber(ex.custom_fields[field.id] as number | null),
        ),
      );
      this.histogramSpecForCustomFields[field.id] = {
        rangeLeft: minValue,
        rangeRight: maxValue,
        numberOfBins: 6,
        isBounded: true,
        isDivergingScheme: false,
      };
      this.selectedHistogramBinForCustomFields[field.id] = null;
    } else if (field.type === FieldType.PER_MODEL_NUMBER) {
      // Get min and max across both models.
      const minAndMaxValues = getMinAndMax([
        ...this.examples.map(
          (ex) => (ex.custom_fields[field.id] as Array<number | null>)[0],
        ),
        ...this.examples.map(
          (ex) => (ex.custom_fields[field.id] as Array<number | null>)[1],
        ),
      ] as Array<number | null>);

      const rangeLeft = minAndMaxValues.minValue;
      // Add a very small value to avoid the range size of 0.
      const verySmallValue = 1e-8;
      const rangeRight =
        minAndMaxValues.maxValue === rangeLeft
          ? minAndMaxValues.maxValue + verySmallValue
          : minAndMaxValues.maxValue;

      this.histogramSpecForCustomFields[field.id] = {
        rangeLeft,
        rangeRight,
        numberOfBins: 6,
        isBounded: true,
        isDivergingScheme: false,
      };
      // Initialize selections.
      this.selectedHistogramBinForCustomFields[field.id] = {
        'A': null,
        'B': null,
      };
    }
  }

  // Read an uploaded json file.
  private readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result.toString());
        } else {
          reject(new Error('Failed to read file content.'));
        }
      };
      reader.readAsText(file);
    });
  }

  // Load data either from a specified path or uploaded file.
  async loadData(
    datasetPath: string,
    fileObject: File | null = null,
    maxNumExamplesToDisplay: number | null = null,
    samplingStepSize: number | null = null,
    columnsToHide: string[] = [],
  ) {
    this.isOpenDatasetSelectionPanel = false;
    this.updateStatusMessage('Loading the dataset... Please wait...');

    let dataResponse: DataResponse;
    if (fileObject != null) {
      try {
        // Load data from the uploaded file.
        const fileContent = await this.readFileContent(fileObject);
        // TODO: Validate the format of the uploaded file.
        const jsonResponse = JSON.parse(fileContent);
        dataResponse = jsonResponse as DataResponse;
      } catch (error) {
        console.error(error);
        this.updateStatusMessage(
          `Encountered an error while loading file "${datasetPath}": ${error}`,
        );
        this.isOpenDatasetSelectionPanel = true;
        return;
      }
    } else {
      try {
        let response: Response = new Response();
        if (datasetPath.startsWith('http')) {
          response = await fetch(datasetPath, {
            headers: {'Accept': 'application/json'},
          });
        } else {
          const errorMessage =
              'Unsupported data loading method. Please provide a web URL ' +
              'or use the file uploader.';
          throw new Error(errorMessage);
        }
        if (response.status === 502) {
          // TODO: Use a corp domain url.
          const errorMessage =
              'Failed to load the dataset. The server may not exist anymore, ' +
              'possibly with updated URLs. Try opening this URL ' +
              `(${this.appLink}), rather than refreshing the page.`;
          throw new Error(errorMessage);
        }

        const jsonResponse: DataResponse|ErrorResponse = await response.json();

        if (jsonResponse.hasOwnProperty('error')) {
          throw new Error((jsonResponse as ErrorResponse).error);
        }
        dataResponse = jsonResponse as DataResponse;
      } catch (error) {
        console.error(error);
        this.updateStatusMessage(
            `Encountered an error while loading "${datasetPath}": ${error}`,
        );
        this.isOpenDatasetSelectionPanel = true;
        return;
      }
    }

    this.datasetPath = datasetPath;
    this.isDatasetPathUploadedFile = fileObject != null;
    this.metadata = dataResponse.metadata;
    this.models = dataResponse.models;
    this.examples = dataResponse.examples.map(
      (example: Example, index: number) => {
        // Assign indices to examples.
        example.index = index;

        // TODO: Check if all the required fields exist.

        // Assign indices to individual ratings.
        example.individual_rater_scores.forEach(
          (rating: IndividualRating, ratingIndex: number) => {
            rating.index = ratingIndex;
          },
        );

        return example;
      },
    );

    // Reset state variables.
    this.resetVariables();

    // Load rationale clusters.
    if (dataResponse.rationale_clusters) {
      // The first item is "others". And append the rest from dataResponse.
      this.rationaleClusters = [
        {
          id: -1,
          title: '(others)',
          aWinCount: 0,
          bWinCount: 0,
        },
        ...dataResponse.rationale_clusters.map(
            (cluster, clusterIndex: number) => {
              return {
                id: clusterIndex,
                title: cluster.title,
                aWinCount: 0,
                bWinCount: 0,
              };
            },
            ),
      ];
      this.hasRationaleClusters = this.rationaleClusters.length > 1;
      if (this.hasRationaleClusters === true) {
        // Set the rationale list field visible.
        this.columns.filter(
          (field: Field) => field.id === FIELD_ID_FOR_RATIONALE_LIST,
        )[0].visible = true;

        this.reassignClusters();
      }
    }

    // Determine the range of the score field.
    this.determineHistogramSpecForScores();

    // Load custom fields.
    const fieldTypes = Object.values(FieldType);
    this.metadata.custom_fields_schema.forEach(
      (loadedField: CustomFieldSchema) => {
        if (!fieldTypes.includes(loadedField.type)) {
          this.updateStatusMessage(
            `${
              loadedField.name
            } is not a valid field type. It should be one of [${fieldTypes.join(
              ', ',
            )}].`,
          );
        }

        const fieldId = `custom_field:${loadedField.name}`;
        const field: Field = {
          id: fieldId,
          name: loadedField.name,
          type: loadedField.type,
          visible:
            !columnsToHide.includes(loadedField.name) &&
            !this.customFieldsOfPerRatingTypesWithNoAggregationSupport().includes(
              loadedField.type,
            ),
          domain: loadedField.domain || undefined,
        };
        this.columns.push(field);
      },
    );

    // Preprocess non-per-rating custom fields.
    this.customFieldsWithoutPerRatingType.forEach((field: Field) => {
      // Add prefix to custom fields.
      this.examples.forEach((ex: Example) => {
        const value = ex.custom_fields[field.name];
        ex.custom_fields[field.id] = value;
        delete ex.custom_fields[field.name];
      });

      // Set up charts.
      this.addHistogramSpecForCustomFields(field);
      if (field.type === FieldType.CATEGORY) {
        this.selectedBarChartValues[field.id] = [null];
      } else if (
        field.type === FieldType.PER_MODEL_CATEGORY ||
        field.type === FieldType.PER_MODEL_BOOLEAN
      ) {
        this.selectedBarChartValues[field.id] = [null, null];
      }

      // Prepare for search.
      if (field.type === FieldType.TEXT) {
        this.resetSearchFilter(field.id);
      }
    });

    // Preprocess per-rating custom fields.
    this.customFieldsOfPerRatingType.forEach((ratingField: Field) => {
      // Change the key from field name to field id.
      this.examples.forEach((ex: Example) => {
        // TODO: Support more per-rating types.
        if (ratingField.type === FieldType.PER_RATING_STRING) {
          ex.individual_rater_scores.forEach((rating: IndividualRating) => {
            // Change the key from field name to field id.
            const value = rating.custom_fields[ratingField.name];
            rating.custom_fields[ratingField.id] = value;
            delete rating.custom_fields[ratingField.name];
          });
        } else if (
          ratingField.type === FieldType.PER_RATING_PER_MODEL_CATEGORY
        ) {
          ex.individual_rater_scores.forEach((rating: IndividualRating) => {
            // Change the key from field name to field id.
            const value = rating.custom_fields[ratingField.name] || [
              null,
              null,
            ];
            rating.custom_fields[ratingField.id] = value;
            delete rating.custom_fields[ratingField.name];
          });
        }
      });

      // Perform group-by aggregations over ratings.
      this.examples.forEach((ex: Example) => {
        // TODO: Support more per-rating types.
        if (ratingField.type === FieldType.PER_RATING_STRING) {
          // Simply concatenate strings.
          ex.custom_fields[ratingField.id] = ex.individual_rater_scores
            .map(
              (rating: IndividualRating) =>
                rating.custom_fields[ratingField.id] as string,
            )
            .join('\n');
        } else if (
          ratingField.type === FieldType.PER_RATING_PER_MODEL_CATEGORY
        ) {
          // Perform group-by counts.
          ex.custom_fields[ratingField.id] = this.models.map(
            (unused, modelIndex: number) => {
              // Values across ratings
              const valuesAcrossRatings = ex.individual_rater_scores.map(
                (rating: IndividualRating) =>
                  (rating.custom_fields[ratingField.id] as string[])[
                    modelIndex
                  ],
              );
              return groupByValues(valuesAcrossRatings);
            },
          );
        }
      });

      // Set up charts.
      if (ratingField.type === FieldType.PER_RATING_PER_MODEL_CATEGORY) {
        // Extract value domains in sorted order.
        this.computeValueDomainForCustomField(ratingField);

        // Reset selections.
        this.selectedBarChartValues[ratingField.id] = [null, null];
      }
    });

    // If there is at least one custom field, open the settings panel.
    if (
      this.columns.filter((field) => field.type !== FieldType.BASE).length > 0
    ) {
      this.isOpenSettingsPanel = true;
    }

    // If responses are multimodal, disable match highlighting.
    for (let i = 0; i < this.examples.length; i++) {
      const ex = this.examples[i];
      if (
        typeof ex.output_text_a !== 'string' ||
        typeof ex.output_text_b !== 'string'
      ) {
        this.isShowTextDiff = false;
        break;
      }
    }

    // Apply default custom functions.
    INITIAL_CUSTOM_FUNCTIONS.forEach((customFunc: CustomFunction) => {
      const newId = this.newCustomFuncId;
      customFunc.id = newId;
      this.customFunctions[newId] = customFunc;
      this.selectionsFromCustomFuncResults[newId] =
          initializeCustomFuncSelections();

      // TODO: Move to api service
      this.runCustomFunction(this.examples, customFunc);
    });

    const statusMessage =
        `Loaded the dataset of ${this.examples.length} examples.`;
    this.updateStatusMessage(statusMessage, true);

    // Update URL.
    // TODO: Create a URL service to keep URL and app in sync.
    const url = new URL(window.location.href);
    if (this.isDatasetPathUploadedFile === false) {
      url.searchParams.set('results_path', this.datasetPath);
      if (columnsToHide.length > 0) {
        url.searchParams.set('hide_columns', columnsToHide.join(','));
      } else {
        if (url.searchParams.has('hide_columns')) {
          url.searchParams.delete('hide_columns');
        }
      }
      if (maxNumExamplesToDisplay != null) {
        url.searchParams.set(
          'max_examples',
          maxNumExamplesToDisplay.toString(),
        );
      } else {
        if (url.searchParams.has('max_examples')) {
          url.searchParams.delete('max_examples');
        }
      }
    } else {
      url.searchParams.delete('results_path');
    }
    window.history.pushState({}, '', url.toString());
  }

  // Run a custom function over all examples.
  runCustomFunction(examples: Example[], customFunc: CustomFunction) {
    try {
      const results: {
        [key in AOrB]: {[key: string]: boolean | number | null};
      } = {'A': {}, 'B': {}};

      examples.forEach((example: Example, index: number) => {
        Object.values(AOrB).forEach((model: AOrB) => {
          const output =
            model === AOrB.A ? example.output_text_a : example.output_text_b;
          const result = this.customFunctionService.executeCustomFunction(
              extractTextFromTextOrSequenceChunks(output),
              example,
              customFunc,
          );

          if (index === 0 && result === undefined) {
            // Check if it does not produce an error for the first example.
            // It is likely because of errors in JS/Reg expressions.
            throw new Error(
              'Encountered an error while executing the function. See console for details.',
            );
          } else if (result === undefined) {
            // In case we get errors only for some examples.
            results[model][example.index] = null;
          } else {
            results[model][example.index] = result;
          }
        });
      });

      const fieldId = getFieldIdForCustomFunc(customFunc.id);
      examples.forEach((example: Example) => {
        example.custom_fields[fieldId] = [
          results[AOrB.A][example.index],
          results[AOrB.B][example.index],
        ] as Array<boolean | null> | Array<number | null>;
      });

      // Add to the list.
      this.customFunctions[customFunc.id] = customFunc;
      this.selectionsFromCustomFuncResults[customFunc.id] =
          initializeCustomFuncSelections();

      // Add histogram spec.
      this.addHistogramSpecForCustomFunc(customFunc);

      // Close the editor.
      this.isShowCustomFuncEditor = false;

      // Add to custom fields or replace with the existing one.
      const fieldType = customFunc.returnType === CustomFuncReturnType.BOOLEAN ?
          FieldType.PER_MODEL_BOOLEAN :
          customFunc.returnType === CustomFuncReturnType.NUMBER ?
          FieldType.PER_MODEL_NUMBER :
          FieldType.PER_MODEL_CATEGORY;
      const existingField = this.columns.filter(
        (field: Field) => field.id === fieldId,
      );
      if (existingField.length > 0) {
        existingField[0].name = customFunc.name;
        existingField[0].type = fieldType;
      } else {
        this.columns.push({
          id: fieldId,
          name: customFunc.name,
          type: fieldType,
          visible: false,
        });
      }

      this.updateStatusMessage(
        'Completed executing the function over examples.',
        true,
      );
    } catch (error) {
      console.error(error);
      this.updateStatusMessage(error as string, false);
    }
  }

  // Remove a rationale cluster row.
  removeCluster(clusterId: number) {
    if (clusterId === this.selectedRationaleClusterId) {
      this.selectedRationaleClusterId = null;
    }

    this.rationaleClusters = this.rationaleClusters.filter(
      (cluster: RationaleCluster) => cluster.id !== clusterId,
    );
    this.reassignClusters();
  }

  // Check if the similarity between a rationale phrase (each bullet item)
  // and a cluster title is above the threshold.
  reassignClusters() {
    this.examples.forEach((example: Example) => {
      example.rationale_list.forEach((rationaleItem: RationaleListItem) => {
        // Assign if the value is above the threshold.
        rationaleItem.assignedClusterIds =
            this.rationaleClusters
                .map((cluster: RationaleCluster) => cluster.id)
                .filter(
                    (clusterId: number) => clusterId >= 0 &&
                        rationaleItem.similarities[clusterId] >=
                            this.rationaleClusterSimilarityThreshold,
                );
        // If no cluster is assigned, assign misc.
        if (rationaleItem.assignedClusterIds.length === 0) {
          rationaleItem.assignedClusterIds = [-1];
        }
      });
    });
  }
}
