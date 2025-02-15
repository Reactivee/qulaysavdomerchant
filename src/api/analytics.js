import useSWR from 'swr';
import { fetcher } from '../utils/axios';
import { useMemo } from 'react';
import { generateFilterLink } from '../utils/functions';

export const endpoints = {
  key: '/api',
  daily: '/reports/daily', // server URL,
  products: '/reports/products',
  returned: '/reports/cancels',
};


export const useGetAnalytics = (query) => {
  const link = generateFilterLink(query);

  const {
    data,
    isLoading,
    error,
    isValidating
  } = useSWR(`${endpoints.key + endpoints.daily}?${link}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });

  const memoryReport = useMemo(() => ({
    report: data?.data,
    isLoading,
    error,
    isValidating,
    reportEmpty: !isLoading && !data?.data?.length

  }), [data, isLoading, query]);
  return memoryReport;
};

export const useGetSales = ({ page = 1, filters }) => {
  const link = generateFilterLink(filters);
  const {
    data,
    isLoading,
    error,
    isValidating
  } = useSWR(`${endpoints.key + endpoints.products}?page=${page}&${link}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });
  console.log(filters);
  const memoryReport = useMemo(() => ({
    products: data?.data,
    isLoading,
    error,
    meta: data?.meta,
    isValidating,
    productsEmpty: !isLoading && !data?.data?.length

  }), [data, isLoading, page, filters]);
  return memoryReport;
};

export const useGetReturned = ({ page = 1, filters }) => {
  const link = generateFilterLink(filters);
  const {
    data,
    isLoading,
    error,
    isValidating
  } = useSWR(`${endpoints.key + endpoints.returned}?page=${page}&${link}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });

  const memoryReport = useMemo(() => ({
    products: data?.data,
    isLoading,
    error,
    meta: data?.meta,
    isValidating,
    productsEmpty: !isLoading && !data?.data?.length

  }), [data, isLoading, page, filters]);
  return memoryReport;
};