import { FETCHED, FETCHING, NEWCREDIT, POSTED, RESEND } from './actions';

const contract = (state, action) => {
  switch (action.type) {
    case FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    }
    case FETCHED: {
      return {
        ...state,
        products: action.payload.data,
        isLoading: false,
        pagination: action.payload.meta,
        error: ''
      };
    }
    case POSTED: {
      return {
        ...state,
        token: action.payload?.data?.sms?.token,
        isLoading: false,
        credit: action.payload?.data?.credit,
        error: ''
      };
    }
    case NEWCREDIT: {
      return {
        ...state,
        isLoading: false,
        credit: action.payload?.data,
        error: ''
      };
    }
    case RESEND: {
      return {
        ...state,
        token: action.payload?.data?.token,
        isLoading: false,
        error: ''
      };
    }
  }
};
export default contract;