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
import {computed, makeObservable, observable} from 'mobx';

import {core} from '../core';
import {DEFAULT_SORTING_CRITERIA} from '../lib/constants';
import {styles as sharedStyles} from '../lib/shared_styles.css';
import {
  ChartType,
  Example,
  RationaleCluster,
  RationaleListItem,
  SortColumn,
  SortOrder,
} from '../lib/types';
import {AppState} from '../services/state_service';

import {styles} from './rationale_summary.css';

/**
 * Component for visualizing rationale summary clusters.
 */
@customElement('comparator-rationale-summary')
export class RationaleSummaryElement extends MobxLitElement {
  private readonly appState = core.getService(AppState);

  static override styles = [sharedStyles, styles];

  private readonly barMaxWidth = 40;
  private readonly barHeight = 16;
  private readonly widthOfNumberLabel = 10;

  // Whether to show the "others" category (id=0).
  // TODO: Implemented, but decided not to display it for now.
  @observable showOthers = false;

  @observable sortColumn = 'A'; // label, A, or B

  // Get examples with A or B being winners.
  @computed
  get filteredExamples(): Example[] {
    const chartSelectionKey = {
      chartType: ChartType.RATIONALE_CLUSTER,
      fieldId: 'rationale_cluster',
      model: null,
    };

    return this.appState.getFilteredExamplesExceptForParticularChart(
      chartSelectionKey,
    );
  }

  // Get rationale clusters with the information of the number of A and B wins.
  @computed
  get rationaleClustersWithCounts(): RationaleCluster[] {
    const aWinExamples = this.filteredExamples.filter((example: Example) =>
      this.appState.isWinnerFromScore('A', example.score),
    );
    const bWinExamples = this.filteredExamples.filter((example: Example) =>
      this.appState.isWinnerFromScore('B', example.score),
    );

    return this.appState.rationaleClusters
        .filter(
            (cluster: RationaleCluster) =>
                this.showOthers === false ? cluster.id >= 0 : true,
            )
        .map((cluster: RationaleCluster) => {
          // Count the number of examples with A or B wins that belong
          // to this cluster.
          const aWinCount = aWinExamples
                                .filter((example: Example) => {
                                  const clusterIds =
                                      example.rationale_list
                                          .map(
                                              (item: RationaleListItem) =>
                                                  item.assignedClusterIds)
                                          .flat();
                                  return clusterIds.includes(cluster.id);
                                })
                                .length;
          const bWinCount = bWinExamples
                                .filter((example: Example) => {
                                  const clusterIds =
                                      example.rationale_list
                                          .map(
                                              (item: RationaleListItem) =>
                                                  item.assignedClusterIds)
                                          .flat();
                                  return clusterIds.includes(cluster.id);
                                })
                                .length;

          return {
            id: cluster.id,
            title: cluster.title,
            aWinCount,
            bWinCount,
          };
        });
  }

  // Sort the rationale clusters by the number of A or B wins.
  @computed get sortedClusters(): RationaleCluster[] {
    return this.rationaleClustersWithCounts
        .filter(
            (cluster: RationaleCluster) =>
                cluster.aWinCount > 0 || cluster.bWinCount > 0,
            )
        .sort((i, j) => {
          // The item with id=-1 (others) always goes to the bottom.
          if (i.id === -1) {
            return 1;
          } else if (j.id === -1) {
            return -1;
          } else if (this.sortColumn === 'A') {
            return j.aWinCount - i.aWinCount;
          } else if (this.sortColumn === 'B') {
            return j.bWinCount - i.bWinCount;
          } else {
            return i.title.localeCompare(j.title);
          }
        });
  }

  constructor() {
    super();
    makeObservable(this);
  }

  private renderHeaderRow() {
    const styleHeaderCell = (column: string) =>
      classMap({
        'cluster-title': column === 'label',
        'example-count': column === 'A' || column === 'B',
        'sort-selected': this.sortColumn === column,
        'clickable': true,
      });
    const handleClickSortHeader = (column: string) => {
      this.sortColumn = column;
    };

    // prettier-ignore
    return html`<tr>
      <th
        class=${styleHeaderCell('label')}
        @click=${() => void handleClickSortHeader('label')}>
        Cluster Label
      </th>
      <th
        class=${styleHeaderCell('A')}
        @click=${() => void handleClickSortHeader('A')}>
        A better
      </th>
      <th
        class=${styleHeaderCell('B')}
        @click=${() => void handleClickSortHeader('B')}>
        B better
      </th>
      <th class="remove"> </th>
    </tr>`;
  }

