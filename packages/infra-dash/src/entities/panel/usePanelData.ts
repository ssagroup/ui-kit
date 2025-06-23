import { useInfraDashPanelDataPeriodContext } from '@shared/context';
import { Panel, PANEL_DATA_SOURCE, PanelData } from '@shared/panel';
import { QueryOptions, useQuery } from '@shared/query';
import { InfraDashTransport, useTransport } from '@shared/transport';

type Options = QueryOptions & {
  transport?: InfraDashTransport;
};

export const usePanelData = (panel: Panel, options: Options = {}) => {
  const _transport = useTransport(options?.transport);
  const { period } = useInfraDashPanelDataPeriodContext();
  const panelSource = panel.source;

  const result = useQuery(
    ['panel-data', { panelSource, period }],
    async (signal) => {
      if (panelSource.type === PANEL_DATA_SOURCE.GRAFANA) {
        const { dashboardUid, panelId } = panelSource;
        const data = await _transport.getGrafanaPanelData(
          { dashboardUid, panelId, period },
          signal,
        );
        return { source: PANEL_DATA_SOURCE.GRAFANA, data } satisfies PanelData;
      }
      throw new Error(`Unsupported panel data source: ${panelSource}`);
    },
    options,
  );

  return result;
};
