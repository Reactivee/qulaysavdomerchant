import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import { fetcher } from 'utils/axios';
import { setDateTomorrow } from '../utils/functions';


const initialState = {
  modal: false
};

export const endpoints = {
  key: '/api',
  list: `/clients?page=`, // server URL
  orders: `/credits?page=`, // server URL
  startEndDate: `&start_date=${new Date().toLocaleDateString()}&end_date=${setDateTomorrow()}`
};


export function useGetTodayCustomers(page) {
  const {
    data,
    isLoading,
    error,
    isValidating
  } = useSWR(endpoints.key + endpoints.list + page + endpoints.startEndDate, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      customers: data?.data,
      meta: data?.meta,
      customersLoading: isLoading,
      customersError: error,
      customersValidating: isValidating,
      customersEmpty: !isLoading && !data?.customers?.length
    }),
    [data, error, isLoading, isValidating, page]
  );

  return memoizedValue;
}

export function useGetTodayCustomerOrders(page) {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.orders + page+ endpoints.startEndDate, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });

  const memoizedValue = useMemo(
    () => ({
      orders: data?.data,
      meta: data?.meta,
      isLoading,
      error,
      isValidating,
      empty: !isLoading && !data?.data?.length
    }),
    [data, error, isLoading, isValidating, page]
  );

  return memoizedValue;
}


export async function handlePageChange(page) {

  // to update local state based on key
  mutate(
    `${endpoints.key} + ${endpoints.list}?page=${page}`
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newCustomer };
  //   await axios.post(endpoints.key + endpoints.insert, data);
}

export async function insertCustomer(newCustomer) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer) => {
      newCustomer.id = currentCustomer.invoice.length + 1;
      const addedCustomer = [...currentCustomer.invoice, newCustomer];

      return {
        ...currentCustomer,
        customers: addedCustomer
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newCustomer };
  //   await axios.post(endpoints.key + endpoints.insert, data);
}

export async function updateCustomer(customerId, updatedCustomer) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer) => {
      const newCustomer = currentCustomer.invoice.map((customer) =>
        customer.id === customerId ? { ...customer, ...updatedCustomer } : customer
      );

      return {
        ...currentCustomer,
        customers: newCustomer
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { list: updatedCustomer };
  //   await axios.post(endpoints.key + endpoints.update, data);
}

export async function deleteCustomer(customerId) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer) => {
      const nonDeletedCustomer = currentCustomer.invoice.filter((customer) => customer.id !== customerId);

      return {
        ...currentCustomer,
        customers: nonDeletedCustomer
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { customerId };
  //   await axios.post(endpoints.key + endpoints.delete, data);
}

export function useGetCustomerMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.modal, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      customerMaster: data,
      customerMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerCustomerDialog(modal) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.modal,
    (currentCustomermaster) => {
      return { ...currentCustomermaster, modal };
    },
    false
  );
}
