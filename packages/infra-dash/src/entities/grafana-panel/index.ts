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
      return await _transport.getGrafanaPanels(grafanaDashboardUid, signal);
    },
    queryOptions,
  );
  return result;
};
