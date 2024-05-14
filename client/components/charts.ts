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
import './bar_chart';
import './histogram';

import {MobxLitElement} from '@adobe/lit-mobx';
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {core} from '../core';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import {
  AOrB,
  ChartSelectionKey,
  ChartType,
  Example,
  Field,
  FieldType,
  IndividualRating,
} from '../lib/types';
import {groupByAndSortKeys, mergeTwoArrays} from '../lib/utils';
import {AppState} from '../services/state_service';

// import {styles} from './score_histogram.css';

/**
 * Component for visualizing Autorater scores.
 */
@customElement('comparator-charts')
export class ChartsElement extends MobxLitElement {
  private readonly appState = core.getService(AppState);

  static override styles = sharedStyles;

  readonly svgWidth = 220;
  readonly svgHeight = 110;

  renderCustomFieldHistogram(field: Field) {
    const chartSelectionKey: ChartSelectionKey = {
      chartType: ChartType.HISTOGRAM,
      fieldId: field.id,
      model: null,
    };
    const getHistogramRawDataValues = () =>
      this.appState
        .getFilteredExamplesExceptForParticularChart(chartSelectionKey)
        .filter((ex: Example) => ex.custom_fields[field.id] != null)
        .map((ex: Example) => ex.custom_fields[field.id]! as number);

    const handleClickHistogramBar = (binIndex: number) => {
      if (
        this.appState.selectedHistogramBinForCustomFields[field.id] === binIndex
      ) {
        this.appState.selectedHistogramBinForCustomFields[field.id] = null;
      } else {
        this.appState.selectedHistogramBinForCustomFields[field.id] = binIndex;
      }
    };

    const isAnyBinSelected = () =>
      this.appState.selectedHistogramBinForCustomFields[field.id] !== null;
    const isThisBinSelected = (binIndex: number) =>
      binIndex === this.appState.selectedHistogramBinForCustomFields[field.id];

    // prettier-ignore
    return html`
        <comparator-histogram
          .getHistogramSpec=${
              () => this.appState.histogramSpecForCustomFields[field.id]}
          .getRawDataValues=${getHistogramRawDataValues}
          .handleClickHistogramBar=${handleClickHistogramBar}
          .isAnyBinSelected=${isAnyBinSelected}
          .isThisBinSelected=${isThisBinSelected}
          .svgHeight=${60}>
        </comparator-histogram>`;
  }

  renderCustomFieldSideBySideHistogram(field: Field) {
    // Histogram spec.
    const getHistogramSpec = () =>
      this.appState.histogramSpecForCustomFields[field.id];

    // Data.
    const chartSelectionKey = (model: string) =>
      ({
        chartType: ChartType.HISTOGRAM,
        fieldId: field.id,
        model,
      }) as ChartSelectionKey;

    const getHistogramDataForA = () =>
      this.appState
        .getFilteredExamplesExceptForParticularChart(chartSelectionKey('A'))
        .filter(
          (ex: Example) =>
            (ex.custom_fields[field.id] as Array<number | null>)[0] != null,
        )
        .map((ex: Example) => (ex.custom_fields[field.id] as number[])[0]);
    const getHistogramDataForB = () =>
      this.appState
        .getFilteredExamplesExceptForParticularChart(chartSelectionKey('B'))
        .filter(
          (ex: Example) =>
            (ex.custom_fields[field.id] as Array<number | null>)[1] != null,
        )
        .map((ex: Example) => (ex.custom_fields[field.id] as number[])[1]);

    // Click selections.
    const handleClickHistogramBar = (binIndex: number, model: AOrB) => {
      if (
        (
          this.appState.selectedHistogramBinForCustomFields[field.id] as {
            [key: string]: number | null;
          }
        )[model] === binIndex
      ) {
        (
          this.appState.selectedHistogramBinForCustomFields[field.id] as {
            [key: string]: number | null;
          }
        )[model] = null;
      } else {
        (
          this.appState.selectedHistogramBinForCustomFields[field.id] as {
            [key: string]: number | null;
          }
        )[model] = binIndex;
      }
    };

    const handleClickHistogramBarForA = (binIndex: number) =>
      void handleClickHistogramBar(binIndex, AOrB.A);
    const handleClickHistogramBarForB = (binIndex: number) =>
      void handleClickHistogramBar(binIndex, AOrB.B);

    // Check if any of the histogram bars or this bar is selected.
    const selections = this.appState.selectedHistogramBinForCustomFields[
      field.id
    ] as {[key: string]: number | null};
    const isAnyBinSelectedForA = () => selections['A'] != null;
    const isAnyBinSelectedForB = () => selections['B'] != null;
    const isThisBinSelectedForA = (binIndex: number) =>
      selections['A'] === binIndex;
    const isThisBinSelectedForB = (binIndex: number) =>
      selections['B'] === binIndex;

    if (getHistogramSpec() !== undefined) {
      return html` <comparator-histogram
          .getHistogramSpec=${getHistogramSpec}
          .getRawDataValues=${getHistogramDataForA}
          .handleClickHistogramBar=${handleClickHistogramBarForA}
          .isAnyBinSelected=${isAnyBinSelectedForA}
          .isThisBinSelected=${isThisBinSelectedForA}
          .specificColorScheme=${'A'}
          .svgWidth=${this.svgWidth}
          .svgHeight=${this.svgHeight * 0.5}
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
          .svgHeight=${this.svgHeight * 0.5}
          .showBottomAxis=${true}
          .titleOnLeft=${'B'}>
        </comparator-histogram>`;
    } else {
      return html``;
    }
  }

