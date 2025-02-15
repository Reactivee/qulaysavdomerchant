import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import { fetcher, fetcherPost } from 'utils/axios';

export const endpoints = {
  key: '/api',
  list: '/links' // server URL

};

export function useGetLinks() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.list, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      links: data?.data,
      isLoading,
      error,
      isValidating

    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
