// action - state management
import { CLIENT_FOUND, CODEERROR, FETCHED, FETCHING } from './actions';

// ==============================|| AUTH REDUCER ||============================== //

const client = (state, action) => {
  switch (action.type) {
    case CLIENT_FOUND: {
      const client_data = action.payload;
      return {
        ...state,
        data: client_data,
        isLoading: false,
        client_status: 'found',
        error: ''
      };
    }

    case FETCHED: {
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        error: '',
        pagination: action.payload.meta
      };
    }
    case FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    }
    case CODEERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload?.message
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default client;
