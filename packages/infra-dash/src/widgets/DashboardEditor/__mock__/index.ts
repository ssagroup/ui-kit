import { DataFrameType, FieldType, ThresholdsMode } from '@grafana/data';
import { FieldColorModeId } from '@grafana/schema';

import { Dashboard } from '@shared/dashboard';
import {
  GrafanaDashboard,
  GrafanaPanel,
  GrafanaPanelData,
} from '@shared/grafana';
import {
  CreateDashboardPayload,
  RestInfraDashTransport,
  UpdateDashboardPayload,
} from '@shared/transport';

export const timeseriesData: GrafanaPanelData = {
  source: 'grafana',
  data: {
    results: {
      A: {
        status: 200,
        frames: [
          {
            schema: {
              refId: 'A',
              meta: {
                type: DataFrameType.TimeSeriesMulti,
                typeVersion: [0, 1],
                custom: {
                  resultType: 'matrix',
                },
                executedQueryString: '',
              },
              fields: [
                {
                  name: 'Time',
                  type: FieldType.time,
                  config: {
                    interval: 30000,
                  },
                },
                {
                  name: 'Value',
                  type: FieldType.number,
                  labels: {},
                  config: {
                    displayNameFromDS: 'avg(jobs_enqueued)',
                  },
                },
              ],
            },
            data: {
              values: [
                [
                  1749536050000, 1749536080000, 1749536110000, 1749536140000,
                  1749536170000, 1749536200000, 1749536230000, 1749536260000,
                  1749536290000, 1749536320000, 1749536350000, 1749536380000,
                  1749536410000, 1749536440000, 1749536470000, 1749536500000,
                  1749536530000, 1749536560000, 1749536590000, 1749536620000,
                  1749536650000, 1749536680000, 1749536710000, 1749536740000,
                  1749536770000, 1749536800000, 1749536830000, 1749536860000,
                  1749536890000, 1749536920000, 1749536950000, 1749536980000,
                  1749537010000, 1749537040000, 1749537070000, 1749537100000,
                  1749537130000, 1749537160000, 1749537190000, 1749537220000,
                  1749537250000, 1749537280000, 1749537310000, 1749537340000,
                  1749537370000, 1749537400000, 1749537430000, 1749537460000,
                  1749537490000, 1749537520000, 1749537550000, 1749537580000,
                  1749537610000, 1749537640000, 1749537670000, 1749537700000,
                  1749537730000, 1749537760000, 1749537790000, 1749537820000,
                  1749537850000, 1749537880000, 1749537910000, 1749537940000,
                  1749537970000, 1749538000000, 1749538030000, 1749538060000,
                  1749538090000, 1749538120000, 1749538150000, 1749538180000,
                  1749538210000, 1749538240000, 1749538270000, 1749538300000,
                  1749538330000, 1749538360000, 1749538390000, 1749538420000,
                  1749538450000, 1749538480000, 1749538510000, 1749538540000,
                  1749538570000, 1749538600000, 1749538630000, 1749538660000,
                  1749538690000, 1749538720000, 1749538750000, 1749538780000,
                  1749538810000, 1749538840000, 1749538870000, 1749538900000,
                  1749538930000, 1749538960000, 1749538990000, 1749539020000,
                  1749539050000, 1749539080000, 1749539110000, 1749539140000,
                  1749539170000, 1749539200000, 1749539230000, 1749539260000,
                  1749539290000, 1749539320000, 1749539350000, 1749539380000,
                  1749539410000, 1749539440000, 1749539470000, 1749539500000,
                  1749539530000, 1749539560000, 1749539590000, 1749539620000,
                  1749539650000,
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
                ],
              ],
            },
          },
        ],
      },
      B: {
        status: 200,
        frames: [
          {
            schema: {
              refId: 'B',
              meta: {
                type: DataFrameType.TimeSeriesMulti,
                typeVersion: [0, 1],
                custom: {
                  resultType: 'matrix',
                },
                executedQueryString: '',
              },
              fields: [
                {
                  name: 'Time',
                  type: FieldType.time,
                  config: {
                    interval: 30000,
                  },
                },
                {
                  name: 'Value',
                  type: FieldType.number,
                  labels: {},
                  config: {
                    displayNameFromDS: 'avg(jobs_processing)',
                  },
                },
              ],
            },
            data: {
              values: [
                [
                  1749536050000, 1749536080000, 1749536110000, 1749536140000,
                  1749536170000, 1749536200000, 1749536230000, 1749536260000,
                  1749536290000, 1749536320000, 1749536350000, 1749536380000,
                  1749536410000, 1749536440000, 1749536470000, 1749536500000,
                  1749536530000, 1749536560000, 1749536590000, 1749536620000,
                  1749536650000, 1749536680000, 1749536710000, 1749536740000,
                  1749536770000, 1749536800000, 1749536830000, 1749536860000,
                  1749536890000, 1749536920000, 1749536950000, 1749536980000,
                  1749537010000, 1749537040000, 1749537070000, 1749537100000,
                  1749537130000, 1749537160000, 1749537190000, 1749537220000,
                  1749537250000, 1749537280000, 1749537310000, 1749537340000,
                  1749537370000, 1749537400000, 1749537430000, 1749537460000,
                  1749537490000, 1749537520000, 1749537550000, 1749537580000,
                  1749537610000, 1749537640000, 1749537670000, 1749537700000,
                  1749537730000, 1749537760000, 1749537790000, 1749537820000,
                  1749537850000, 1749537880000, 1749537910000, 1749537940000,
                  1749537970000, 1749538000000, 1749538030000, 1749538060000,
                  1749538090000, 1749538120000, 1749538150000, 1749538180000,
                  1749538210000, 1749538240000, 1749538270000, 1749538300000,
                  1749538330000, 1749538360000, 1749538390000, 1749538420000,
                  1749538450000, 1749538480000, 1749538510000, 1749538540000,
                  1749538570000, 1749538600000, 1749538630000, 1749538660000,
                  1749538690000, 1749538720000, 1749538750000, 1749538780000,
                  1749538810000, 1749538840000, 1749538870000, 1749538900000,
                  1749538930000, 1749538960000, 1749538990000, 1749539020000,
                  1749539050000, 1749539080000, 1749539110000, 1749539140000,
                  1749539170000, 1749539200000, 1749539230000, 1749539260000,
                  1749539290000, 1749539320000, 1749539350000, 1749539380000,
                  1749539410000, 1749539440000, 1749539470000, 1749539500000,
                  1749539530000, 1749539560000, 1749539590000, 1749539620000,
                  1749539650000,
                ],
                [
                  2, 2, 1, 2, 3, 2, 2, 2, 3, 2, 3, 3, 3, 6, 10, 0, 1, 1, 1, 1,
                  2, 2, 1, 2, 2, 2, 2, 2, 2, 3, 1, 2, 3, 3, 3, 3, 7, 10, 1, 1,
                  1, 1, 2, 2, 2, 3, 1, 1, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 4, 5,
                  10, 1, 1, 1, 2, 1, 1, 1, 3, 2, 1, 1, 2, 2, 1, 1, 5, 3, 3, 3,
                  3, 3, 10, 7, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1,
                  3, 3, 2, 3, 3, 8, 1, 1, 1, 1, 1, 2, 1, 3, 3, 2, 3, 3, 10, 3,
                  10,
                ],
              ],
            },
          },
        ],
      },
    },
  },
};

