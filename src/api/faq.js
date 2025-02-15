import useSWR from 'swr';
import { useMemo } from 'react';

// utils
import { fetcher } from 'utils/axios';

export const endpoints = {
  key: '/api',
  faq: '/questions' // server URL
};

export function useGetFaq() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.faq, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      faq: data?.data,
      isLoading,
      error,
      isValidating,
      faqEmpty: !isLoading && !data?.data?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

