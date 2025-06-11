import { useEffect } from 'react';

import { PANEL_DATA_SOURCE, PanelData } from '@shared/panel';
import { QueryOptions, useQuery } from '@shared/query';
import { InfraDashTransport, useTransport } from '@shared/transport';

type Options = QueryOptions & {
  transport?: InfraDashTransport;
};

export const usePanelData = (
  panelId: number,
  options?: Options & { refetchIntervalMs?: number },
) => {
  const {
    transport,
    refetchIntervalMs = 60000, // 1 minute
    ...queryOptions
  } = options || {};
  const _transport = useTransport(transport);
  const result = useQuery(
    ['panel-data', panelId],
    async (signal) => {
      const data = await _transport.getPanelData(panelId, signal);
      // currently, we only support Grafana as a data source
      return { source: PANEL_DATA_SOURCE.GRAFANA, data } satisfies PanelData;
    },
    queryOptions,
  );

  useEffect(() => {
    if (refetchIntervalMs) {
      const intervalId = setInterval(() => {
        result.refetch();
      }, refetchIntervalMs);
      return () => clearInterval(intervalId);
    }
  }, [refetchIntervalMs]);

  return result;
};
