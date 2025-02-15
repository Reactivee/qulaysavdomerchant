import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import { fetcher } from 'utils/axios';

export const endpoints = {
  key: '/api',
  user: '/me',
  list: '/users?per_page=20'
};

export function useGetUser() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.user, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      user: data?.data,
      isLoading,
      error,
      isValidating,
      userEmpty: !isLoading && !data?.customers?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetMerchantList() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.list, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });

  const memoizedValue = useMemo(
    () => ({
      merchant: data?.data,
      isLoading,
      error,
      isValidating,
      userEmpty: !isLoading && !data?.customers?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}



