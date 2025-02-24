import { useState } from 'react';

export function useApi<T extends unknown[], D>(
  fetcherFn: (...args: T) => Promise<D>,
  initialValue?: D,
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<D | undefined>(initialValue);

  const query = async (...args: Parameters<typeof fetcherFn>) => {
    setIsLoading(true);
    setError(null);

    try {
      const respData = await fetcherFn(...args);
      setData(respData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    // TODO: useApi users should use type guards instead of "data as D"
    data: data as D,
    query,
  };
}
