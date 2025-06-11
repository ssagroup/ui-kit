import { useCallback, useMemo, useSyncExternalStore } from 'react';

import { Fetcher, QueryEntry, QueryOptions, QueryState } from './query';
import { hashKey, QueryKey } from './key';

import { useInfraDashContext } from '../context';

export const useQueryClient = () => {
  const { queryClient } = useInfraDashContext();
  return queryClient;
};

export const useQuery = <T>(
  key: QueryKey,
  fetcher: Fetcher<T>,
  options?: QueryOptions,
) => {
  const queryClient = useQueryClient();

  const keyHash = useMemo(() => hashKey(key), [key]);
  const entry = useMemo(
    () => queryClient.fetchQuery<T>(key, fetcher, options) as QueryEntry<T>,
    [keyHash],
  );

  entry.updateEntity(fetcher, options);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      return entry.subscribe(() => {
        onStoreChange();
      });
    },
    [entry],
  );

  const getSnapshot = (): QueryState<T> => {
    return entry.state;
  };
  const getServerSnapshot = getSnapshot;

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    ...state,
    refetch: () => queryClient.invalidateQueries({ key, exact: true }),
  };
};
