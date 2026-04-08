import { useCallback, useState } from 'react';

import { normalizeError, type RequestState } from '@/lib/request';

type UseRequestReturn<TData, TArgs extends unknown[]> = RequestState<TData> & {
  execute: (...args: TArgs) => Promise<TData | null>;
  reset: () => void;
};

export const useRequest = <TData, TArgs extends unknown[]>(
  requestFn: (...args: TArgs) => Promise<TData>,
): UseRequestReturn<TData, TArgs> => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (...args: TArgs) => {
    setLoading(true);
    setError(null);

    try {
      const response = await requestFn(...args);
      setData(response);
      return response;
    } catch (requestError: unknown) {
      setError(normalizeError(requestError));
      return null;
    } finally {
      setLoading(false);
    }
  }, [requestFn]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, error, loading, execute, reset };
};
