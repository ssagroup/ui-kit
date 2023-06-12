import { useState } from 'react';

export function useApi<D>(
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  fetcherFn: (...args: any[]) => Promise<D>,
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  initialValue?: any,
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<D>(initialValue);

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
    data,
    query,
  };
}
