import {
  MutationOptions,
  QueryOptions,
  useMutation,
  useQuery,
} from '@shared/query';
import {
  CreateDashboardPayload,
  InfraDashTransport,
  UpdateDashboardPayload,
  useTransport,
} from '@shared/transport';

type QOptions = QueryOptions & {
  transport?: InfraDashTransport;
};

type MOptions<T, V> = MutationOptions<T, V> & {
  transport?: InfraDashTransport;
};

export const useDashboards = (options?: QOptions) => {
  const { transport, ...queryOptions } = options || {};
  const _transport = useTransport(transport);
  const result = useQuery(
    ['dashboards'],
    async (signal) => {
      return await _transport.getDashboards(signal);
    },
    queryOptions,
  );
  return result;
};

export const useDashboard = (dashboardId: number, options?: QOptions) => {
  const { transport, ...queryOptions } = options || {};
  const _transport = useTransport(transport);
  const result = useQuery(
    ['dashboards', dashboardId],
    async (signal) => {
      return await _transport.getDashboard(dashboardId, signal);
    },
    queryOptions,
  );
  return result;
};

export const usePublishedDashboards = (options?: QOptions) => {
  const { transport, ...queryOptions } = options || {};
  const _transport = useTransport(transport);
  const result = useQuery(
    ['dashboards', 'published'],
    async (signal) => {
      return await _transport.getPublishedDashboards(signal);
    },
    queryOptions,
  );
  return result;
};

export const useCreateDashboard = (
  options?: MOptions<unknown, CreateDashboardPayload>,
) => {
  const { transport, ...mutationOptions } = options || {};
  const _transport = useTransport(transport);
  const result = useMutation(
    ['create-dashboard'],
    async (payload: CreateDashboardPayload, signal?: AbortSignal) => {
      const panels = payload.panels.map((panel) => ({
        panelDefinition: panel.panelDefinition,
        source: panel.source,
      }));
      const dashboardsUid = new Set(
        panels.map((panel) => panel.source.dashboardUid),
      );
      if (!dashboardsUid.size) {
        throw new Error('At least one panel must be provided');
      }
      return await _transport.createDashboard(
        {
          title: payload.title,
          published: payload.published,
          dashboardDefinition: payload.dashboardDefinition,
          panels,
        },
        signal,
      );
    },
    mutationOptions,
  );
  return result;
};

export const useUpdateDashboard = (
  dashboardId: number,
  options?: MOptions<unknown, Omit<UpdateDashboardPayload, 'dashboardId'>>,
) => {
  const { transport, ...mutationOptions } = options || {};
  const _transport = useTransport(transport);
  const result = useMutation(
    ['update-dashboard', dashboardId],
    async (payload, signal?) => {
      const panels = payload.panels.map((panel) => ({
        panelDefinition: panel.panelDefinition,
        source: panel.source,
      }));
      const dashboardsUid = new Set(
        panels.map((panel) => panel.source.dashboardUid),
      );
      if (!dashboardsUid.size) {
        throw new Error('At least one panel must be provided');
      }
      return await _transport.updateDashboard(
        {
          title: payload.title,
          published: payload.published,
          dashboardDefinition: payload.dashboardDefinition,
          panels,
          dashboardId,
        },
        signal,
      );
    },
    mutationOptions,
  );
  return result;
};

export const useDeleteDashboard = (
  dashboardId: number,
  options?: MOptions<unknown, undefined>,
) => {
  const { transport, ...mutationOptions } = options || {};
  const _transport = useTransport(transport);
  const result = useMutation(
    ['delete-dashboard', dashboardId],
    async (_?: never, signal?: AbortSignal) => {
      return await _transport.deleteDashboard(dashboardId, signal);
    },
    mutationOptions,
  );
  return result;
};