  renderCustomFieldBarChart(field: Field) {
    // Ordered list of axis values (i.e., categories).
    const getValueDomain = () => {
      const values = this.appState.examples
        .filter((ex: Example) => ex.custom_fields[field.id] != null)
        .map((ex: Example) => ex.custom_fields[field.id] as string);

      if (field.domain !== undefined) {
        // If a domain list is available, use it but extend in case the domain
        // list misses some existing entries.
        return mergeTwoArrays(field.domain, groupByAndSortKeys(values));
      } else {
        return groupByAndSortKeys(values);
      }
    };

    // List of values with duplicates
    // (aggregation will be performed in the bar chart element).
    const chartSelectionKey: ChartSelectionKey = {
      chartType: ChartType.BAR_CHART,
      fieldId: field.id,
      model: null,
    };
    const getBarChartData = () =>
      this.appState
        .getFilteredExamplesExceptForParticularChart(chartSelectionKey)
        .filter((ex: Example) => ex.custom_fields[field.id] != null)
        .map((ex: Example) => ex.custom_fields[field.id]! as string);

    const handleClickBar = (value: string) => {
      if (this.appState.selectedBarChartValues[field.id][0] === value) {
        this.appState.selectedBarChartValues[field.id][0] = null;
      } else {
        this.appState.selectedBarChartValues[field.id][0] = value;
      }
    };
    const isAnyBarSelected = () =>
      this.appState.selectedBarChartValues[field.id][0] !== null;
    const isThisBarSelected = (value: string) =>
      this.appState.selectedBarChartValues[field.id][0] === value;

    // prettier-ignore
    return html`
        <comparator-bar-chart
            .getValueDomain=${getValueDomain}
            .getDataValues=${getBarChartData}
            .handleClickBar=${handleClickBar}
            .isAnyBarSelected=${isAnyBarSelected}
            .isThisBarSelected=${isThisBarSelected}>
        </comparator-bar-chart>`;
  }

  renderCustomFieldSideBySideBarChart(field: Field) {
    const groupCount = this.appState.models.length;
    const groupIndices = Array.from({length: groupCount}, (unused, i) => i);

    const getValueDomain = () => {
      const getValue = (ex: Example) =>
        ex.custom_fields[field.id] as Array<string | boolean | null>;
      const values = groupIndices.flatMap((groupIndex: number) =>
        this.appState.examples
          .filter((ex: Example) => getValue(ex)[groupIndex] != null)
          // If boolean, convert to string.
          .map((ex: Example) => getValue(ex)[groupIndex]!.toString()),
      );

      if (field.domain !== undefined) {
        // If a domain list is available, use it but extend in case the domain
        // list misses some existing entries.
        return mergeTwoArrays(field.domain, groupByAndSortKeys(values));
      } else {
        return groupByAndSortKeys(values);
      }
    };

    const chartSelectionKey = (groupIndex: number) =>
      ({
        chartType: ChartType.BAR_CHART,
        fieldId: field.id,
        model: groupIndex,
      }) as ChartSelectionKey;

    const getBarChartData = () => {
      const getValue = (ex: Example) =>
        ex.custom_fields[field.id] as Array<string | boolean | null>;
      return groupIndices.map((groupIndex: number) =>
        this.appState
          .getFilteredExamplesExceptForParticularChart(
            chartSelectionKey(groupIndex),
          )
          .filter((ex: Example) => getValue(ex)[groupIndex] != null)
          // If boolean, convert to string.
          .map((ex: Example) => getValue(ex)[groupIndex]!.toString()),
      );
    };

    const handleClickBar = (value: string, groupIndex: number | undefined) => {
      if (
        this.appState.selectedBarChartValues[field.id][groupIndex!] === value
      ) {
        this.appState.selectedBarChartValues[field.id][groupIndex!] = null;
      } else {
        this.appState.selectedBarChartValues[field.id][groupIndex!] = value;
      }
    };
    const isAnyBarSelected = (groupIndex: number | undefined) =>
      this.appState.selectedBarChartValues[field.id][groupIndex!] !== null;
    const isThisBarSelected = (value: string, groupIndex: number | undefined) =>
      this.appState.selectedBarChartValues[field.id][groupIndex!] === value;

    return html` <comparator-bar-chart
      .getValueDomain=${getValueDomain}
      .getGroupedDataValues=${getBarChartData}
      .groupCount=${groupCount}
      .handleClickBar=${handleClickBar}
      .isAnyBarSelected=${isAnyBarSelected}
      .isThisBarSelected=${isThisBarSelected}>
    </comparator-bar-chart>`;
  }

