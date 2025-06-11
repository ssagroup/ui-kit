import {
  useQuery,
  useMutation,
  QueryOptions,
  MutationOptions,
} from '@shared/query';
import {
  CreateDashboardPayload,
  InfraDashTransport,
  UpdateDashboardPayload,
  useTransport,
} from '@shared/transport';
import { DashboardDefinition } from '@shared/dashboard';

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

export const useCreateDashboard = (
  options?: MOptions<unknown, DashboardDefinition>,
) => {
  const { transport, ...mutationOptions } = options || {};
  const _transport = useTransport(transport);
  const result = useMutation(
    ['create-dashboard'],
    async (payload: CreateDashboardPayload, signal?: AbortSignal) => {
      return await _transport.createDashboard(payload, signal);
    },
    mutationOptions,
  );
  return result;
};

export const useUpdateDashboard = (
  dashboardId: number,
  options?: MOptions<unknown, DashboardDefinition>,
) => {
  const { transport, ...mutationOptions } = options || {};
  const _transport = useTransport(transport);
  const result = useMutation(
    ['update-dashboard', dashboardId],
    async (
      payload: Omit<UpdateDashboardPayload, 'dashboardId'>,
      signal?: AbortSignal,
    ) => {
      return await _transport.updateDashboard(
        { ...payload, dashboardId },
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
