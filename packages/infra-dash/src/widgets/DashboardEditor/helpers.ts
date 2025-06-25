import { Dashboard } from '@shared/dashboard';
import { GrafanaDashboard, GrafanaPanel } from '@shared/grafana';
import { matchPanelDataSource, Panel } from '@shared/panel';
import { PanelRegistry } from '@shared/panelRegistry';

export type AppendPanelParams = {
  dashboard: Dashboard;
  panelRegistry: PanelRegistry;
  source: {
    type: 'grafana';
    grafanaDashboard: GrafanaDashboard;
    grafanaPanel: GrafanaPanel;
  };
};
export const appendPanel = (params: AppendPanelParams) => {
  const { dashboard, panelRegistry, source } = params;
  const nextY = dashboard.panels.reduce(
    (maxY, { panelDefinition: { gridPos } }) =>
      Math.max(maxY, gridPos.y + gridPos.h),
    0,
  );

  const newPanel = matchPanelDataSource(source.type, {
    grafana: () => {
      const { grafanaDashboard, grafanaPanel } = source;
      if (!grafanaPanel.panelSchema) {
        return; // no schema, cannot append panel
      }
      const [defaultComponentConfig] = panelRegistry.findPanelConfigsByType(
        grafanaPanel.panelSchema.type,
      );
      const newPanel: Panel = {
        id: -Date.now(), // use a negative ID to indicate a new panel
        source: {
          type: 'grafana',
          dashboardUid: grafanaDashboard.id,
          panelId: grafanaPanel.id,
        },
        panelDefinition: {
          version: 1,
          component: {
            id: defaultComponentConfig.componentId,
            props: {},
          },
          gridPos: {
            x: 0,
            y: nextY,
            w: 12,
            h: 6,
          },
        },
        panelSchema: grafanaPanel.panelSchema,
        title: grafanaPanel.title,
      };
      return newPanel;
    },
  });

  if (!newPanel) {
    return dashboard; // no new panel created, return original dashboard
  }

  return {
    ...dashboard,
    panels: [...(dashboard.panels || []), newPanel],
  };
};

export type UpdatePanelParams = {
  dashboard: Dashboard;
  panel: Panel;
};

export const updatePanel = ({ dashboard, panel }: UpdatePanelParams) => {
  const newPanels = dashboard.panels.map((p) =>
    p.id === panel.id ? { ...p, ...panel } : p,
  );
  return {
    ...dashboard,
    panels: newPanels,
  };
};

export type RemovePanelParams = {
  dashboard: Dashboard;
  panel: Panel;
};

export const removePanel = ({ dashboard, panel }: RemovePanelParams) => {
  const newPanels = dashboard.panels.filter((p) => p.id !== panel.id);
  return {
    ...dashboard,
    panels: newPanels,
  };
};

export type ApplyNewLayoutParams = {
  dashboard: Dashboard;
  newLayout: ReactGridLayout.Layout[];
};

export const applyNewLayout = ({
  dashboard,
  newLayout,
}: ApplyNewLayoutParams) => {
  const newLayoutMap = newLayout.reduce(
    (map, { i, x, y, w, h }) => ({
      ...map,
      [i]: { x, y, w, h },
    }),
    {} as Record<string, Omit<ReactGridLayout.Layout, 'i'>>,
  );

  const newDashboard = {
    ...dashboard,
    panels: dashboard.panels.map((panel) => {
      const newGridPos = newLayoutMap[panel.id.toString()];
      if (!newGridPos) {
        throw new Error(`New position for the panel ${panel.id} not found`);
      }
      return {
        ...panel,
        panelDefinition: {
          ...panel.panelDefinition,
          gridPos: newGridPos,
        },
      };
    }),
  };

  return newDashboard;
};
