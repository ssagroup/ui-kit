import { Dashboard, DashboardDefinition } from '../dashboard';
import { GrafanaDashboard, GrafanaPanel, GrafanaPanelData } from '../grafana';
import { PANEL_DATA_SOURCE, PanelDefinition } from '../panel';

export type CreateDashboardPayload = {
  title: string;
  dashboardDefinition: DashboardDefinition;
  published: boolean;
  panels: {
    source: {
      type: typeof PANEL_DATA_SOURCE.GRAFANA;
      dashboardUid: string;
      panelId: number;
    };
    panelDefinition: PanelDefinition;
  }[];
};

export type UpdateDashboardPayload = {
  dashboardId: number;
} & CreateDashboardPayload;
export interface InfraDashTransport {
  getGrafanaDashboards: (signal?: AbortSignal) => Promise<GrafanaDashboard[]>;
  getGrafanaPanels: (
    grafanaDashboardUid: string,
    signal?: AbortSignal,
  ) => Promise<GrafanaPanel[]>;
  getGrafanaPanelData: (
    {
      dashboardUid,
      panelId,
    }: {
      dashboardUid: string;
      panelId: number;
    },
    signal?: AbortSignal,
  ) => Promise<GrafanaPanelData>;
  getDashboards: (
    signal?: AbortSignal,
  ) => Promise<Pick<Dashboard, 'id' | 'title'>[]>;
  getPublishedDashboards: (
    signal?: AbortSignal,
  ) => Promise<Pick<Dashboard, 'id' | 'title'>[]>;
  getDashboard: (
    dashboardUid: number,
    signal?: AbortSignal,
  ) => Promise<Dashboard>;
  createDashboard: (
    payload: CreateDashboardPayload,
    signal?: AbortSignal,
  ) => Promise<unknown>;
  updateDashboard: (
    payload: UpdateDashboardPayload,
    signal?: AbortSignal,
  ) => Promise<unknown>;
  deleteDashboard: (
    dashboardId: number,
    signal?: AbortSignal,
  ) => Promise<unknown>;
}
