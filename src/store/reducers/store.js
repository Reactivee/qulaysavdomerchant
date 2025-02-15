import { CODEERROR, FETCHED, FETCHING, NEWCREDIT, POSTED, RESEND, ROLES } from './actions';

const contract = (state, action) => {
  switch (action.type) {
    case FETCHING: {
      return {
        ...state,
        data: [],
        pagination: [],
        role: [],
        isLoading: true,
        error: ''
      };
    }

    case FETCHED: {
      return {
        ...state,
        data: action.payload?.data,
        pagination: action.payload?.meta,
        isLoading: false,
        error: ''
      };
    }
    case ROLES: {
      return {
        ...state,
        role: action.payload?.data,
        pagination: action.payload?.meta,
        isLoading: false,
        error: ''
      };
    }

    case CODEERROR: {
      return {
        ...state,
        isLoading: false,
        error: ''
      };
    }

  }
};
export default contract;