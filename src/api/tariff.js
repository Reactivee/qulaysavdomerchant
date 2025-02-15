import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import { fetcher, fetcherPost } from 'utils/axios';

export const endpoints = {
  key: '/api',
  list: '/orders/tariffs', // server URL
  calculator: '/calculator' // server URL

};

export function useGetTariff() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.list, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      tariff: data?.data,
      meta: data?.meta,
      isLoading,
      error,
      isValidating,
      tariffEmpty: !isLoading && !data?.customers?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useCalculateTariff(price) {
  const url = [endpoints.key + endpoints.calculator, { 'price': price }];
  const { data, isLoading, error, isValidating } = useSWR(url, fetcherPost, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      calc: data?.data,
      meta: data?.meta,
      isLoading,
      error,
      isValidating,
      tariffEmpty: !isLoading && !data?.customers?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