export const bargaugeData: GrafanaPanelData = {
  source: 'grafana',
  data: {
    results: {
      A: {
        status: 200,
        frames: [
          {
            schema: {
              refId: 'A',
              meta: {
                type: DataFrameType.TimeSeriesMulti,
                typeVersion: [0, 1],
                custom: {
                  resultType: 'matrix',
                },
                executedQueryString: '',
              },
              fields: [
                {
                  name: 'Time',
                  type: FieldType.time,
                  config: {
                    interval: 30000,
                  },
                },
                {
                  name: 'Value',
                  type: FieldType.number,
                  labels: {},
                  config: {
                    displayNameFromDS: 'C:',
                  },
                },
              ],
            },
            data: {
              values: [[1749539290000], [84.62995745209479]],
            },
          },
          {
            schema: {
              refId: 'A',
              meta: {
                type: DataFrameType.TimeSeriesMulti,
                typeVersion: [0, 1],
                custom: {
                  resultType: 'matrix',
                },
              },
              fields: [
                {
                  name: 'Time',
                  type: FieldType.time,
                  config: {
                    interval: 30000,
                  },
                },
                {
                  name: 'Value',
                  type: FieldType.number,
                  labels: {},
                  config: {
                    displayNameFromDS: 'D:',
                  },
                },
              ],
            },
            data: {
              values: [[1749539290000], [17.129601367437886]],
            },
          },
          {
            schema: {
              refId: 'A',
              meta: {
                type: DataFrameType.TimeSeriesMulti,
                typeVersion: [0, 1],
                custom: {
                  resultType: 'matrix',
                },
              },
              fields: [
                {
                  name: 'Time',
                  type: FieldType.time,
                  config: {
                    interval: 30000,
                  },
                },
                {
                  name: 'Value',
                  type: FieldType.number,
                  labels: {},
                  config: {
                    displayNameFromDS: 'E:',
                  },
                },
              ],
            },
            data: {
              values: [[1749539290000], [28.787045523984105]],
            },
          },
        ],
      },
    },
  },
};

export const gaugeData: GrafanaPanelData = {
  source: 'grafana',
  data: {
    results: {
      A: {
        status: 200,
        frames: [
          {
            schema: {
              refId: 'A',
              meta: {
                type: DataFrameType.TimeSeriesMulti,
                typeVersion: [0, 1],
              },
              fields: [
                {
                  name: 'Time',
                  type: FieldType.time,
                  config: {
                    links: [],
                  },
                },
                {
                  name: 'Data space used percent',
                  type: FieldType.number,
                  labels: {},
                  config: {
                    unit: 'percent',
                    links: [],
                  },
                },
              ],
            },
            data: {
              values: [[1749539560000], [26]],
            },
          },
        ],
      },
    },
  },
};