  // Side-by-side bar charts for per-rating-per-model type.
  renderCustomFieldPerRatingSideBySideBarChart(field: Field) {
    const groupCount = this.appState.models.length;
    const groupIndices = Array.from({length: groupCount}, (unused, i) => i);

    // Precomputed when loading data.
    const getValueDomain = () => {
      return this.appState.valueDomainsForCustomFields[field.id];
    };

    const chartSelectionKey = (groupIndex: number) =>
      ({
        chartType: ChartType.BAR_CHART,
        fieldId: field.id,
        model: groupIndex,
      }) as ChartSelectionKey;

    const getBarChartNestedData = () => {
      return groupIndices.map((groupIndex: number) =>
        this.appState
          .getFilteredExamplesExceptForParticularChart(
            chartSelectionKey(groupIndex),
          )
          .map((ex: Example) => {
            // All the individual values from ratings are passed.
            return ex.individual_rater_scores.map(
              (rating: IndividualRating) =>
                (rating.custom_fields[field.id] as string[])[groupIndex],
            );
          }),
      );
    };

    const handleClickBar = (value: string, groupIndex: number | undefined) => {
      if (
        this.appState.selectedBarChartValues[field.id][groupIndex!] === value
      ) {
        this.appState.selectedBarChartValues[field.id][groupIndex!] = null;
      } else {
        this.appState.selectedBarChartValues[field.id][groupIndex!] = value;
      }
    };
    const isAnyBarSelected = (groupIndex: number | undefined) =>
      this.appState.selectedBarChartValues[field.id][groupIndex!] !== null;
    const isThisBarSelected = (value: string, groupIndex: number | undefined) =>
      this.appState.selectedBarChartValues[field.id][groupIndex!] === value;

    return html` <comparator-bar-chart
      .getValueDomain=${getValueDomain}
      .getGroupedNestedDataValues=${getBarChartNestedData}
      .groupCount=${groupCount}
      .isNested=${true}
      .handleClickBar=${handleClickBar}
      .isAnyBarSelected=${isAnyBarSelected}
      .isThisBarSelected=${isThisBarSelected}>
    </comparator-bar-chart>`;
  }

  override render() {
    // tslint:disable-next-line:no-any
    const renderChartsForCustomFields: Array<[string, any]> =
        this.appState
            .columns
            // TODO: Will not need when custom functions are
            // merged.
            .filter((field: Field) => field.id.startsWith('custom_field:'))
            .filter(
                (field: Field) => field.type === FieldType.NUMBER ||
                    field.type === FieldType.CATEGORY ||
                    field.type === FieldType.PER_MODEL_BOOLEAN ||
                    field.type === FieldType.PER_MODEL_NUMBER ||
                    field.type === FieldType.PER_MODEL_CATEGORY ||
                    field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY,
                )
            .map((field: Field) => {
              if (field.type === FieldType.NUMBER) {
                return [field.name, this.renderCustomFieldHistogram(field)];
              } else if (field.type === FieldType.PER_MODEL_NUMBER) {
                return [
                  field.name,
                  this.renderCustomFieldSideBySideHistogram(field),
                ];
              } else if (
                  field.type === FieldType.PER_MODEL_CATEGORY ||
                  field.type === FieldType.PER_MODEL_BOOLEAN) {
                return [
                  field.name,
                  this.renderCustomFieldSideBySideBarChart(field),
                ];
              } else if (
                  field.type === FieldType.PER_RATING_PER_MODEL_CATEGORY) {
                return [
                  field.name,
                  this.renderCustomFieldPerRatingSideBySideBarChart(field),
                ];
              } else {
                // field.type === FieldType.CATEGORY
                return [field.name, this.renderCustomFieldBarChart(field)];
              }
            });

    const handleClickTitleBar = (fieldName: string) => {
      const key = `custom_field:${fieldName}`;
      if (!this.appState.showSidebarComponents.hasOwnProperty(key)) {
        this.appState.showSidebarComponents[key] = true;
      } else if (this.appState.showSidebarComponents[key] === false) {
        this.appState.showSidebarComponents[key] = true;
      } else {
        this.appState.showSidebarComponents[key] = false;
      }
    };

    const renderSidebarComponents = renderChartsForCustomFields.map((chart) => {
      const [fieldName, renderChart] = chart;
      const key = `custom_field:${fieldName}`;
      // prettier-ignore
      return html`
            <div class="sidebar-component">
              <div class="sidebar-component-title"
                @click=${() => void handleClickTitleBar(fieldName)}>
                <div>${fieldName}</div>
                <div>
                  ${this.appState.showSidebarComponents[key] === false ?
                    html`<mwc-icon class="expand-icon">unfold_more</mwc-icon>` :
                    html`<mwc-icon class="expand-icon">unfold_less</mwc-icon>`}
                </div>
              </div>
              ${this.appState.showSidebarComponents[key] === true ?
                html`
                  <div class="sidebar-component-content">
                    ${renderChart}
                  </div>` :
                ''}
            </div>`;
    });

    return html`${renderSidebarComponents}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-charts': ChartsElement;
  }
}
