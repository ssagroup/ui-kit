import { useCallback, useMemo, useSyncExternalStore } from 'react';

import { useInfraDashContext } from '../context';

import { hashKey, MutationKey } from './key';
import {
  MutationEntry,
  MutationFn,
  MutationOptions,
  MutationState,
} from './mutation';

export const useMutationClient = () => {
  const { mutationClient } = useInfraDashContext();
  return mutationClient;
};

export const useMutation = <T, V = unknown>(
  key: MutationKey,
  mutationFn: MutationFn<T, V>,
  options?: MutationOptions<T, V>,
) => {
  const mutationClient = useMutationClient();

  const keyHash = useMemo(() => hashKey(key), [key]);
  const entry = useMemo(
    () =>
      mutationClient.fetchMutation<T, V>(
        key,
        mutationFn,
        options,
      ) as MutationEntry<T, V>,
    [keyHash],
  );

  entry.updateEntity(mutationFn, options);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      return entry.subscribe(() => {
        onStoreChange();
      });
    },
    [entry],
  );

  const getSnapshot = (): MutationState<T> => {
    return entry.state;
  };
  const getServerSnapshot = getSnapshot;

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const mutate = useCallback(
    (...args: Parameters<typeof entry.mutate>) => {
      return entry.mutate(...args);
    },
    [entry],
  );

  const reset = useCallback(() => {
    entry.reset();
  }, [entry]);

  const cancel = useCallback(() => {
    entry.cancel();
  }, [entry]);

  return {
    mutate,
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    reset,
    cancel,
  };
};
