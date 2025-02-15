import React, { useContext, useReducer } from 'react';
import reducer from '../store/reducers/contract';
import {
  FETCHED,
  FETCHING, NEWCREDIT, POSTED, RESEND
} from 'store/reducers/actions';
import axiosServices from 'utils/axios';
import { openSnackbar } from '../api/snackbar';

const initialState = {
  products: [],
  contract: [],
  error: '',
  isLoading: false,
  pagination: [],
  token: '',
  credit: ''
};

const ContractContext = React.createContext();
export const ContractProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // get credits
  const getProducts = async (currentPage = 1, name) => {

    dispatch({ type: FETCHING });
    try {
      const response = await axiosServices.get(`/api/products?search=${name}&page=${currentPage}`);
      const res = response?.data;
      dispatch({ type: FETCHED, payload: res });

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
    }
  };
  // get credits
  const sendCustomerContactDetail = async (data) => {
    try {
      const response = await axiosServices.post(`/api/credits`, data);
      const res = response?.data;
      // dispatch({ type: POSTED, payload: res });
      dispatch({ type: NEWCREDIT, payload: res });

      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Mijoz raqamiga SMS yuborildi',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      return res;
    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error?.message || 'Ma\'lumot uzatishda xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      return error;
    }

  };
  // confirmation
  const confirmationWithOtpCredit = async ({ creditId, upComingDate }) => {
    try {
      const { data } = await axiosServices.post(`/api/credits/confirm/${creditId}`, upComingDate);
      dispatch({ type: NEWCREDIT, payload: data });
      return data;
    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error.message || 'Serverda xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      return error;
    }
  };
  // reSend
  const reSendConfirmationWithOtpCredit = async (token) => {
    try {
      const response = await axiosServices.post(`/api/credits/resend`, { 'token': token });
      dispatch({ type: RESEND, payload: response?.data });

      return response?.data;
    } catch (error) {
      return error;
    }
  };
  // first payment
  const payFirstPayment = async ({ creditId, cardId, paymentDetail }) => {
    try {
      const { data } = await axiosServices.post(`/api/credits/first-payment/${creditId}`, paymentDetail);
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Shartnoma yaratildi',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      dispatch({ type: POSTED, payload: data });

      return data;
    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error?.errors?.message || 'Ma\'lumot uzatishda xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      return error;
    }
  };


  return (
    <ContractContext.Provider
      value={{
        ...state,
        getProducts,
        sendCustomerContactDetail,
        confirmationWithOtpCredit,
        reSendConfirmationWithOtpCredit,
        payFirstPayment
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

// make sure use
export const useContractContext = () => {
  return useContext(ContractContext);
};
