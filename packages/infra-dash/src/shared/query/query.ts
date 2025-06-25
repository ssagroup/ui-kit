import { hashKey, partialMatchKey, QueryKey } from './key';

export type QueryState<T> =
  | { isLoaded: false; isFetching: boolean; data: undefined; error: null }
  | { isLoaded: true; isFetching: boolean; data: T; error: null }
  | { isLoaded: true; isFetching: boolean; data: undefined; error: Error };

type Subscriber<T> = (state: QueryState<T>) => void;

export type Fetcher<T> = (signal: AbortSignal) => Promise<T>;
export type QueryOptions = {
  enabled?: boolean;
};

export class QueryEntry<T> {
  key: QueryKey;
  fetcher: Fetcher<T>;
  options: QueryOptions;
  state: QueryState<T> = {
    data: undefined,
    error: null,
    isLoaded: false,
    isFetching: false,
  };
  promise: Promise<T | undefined> | null = null;
  subscribers: Set<Subscriber<T>> = new Set();

  private controller: AbortController | null = null;

  constructor(key: QueryKey, fetcher: Fetcher<T>, options?: QueryOptions) {
    this.key = key;
    this.fetcher = fetcher;
    this.options = { enabled: options?.enabled ?? true };
  }

  private notify() {
    // ensure subscribers are notified after the current call stack
    queueMicrotask(() => {
      for (const sub of this.subscribers) {
        sub(this.state);
      }
    });
  }

  isActive() {
    return this.subscribers.size && this.options.enabled;
  }

  updateEntity(fetcher: Fetcher<T>, options?: QueryOptions): QueryEntry<T> {
    this.fetcher = fetcher;
    this.options = { ...this.options, ...options };
    this.fetch(); // re-trigger fetch with new fetcher
    return this;
  }

  fetch() {
    if (!this.options.enabled) {
      if (this.state.isLoaded || this.state.isFetching) {
        this.state = {
          ...this.state,
          data: undefined,
          error: null,
          isLoaded: false,
          isFetching: false,
        };
        this.cancel();
        this.notify();
      }
      return Promise.resolve(this.state.data);
    }

    // dedupe in-flight fetches
    if (this.promise && !this.controller?.signal.aborted) {
      return this.promise;
    }

    if (this.state.isLoaded && !this.state.isFetching) {
      return Promise.resolve(this.state.data);
    }

    this.state = {
      ...this.state,
      isFetching: true,
    };
    this.notify();

    this.controller = new AbortController();
    const signal = this.controller.signal;

    this.promise = this.fetcher(signal)
      .then((data) => {
        this.state = { data, error: null, isLoaded: true, isFetching: false };
        return data;
      })
      .catch((error) => {
        if (signal.aborted) {
          return undefined;
        }
        this.state = {
          data: undefined,
          error,
          isLoaded: true,
          isFetching: false,
        };
        return undefined;
      })
      .finally(() => {
        this.promise = null;
        this.notify();
      });

    return this.promise;
  }

  subscribe(sub: Subscriber<T>): () => void {
    this.subscribers.add(sub);
    sub(this.state);
    return () => {
      this.subscribers.delete(sub);
      setTimeout(() => {
        if (!this.subscribers.size) {
          this.cancel();
        }
      });
    };
  }

  setData(data: T) {
    this.state = {
      ...this.state,
      isLoaded: true,
      isFetching: false,
      error: null,
      data,
    };
    this.notify();
  }

  invalidate(reset = false) {
    if (reset) {
      // if reset is true, we reset the state to initial
      this.state = {
        data: undefined,
        error: null,
        isLoaded: false,
        isFetching: false,
      };
    }
    // kick off a new fetch
    this.state.isFetching = true;
    this.cancel();
    this.fetch();
  }

  cancel() {
    if (this.controller) {
      this.controller.abort('Query cancelled');
      this.controller = null;
    }
  }
}

export class QueryClient {
  private cache = new Map<string, QueryEntry<unknown>>();

  get<T>(key: QueryKey): QueryEntry<T> | undefined {
    return this.cache.get(hashKey(key)) as QueryEntry<T> | undefined;
  }

  fetchQuery<T>(
    key: QueryKey,
    fetcher: Fetcher<T>,
    options?: QueryOptions,
  ): QueryEntry<T> {
    const keyHash = hashKey(key);
    let entry = this.cache.get(keyHash) as QueryEntry<T> | undefined;
    if (!entry) {
      entry = new QueryEntry<T>(key, fetcher, options);
      this.cache.set(keyHash, entry as QueryEntry<unknown>);
    }
    entry.fetch(); // trigger network (or return cached in-flight promise)
    return entry;
  }

  invalidateQueries({
    key,
    exact,
    reset,
    type = 'all',
  }: {
    key: QueryKey;
    exact?: boolean;
    reset?: boolean;
    type?: 'active' | 'inactive' | 'all';
  }) {
    const matchingEntries: QueryEntry<unknown>[] = [];
    for (const [hash, entry] of this.cache.entries()) {
      if (type !== 'all') {
        const active = entry.isActive();
        if ((type === 'active' && !active) || (type === 'inactive' && active)) {
          continue; // skip entries that don't match the type
        }
      }
      if (exact) {
        if (hash === hashKey(key)) {
          matchingEntries.push(entry);
        }
      } else {
        if (partialMatchKey(entry.key, key)) {
          matchingEntries.push(entry);
        }
      }
    }
    for (const entry of matchingEntries) {
      entry.invalidate(reset);
    }
  }

  setQueryData<T>(key: QueryKey, data: T) {
    const keyHash = hashKey(key);
    const existing = this.cache.get(keyHash) as QueryEntry<T> | undefined;
    if (existing) {
      existing.setData(data);
    } else {
      const newEntry = new QueryEntry<T>(key, () => Promise.resolve(data));
      newEntry.setData(data);
      this.cache.set(keyHash, newEntry as QueryEntry<unknown>);
    }
  }
}

export const queryClient = new QueryClient();
