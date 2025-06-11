import { Dashboard, DashboardDefinition } from '../dashboard';
import { GrafanaDashboard, GrafanaPanel, GrafanaPanelData } from '../grafana';
import { PanelDefinition } from '../panel';

export type CreateDashboardPayload = {
  title: string;
  dashboardUid: string;
  dashboardDefinition: DashboardDefinition;
  panels: { id: number; panelDefinition: PanelDefinition }[];
};

export type UpdateDashboardPayload = {
  dashboardId: number;
  title: string;
  dashboardDefinition: DashboardDefinition;
  panels: { id: number; panelDefinition: PanelDefinition }[];
};

export interface InfraDashTransport {
  getGrafanaDashboards: (signal?: AbortSignal) => Promise<GrafanaDashboard[]>;
  getGrafanaPanels: (
    grafanaDashboardUid: string,
    signal?: AbortSignal,
  ) => Promise<GrafanaPanel[]>;
  getPanelData: (
    panelId: number,
    signal?: AbortSignal,
  ) => Promise<GrafanaPanelData>;
  getDashboards: (
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
