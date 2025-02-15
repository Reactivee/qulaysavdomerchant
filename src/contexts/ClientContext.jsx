import React, { useContext, useReducer } from 'react';
import reducer from '../store/reducers/client';
import {
  CLIENT_FOUND,
  CODEERROR,
  CODESENDING,
  FETCHED,
  FETCHING,
  FETCH_DISTRICTS,
  FETCH_REGIONS,
  FETCH_WORKPLACE,
  POSTED,
  POSTED_CARD,
  SENDING,
  SENDSMS,
  SMSERROR, CARDFETCH, ORDERSCUSTOMER, CHANGEDATAVIAFORM
} from 'store/reducers/actions';
import axiosServices from 'utils/axios';
import { clearCardNumber, clearPhoneNumber } from 'utils/clearPhone';
import { openSnackbar } from '../api/snackbar';

const initialState = {
  token: '',
  smsStatus: false,
  error: '',
  code: '',
  isLoading: false,
  attr: '',
  data: [],
  client_status: '',
  work_type: [],
  regions: [],
  districts: [],
  card_id: '',
  cards: [],
  orders: [],
  relatives: [{ id: '', phone: '', relative_type_id: '', full_name: '' }]
};

const ClientContext = React.createContext();

export const CLientProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // send sms to client
  const sendSmsToClient = async (data) => {
    const clearPhone = clearPhoneNumber(data?.phone);
    const { passport } = data;
    dispatch({ type: SENDING, payload: data });
    try {
      const response = await axiosServices.post('/api/clients/search', {
        passport_serial: passport,
        phone: clearPhone
      });

      const res = response.data;

      if (res.data.token) {
        // iNotify('success', "Jo'natildi");
        dispatch({ type: SENDSMS, payload: res.data.token });
      } else {
        dispatch({ type: CLIENT_FOUND, payload: res.data });
      }
      return res;
    } catch (error) {
      // iNotify('error', 'Xatolik');
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error?.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      dispatch({ type: SMSERROR, payload: error.message });
    }
  };

  //
  const sendCodeAccept = async (data) => {
    dispatch({ type: CODESENDING });
    try {
      const response = await axiosServices.post('/api/clients/confirm', { token: state.token, code: data.code });
      const res = response.data.data;
      // iNotify('success', "Jo'natildi");
      dispatch({ type: CLIENT_FOUND, payload: res });
      return res;

    } catch (error) {
      // iNotify('error', 'Xatolik');
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error?.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      dispatch({ type: CODEERROR, payload: error });
      return error;
    }
  };

  // if any error
  const reSendCodeAccept = async () => {
    dispatch({ type: SENDING });
    try {
      const response = await axiosServices.post('/api/clients/resend', { token: state.token });
      const res = response.data;

      dispatch({ type: SENDSMS, payload: res.data.token });
      return res;
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
      // iNotify('error', 'Xatolik');
      dispatch({ type: SMSERROR, payload: error });
      return error;
    }
  };

  const getClientList = async ({ currentPage = 1, globalFilter = '', sortDate, activeTab = '' }) => {

    dispatch({ type: FETCHING });
    try {
      const response = await axiosServices.get(`/api/clients?page=${currentPage}&status=${activeTab}&search=${globalFilter ? String(globalFilter) : ''}&start_date=${sortDate?.start_date}&end_date=${sortDate?.end_date}`);
      const data = response.data;
      dispatch({ type: FETCHED, payload: data });
      return data;
    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Xatolil' + error.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      dispatch({ type: CODEERROR, payload: error });
    }
  };

  const renderClientInfo = (id) => {
    console.log(id);
  };

  const getClientSingle = async (id) => {

    const response = await axiosServices.get(`/api/clients/${id}`, {});
    const res = response.data;
    if (res && res.data) {
      dispatch({ type: FETCHED, payload: res?.data });
    }
    return res;

  };

  // send client contact data
  const sendClientContactRelatives = async (data, id) => {
    try {
      const response = await axiosServices.post(`/api/clients/add-guarantor/${id}`, data);
      const res = response.data;
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Yuklandi',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      // iNotify('success', res.message ?? 'Jo\'natildi');
      dispatch({ type: POSTED, payload: res });
      return res;
    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Xatolik ' || error?.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });

      // iNotify('error', error.message ?? 'Xatolik');
      dispatch({ type: CODEERROR, payload: error?.message });
    }
  };

  // send client contact data
  const attachClientCard = async (form) => {

    const { card_number, expire_date } = form;

    const clearCard = clearCardNumber(card_number);
    const id = state.data.id;
    try {
      const response = await axiosServices.post(`/api/cards/add/${id}`, { card_number: clearCard, expire_date });
      const res = response.data.data;

      dispatch({ type: POSTED_CARD, payload: res });
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'This is an top-center message!',
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
        message: error?.message?.message || 'Xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      // iNotify('error', error.message ?? 'Xatolik');
      dispatch({ type: CODEERROR, payload: 'error' });
    }
  };

  // send client contact data
  const confirmClientCard = async (form) => {

    const { code_card } = form;
    const card_id = state.card_id;
    try {
      const response = await axiosServices.post(`/api/cards/confirm`, {
        otp: code_card,
        card_id: card_id
      });
      const res = response.data;
      dispatch({ type: POSTED });
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Karta muvaffaqiyatli qo\'shildi' || res?.data?.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      // iNotify('success', res.message ?? 'Jo\'natildi');
    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error?.message?.message || 'Xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      // iNotify('error', error.message ?? 'Jo\'natildi');
      dispatch({ type: CODEERROR, payload: 'error' });
    }
  };

  // send client passport data
  const sendPassData = async ({ form, id }) => {

    const response = await axiosServices.put(`/api/clients/${id}`, form);
    const res = response.data;
    // dispatch({ type: POSTED, payload: res });
    return res;
    // iNotify('success', res.message ?? 'Jo\'natildi');

  };

  const flyClientDocPhotos = async (data, key) => {
    const id = state.data.id;

    // dispatch({ type: SENDING });
    const formData = new FormData();
    data.forEach((file) => {
      switch (key) {
        case 'front':
          formData.append('front_photo', file);
          break;

        case 'back':
          formData.append('back_photo', file);
          break;

        case 'address_photo':
          formData.append('address_photo', file);
          break;

        case 'selfie':
          formData.append('selfie', file);
          break;
        default:
          formData.append('front_photo', file);
          break;
      }
    });

    try {
      let response = await axiosServices.post(`/api/clients/photos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      dispatch({ type: POSTED, payload: response });
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Rasm yuklandi',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      return response.data;
      // iNotify('success', response.message ?? 'Jo\'natildi');
    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error.message || 'Rasm yuklashda xatolik ',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      return error;
    }

  };

  const getWorkPlace = async () => {

    try {
      let response = await axiosServices.get(`/api/clients/fields`);
      dispatch({ type: FETCH_WORKPLACE, payload: response.data });
    } catch (error) {

      dispatch({ type: CODEERROR, payload: error.message });
    }
  };

  const getRegions = async () => {

    try {
      let response = await axiosServices.get(`/api/regions`);
      dispatch({ type: FETCH_REGIONS, payload: response.data });
    } catch (error) {
      dispatch({ type: CODEERROR, payload: error.message });
    }
  };
  const getDistricts = async (id) => {

    try {
      let response = await axiosServices.get(`/api/regions/district/${id}`);

      dispatch({ type: FETCH_DISTRICTS, payload: response.data.data });
    } catch (error) {

      dispatch({ type: CODEERROR, payload: error.message });
    }
  };

  // send client private
  const sendPrivateDate = async (form, id) => {
    const { placement, type_field } = form;
    const postData = {
      field_id: type_field,
      position: placement
    };
    const response = await axiosServices.put(`/api/clients/personal-data/${id}`, postData);
    return response.data;

  };

  // send client private
  const sendToScoring = async (id) => {
    try {
      const response = await axiosServices.post(`/api/clients/scoring/${id}`);
      const res = response.data;
      dispatch({ type: FETCHED, payload: res?.data?.client });
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Yuborildi!',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });

      // dispatch({ type: CODEERROR, payload: error?.message });
    }
  };
  const getCardListClient = async (id) => {
    try {
      const response = await axiosServices.get(`/api/cards/${id}`);
      const res = response.data;
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Yuklandi!',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      dispatch({ type: CARDFETCH, payload: res.data });
    } catch (error) {
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: error.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });

      dispatch({ type: CODEERROR, payload: error?.message });
    }
  };

  const getTypeRelatives = async () => {
    try {
      const response = await axiosServices.get(`/api/clients/relative-types`);
      const res = response.data;

      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: 'Yuklandi!',
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
        message: error.message || 'Yuklashda xatolik',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
    }
  };

  const getClientStatusInfo = async () => {
    const response = await axiosServices.get(`/api/clients/info`);
    return response.data;
  };

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

  const searchClientByPhone = async (phone) => {
    const response = await axiosServices.post(`/api/clients/search-by-phone`, { 'phone': phone });
    return response.data;
  };

  const mutateClientData = (data) => {
    dispatch({ type: CHANGEDATAVIAFORM, payload: data });
  };

  const deleteDocumentPhoto = async (id) => {
    const response = await axiosServices.delete(`/api/clients/photos/${id}`);
    return response.data;
  };

  return (
    <ClientContext.Provider
      value={{
        ...state,
        sendClientContactRelatives,
        getClientSingle,
        sendSmsToClient,
        sendCodeAccept,
        reSendCodeAccept,
        getClientList,
        renderClientInfo,
        attachClientCard,
        sendPassData,
        getWorkPlace,
        flyClientDocPhotos,
        getRegions,
        getDistricts,
        sendPrivateDate,
        confirmClientCard,
        sendToScoring,
        getCardListClient,
        getTypeRelatives,
        getClientStatusInfo,
        getClientOrders,
        searchClientByPhone,
        mutateClientData,
        deleteDocumentPhoto
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

// make sure use
export const useClientContext = () => {
  return useContext(ClientContext);
};
