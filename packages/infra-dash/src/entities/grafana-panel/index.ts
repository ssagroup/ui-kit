import { useQuery, QueryOptions } from '@shared/query';
import { InfraDashTransport, useTransport } from '@shared/transport';

type Options = QueryOptions & {
  transport?: InfraDashTransport;
};

export const useGrafanaPanels = (
  grafanaDashboardUid: string,
  options?: Options,
) => {
  const { transport, ...queryOptions } = options || {};
  const _transport = useTransport(transport);
  const result = useQuery(
    ['grafana-panels', grafanaDashboardUid],
    async (signal) => {
      const panels = await _transport.getGrafanaPanels(
        grafanaDashboardUid,
        signal,
      );
      return panels.flatMap((panel) => {
        if (!panel.panelSchema || panel.panelSchema.type === 'row') {
          return panel.subPanels || [];
        }
        return panel;
      });
    },
    queryOptions,
  );
  return result;
};
