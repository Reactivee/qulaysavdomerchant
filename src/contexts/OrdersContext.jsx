import React, { useContext, useReducer } from 'react';
import reducer from '../store/reducers/orders';
import {
  CODEERROR,
  FETCHING, ORDERSCUSTOMER, ORDERSINGLE, POSTED

} from 'store/reducers/actions';
import axiosServices from 'utils/axios';
import { openSnackbar } from '../api/snackbar';

const initialState = {
  token: '',
  orders: [],
  error: '',
  isLoading: false,
  customer_order: '',
  customers_order: []
};

const OrdersContext = React.createContext();
export const OrdersProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const getClientOrders = async (id) => {
    try {
      const response = await axiosServices.get(`/api/credits/client/${id}`);

      dispatch({ type: ORDERSCUSTOMER, payload: response?.data?.data });

    } catch (error) {
      console.log(error);
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Yuklashda xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
    }
  };

  // get credits
  const getInstallmentOrders = async ({ currentPage = 1, activeTab, globalFilter, sortDate }) => {

    dispatch({ type: FETCHING });
    try {

      const response = await axiosServices.get(`/api/credits?page=${currentPage}&status=${activeTab}&search=${globalFilter}&start_date=${sortDate.start_date}&end_date=${sortDate.end_date}`);
      const res = response?.data;
      dispatch({ type: POSTED, payload: res });
      return res;

    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error?.message || 'Xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      dispatch({ type: CODEERROR });

    }
  };

  // get single credit of user
  const getInstallmentOrderSingleCustomer = async (id) => {

    dispatch({ type: FETCHING });
    try {
      const response = await axiosServices.get(`/api/credits/${id}`);

      const res = response?.data;
      dispatch({ type: ORDERSINGLE, payload: res?.data });

      return res;
    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error?.message || 'Xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      dispatch({ type: CODEERROR });

    }
  };

  // get  credits of user
  const getInstallmentOrderCustomer = async (id) => {

    dispatch({ type: FETCHING });
    try {
      const response = await axiosServices.get(`/api/orders/client/${id}`);

      const res = response?.data;
      dispatch({ type: ORDERSCUSTOMER, payload: res?.data });

    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error?.message || 'Xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
    }
  };
  // get  credits of user
  const getInstallmentContract = async (id) => {

    try {
      const { data } = await axiosServices.get(`/api/credits/contract/${id}`, {
        responseType: 'blob' // Important: Set responseType to "blob"
      });
      return data;

    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error?.message || 'Xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
    }
  };

  // get  return reason
  const getReturnReason = async () => {
    const data = await axiosServices.get(`/api/credits/reasons`);
    return data;
  };

  // post return products
  const postReturnProducts = async ({ id, rejectData }) => {
    const data = await axiosServices.post(`/api/credits/cancel/${id}`, rejectData);
    return data;
  };

  // confirm return products
  const confirmReturnProducts = async ({ id, confirmData }) => {
    const response = await axiosServices.post(`/api/credits/confirm-cancel/${confirmData.id}`, confirmData);
    return response;
  };
  const reSendConfirmReturnProducts = async (token) => {
    const response = await axiosServices.post(`/api/credits/resend`, { 'token': token });
    return response;
  };

  const getCreditsStatusInfo = async () => {
    const response = await axiosServices.get(`/api/credits/info`);
    return response.data;
  };

  return (
    <OrdersContext.Provider
      value={{
        ...state,
        getInstallmentOrders,
        getInstallmentOrderSingleCustomer,
        getInstallmentOrderCustomer,
        getInstallmentContract,
        getReturnReason,
        postReturnProducts,
        confirmReturnProducts,
        reSendConfirmReturnProducts,
        getCreditsStatusInfo
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// make sure use
export const useOrdersContext = () => {
  return useContext(OrdersContext);
};