  // Render a row of the table on the Rationale Summary sidebar component.
  private renderClusterRow(cluster: RationaleCluster, maxCount: number) {
    const handleClickClusterRow = (clusterId: number) => {
      if (clusterId === this.appState.selectedRationaleClusterId) {
        this.appState.selectedRationaleClusterId = null;

        this.appState.currentSorting = DEFAULT_SORTING_CRITERIA;
      } else {
        this.appState.selectedRationaleClusterId = clusterId;

        // Sort the table by rationale cluster match similarity values.
        this.appState.currentSorting = {
          column: SortColumn.RATIONALE_CLUSTER,
          customField: null,
          modelIndex: null,
          order: SortOrder.DESC,
        };
      }
    };

    // Table cell containing a bar chart with a number label.
    const renderBarCell = (count: number, maxCount: number, model: string) => {
      const barWidth = this.barMaxWidth * (count / maxCount);
      const styleBar = classMap({
        'bar': true,
        'a-win-color': model === 'A',
        'b-win-color': model === 'B',
      });
      const styleBarCountText = classMap({
        'bar-count-text': true,
        'right-aligned': this.barMaxWidth - barWidth < this.widthOfNumberLabel,
      });
      const textHorizontalPadding =
        this.barMaxWidth - barWidth < this.widthOfNumberLabel
          ? barWidth - 1
          : barWidth + 1;

      return html`<svg class="bar-svg">
        <rect
          class=${styleBar}
          width=${barWidth}
          height=${this.barHeight}
          x=${0}
          y=${0} />
        <text
          class=${styleBarCountText}
          y=${this.barHeight * 0.5}
          dx=${textHorizontalPadding}>
          ${count}
        </text>
      </svg>`;
    };

    const handleMouseEnterRow = (clusterId: number) =>
      (this.appState.hoveredRationaleClusterId = clusterId);
    const handleMouseLeaveRow = () =>
      (this.appState.hoveredRationaleClusterId = null);

    return html` <tr
      class=${classMap({
      'clickable': true,
      'selected': this.appState.selectedRationaleClusterId === cluster.id ||
          this.appState.matchedRationaleClusterIds.includes(cluster.id),
    })}
      @mouseenter=${() => void handleMouseEnterRow(cluster.id)}
      @mouseleave=${handleMouseLeaveRow}>
      <td class="cluster-title" title=${cluster.title}
        @click=${() => void handleClickClusterRow(cluster.id)}>
        ${cluster.title}
      </td>
      <td class="example-count"
        @click=${() => void handleClickClusterRow(cluster.id)}>
        ${renderBarCell(cluster.aWinCount, maxCount, 'A')}
      </td>
      <td class="example-count"
        @click=${() => void handleClickClusterRow(cluster.id)}>
        ${renderBarCell(cluster.bWinCount, maxCount, 'B')}
      </td>
      <td class="remove" title="Click to remove this row">
        <mwc-icon
          class="icon clickable"
          @click=${() => void this.appState.removeCluster(cluster.id)}>
          cancel
        </mwc-icon>
      </td>
    </tr>`;
  }

  override render() {
    if (this.appState.hasRationaleClusters === false) {
      return html``;
    }

    const maxCount = Math.max(
      1,
      ...this.sortedClusters.map(
        (cluster: RationaleCluster) => cluster.aWinCount,
      ),
      ...this.sortedClusters.map(
        (cluster: RationaleCluster) => cluster.bWinCount,
      ),
    );

    const renderClusters = this.sortedClusters.map(
      (cluster: RationaleCluster) => this.renderClusterRow(cluster, maxCount),
    );

    // prettier-ignore
    return html`<div class="sidebar-component">
      <div class="sidebar-component-title">
        Rationale Summary
      </div>
      <div class="sidebar-component-content">
        <div class="component-content-top">
          <div class="description">
            What are some clusters of the rationales used by the rater
            when it thinks A or B is better?
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              ${this.renderHeaderRow()}
            </thead>
            <tbody>
              ${renderClusters}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparator-rationale-summary': RationaleSummaryElement;
  }
}
