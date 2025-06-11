import { hashKey, MutationKey } from './key';

export type MutationState<T> = {
  data?: T;
  error?: unknown;
  isLoading: boolean;
};

type Subscriber<T> = (state: MutationState<T>) => void;

export type MutationFn<T, V> = (
  variables: V,
  signal: AbortSignal,
) => Promise<T>;

export type MutationOptions<T, V> = {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: unknown, variables: V) => void;
  onSettled?: (
    error: unknown | undefined,
    data: T | undefined,
    variables: V,
  ) => void;
};

export class MutationEntry<T, V> {
  key: MutationKey;
  mutationFn: MutationFn<T, V>;
  options: MutationOptions<T, V> | undefined;
  state: MutationState<T> = {
    data: undefined,
    error: undefined,
    isLoading: false,
  };
  promise: Promise<T | undefined> | null = null;
  subscribers: Set<Subscriber<T>> = new Set();

  private controller: AbortController | null = null;

  constructor(
    key: MutationKey,
    mutationFn: MutationFn<T, V>,
    options?: MutationOptions<T, V>,
  ) {
    this.key = key;
    this.mutationFn = mutationFn;
    this.options = options;
  }

  private notify() {
    for (const sub of this.subscribers) {
      sub(this.state);
    }
  }

  updateEntity(
    mutationFn: MutationFn<T, V>,
    options?: MutationOptions<T, V>,
  ): void {
    this.mutationFn = mutationFn;
    if (options !== undefined) {
      this.options = options;
    }
  }

  mutate(...args: V extends undefined ? [] : [V]): Promise<T | undefined> {
    const variables = args[0] as V;

    // abort any existing in-flight mutation
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();
    const signal = this.controller.signal;

    this.state = { ...this.state, isLoading: true };
    this.notify();

    const { onSuccess, onError, onSettled } = this.options || {};

    this.promise = this.mutationFn(variables, signal)
      .then((data) => {
        this.state = { data, error: undefined, isLoading: false };
        this.notify();
        if (onSuccess) {
          try {
            onSuccess(data, variables);
          } catch (err) {
            console.error('Error in onSuccess callback:', err);
          }
        }
        if (onSettled) {
          try {
            onSettled(undefined, data, variables);
          } catch (err) {
            console.error('Error in onSettled callback (success):', err);
          }
        }
        return data;
      })
      .catch((error) => {
        if (signal.aborted) {
          return undefined;
        }
        this.state = { data: undefined, error, isLoading: false };
        this.notify();
        if (onError) {
          try {
            onError(error, variables);
          } catch (err) {
            console.error('Error in onError callback:', err);
          }
        }
        if (onSettled) {
          try {
            onSettled(error, undefined, variables);
          } catch (err) {
            console.error('Error in onSettled callback (error):', err);
          }
        }
        throw error;
      })
      .finally(() => {
        this.promise = null;
      });

    return this.promise;
  }

  subscribe(sub: Subscriber<T>): () => void {
    this.subscribers.add(sub);
    sub(this.state);
    return () => {
      this.subscribers.delete(sub);
    };
  }

  cancel() {
    if (this.controller) {
      this.controller.abort();
    }
  }

  reset() {
    this.state = { data: undefined, error: undefined, isLoading: false };
    this.notify();
    this.cancel();
  }
}

export class MutationClient {
  private cache = new Map<string, MutationEntry<unknown, unknown>>();

  fetchMutation<T, V>(
    key: MutationKey,
    mutationFn: MutationFn<T, V>,
    options?: MutationOptions<T, V>,
  ): MutationEntry<T, V> {
    const keyHash = hashKey(key);
    let entry = this.cache.get(keyHash) as MutationEntry<T, V> | undefined;
    if (!entry) {
      entry = new MutationEntry<T, V>(key, mutationFn, options);
      this.cache.set(keyHash, entry as MutationEntry<unknown, unknown>);
    }
    return entry;
  }
}

export const mutationClient = new MutationClient();