export const dashboard: Dashboard = {
  id: 1,
  title: 'Sample Dashboard',
  published: true,
  dashboardDefinition: { version: 1 },
  panels: [
    {
      id: 1,
      source: {
        type: 'grafana',
        dashboardUid: '1',
        panelId: 31,
      },
      panelDefinition: {
        version: 1,
        gridPos: { w: 12, h: 4, x: 0, y: 0 },
        component: { id: 'timeseries-default', props: {} },
      },
      title: 'Job Queue',
      panelSchema: {
        type: 'timeseries',
      },
    },
    {
      id: 2,
      source: {
        type: 'grafana',
        dashboardUid: '1',
        panelId: 32,
      },
      panelDefinition: {
        version: 1,
        gridPos: { w: 9, h: 4, x: 3, y: 4 },
        component: { id: 'bargauge-default', props: {} },
      },
      title: 'Storage Utilization',
      panelSchema: {
        type: 'bargauge',
        fieldConfig: {
          defaults: {
            color: {
              mode: FieldColorModeId.Thresholds,
            },
            mappings: [],
            max: 100,
            thresholds: {
              mode: ThresholdsMode.Absolute,
              steps: [
                {
                  color: 'green',
                  value: null,
                },
                {
                  color: '#EAB839',
                  value: 80,
                },
                {
                  color: 'red',
                  value: 90,
                },
              ],
            },
            unit: 'percent',
          },
          overrides: [],
        },
      },
    },
    {
      id: 3,
      source: {
        type: 'grafana',
        dashboardUid: '1',
        panelId: 33,
      },
      panelDefinition: {
        version: 1,
        gridPos: { w: 3, h: 4, x: 0, y: 4 },
        component: { id: 'gauge-default', props: {} },
      },
      title: 'CPU Percentage',
      panelSchema: {
        type: 'gauge',
        fieldConfig: {
          defaults: {
            color: {
              mode: FieldColorModeId.Thresholds,
            },
            mappings: [],
            thresholds: {
              mode: ThresholdsMode.Absolute,
              steps: [
                {
                  value: null,
                  color: 'green',
                },
                {
                  color: 'red',
                  value: 90,
                },
              ],
            },
          },
          overrides: [],
        },
      },
    },
  ],
};

const dashboards: GrafanaDashboard[] = [
  { id: '1', title: 'Sample Dashboard' },
  { id: '2', title: 'Another Dashboard' },
  { id: '3', title: 'Third Dashboard' },
];

export class MockTransport extends RestInfraDashTransport {
  constructor() {
    super({ baseUrl: 'http://mock-infradash/api' });
  }
  protected makeRequest<T = unknown>(request: Request): Promise<T> {
    throw new Error(
      `MockTransport does not support makeRequest. ${request.url}`,
    );
  }

  getDashboard() {
    return Promise.resolve(dashboard);
  }

  getGrafanaDashboards() {
    return Promise.resolve(dashboards);
  }

  getGrafanaPanels(grafanaDashboardUid: string): Promise<GrafanaPanel[]> {
    if (grafanaDashboardUid === '1') {
      return Promise.resolve(
        dashboard.panels.map((panel) => ({
          id: panel.source.panelId,
          title: panel.title,
          subPanels: null,
          panelSchema: panel.panelSchema,
        })),
      );
    }
    if (grafanaDashboardUid === '2') {
      return Promise.resolve([
        {
          id: 34,
          title: '',
          panelSchema: {
            type: 'row',
          },
          subPanels: [dashboard.panels[0]].map((panel) => ({
            id: panel.source.panelId,
            title: panel.title,
            subPanels: null,
            panelSchema: panel.panelSchema,
          })),
        },
      ]);
    }
    return Promise.resolve([]);
  }

  getGrafanaPanelData({
    dashboardUid,
    panelId,
  }: {
    dashboardUid: string;
    panelId: number;
  }): Promise<GrafanaPanelData> {
    if (dashboardUid === '1') {
      switch (panelId) {
        case 31:
          return Promise.resolve(timeseriesData);
        case 32:
          return Promise.resolve(bargaugeData);
        case 33:
          return Promise.resolve(gaugeData);
        default:
          throw new Error(`Panel data not found for panel ID ${panelId}`);
      }
    }
    throw new Error(`Dashboard UID ${dashboardUid} not found`);
  }

  createDashboard(payload: CreateDashboardPayload): Promise<unknown> {
    alert(
      `MockTransport: createDashboard called with payload: ${JSON.stringify(
        payload,
      )}`,
    );
    return Promise.resolve();
  }

  updateDashboard(payload: UpdateDashboardPayload): Promise<unknown> {
    alert(
      `MockTransport: updateDashboard called with payload: ${JSON.stringify(
        payload,
      )}`,
    );
    return Promise.resolve();
  }
}
