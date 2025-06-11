import { QueryOptions, useQuery } from '@shared/query';
import { InfraDashTransport, useTransport } from '@shared/transport';

type Options = QueryOptions & {
  transport?: InfraDashTransport;
};

export const useGrafanaDashboards = (options?: Options) => {
  const { transport, ...queryOptions } = options || {};
  const _transport = useTransport(transport);
  const result = useQuery(
    ['grafana-dashboards'],
    async (signal) => {
      return await _transport.getGrafanaDashboards(signal);
    },
    queryOptions,
  );
  return result;
};
