import React, { useContext, useReducer } from 'react';
import reducer from '../store/reducers/store';
import {
  CODEERROR,
  FETCHED, FETCHING, ROLES
} from 'store/reducers/actions';
import axiosServices from 'utils/axios';
import { openSnackbar } from '../api/snackbar';

const initialState = {
  store: [],
  isLoading: false,
  error: null,
  data: [],
  pagination: [],
  role: []

};

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // add merchant
  const addMerchantToStore = async (values) => {
    try {
      const { data } = await axiosServices.post(`/api/users`, values);
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Muvaffaqiyatli saqlandi',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });

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

  // first payment
  const updateMerchantToStore = async ({ values, id }) => {
    try {
      const { data } = await axiosServices.put(`/api/users/${id}`, values);
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Muvaffaqiyatli saqlandi',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      // dispatch({ type: POSTED, payload: data });
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

  const fetchRoles = async () => {
    try {
      const { data } = await axiosServices.get('/api/users/roles');
      dispatch({ type: ROLES, payload: data });

    } catch (e) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: e?.errors?.message || 'Ma\'lumot olishda xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
    }
  };

  const fetchMerchants = async ({ currentPage }) => {
    dispatch({ type: FETCHING });
    try {
      const { data } = await axiosServices.get(`/api/users?page=${currentPage}`);
      dispatch({ type: FETCHED, payload: data });
    } catch (e) {
      dispatch({ type: CODEERROR });
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: e?.errors?.message || 'Ma\'lumot olishda xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
    }
  };

  const fetchSingleMerchant = async ({ id }) => {
    dispatch({ type: FETCHING });
    try {
      const { data } = await axiosServices.get(`/api/users/${id}`);
      dispatch({ type: FETCHED, payload: data });
      return data;
    } catch (e) {
      dispatch({ type: CODEERROR });
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: e?.errors?.message || 'Ma\'lumot olishda xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      return e;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        ...state,
        addMerchantToStore,
        fetchRoles,
        fetchMerchants,
        fetchSingleMerchant, updateMerchantToStore
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// make sure use
export const useStoreContext = () => {
  return useContext(StoreContext);
};
