// action - state management
import {
  CLIENT_FOUND,
  CODEERROR,
  CODESENDING,
  CODESENT,
  ERROR,
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
} from './actions';

// ==============================|| AUTH REDUCER ||============================== //

const client = (state, action) => {
  switch (action.type) {

    case CHANGEDATAVIAFORM: {
      const client_data = action.payload;
      return {
        ...state,
        data: client_data
      };
    }
    case CLIENT_FOUND: {
      const client_data = action.payload;
      return {
        ...state,
        data: client_data,
        isLoading: false,
        client_status: 'found',
        error: '',
        smsStatus: false
      };
    }
    case SENDSMS: {
      const token = action.payload;

      return {
        ...state,
        token,
        isLoading: false,
        smsStatus: true
      };
    }
    case SENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
        smsStatus: false,
        attr: ''
      };
    }
    case SMSERROR: {
      return {
        ...state,
        isLoading: false,
        smsStatus: false,
        error: action.payload
      };
    }
    case CODESENDING: {
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    }
    case CODESENT: {
      return {
        ...state,
        isLoading: false,
        smsStatus: false,
        error: '',
        attr: ''
      };
    }
    case CODEERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload?.message,
        attr: action.payload?.attribute
      };
    }
    case FETCHED: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: '',
        attr: ''
      };
    }
    case FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: '',
        attr: ''
      };
    }
    case SENDING: {
      return {
        ...state,
        isLoading: true,
        error: '',
        attr: ''
      };
    }
    case POSTED: {
      return {
        ...state,
        isLoading: false,
        error: '',
        attr: ''
      };
    }
    case POSTED_CARD: {
      const { id } = action.payload.card;
      return {
        ...state,
        isLoading: false,
        card_id: id,
        error: '',
        attr: ''
      };
    }

    case FETCH_WORKPLACE: {
      return {
        ...state,
        work_types: action.payload.data,
        isLoading: false,
        error: '',
        attr: ''
      };
    }
    case FETCH_REGIONS: {
      return {
        ...state,
        regions: action.payload.data,
        error: '',
        attr: ''
      };
    }
    case FETCH_DISTRICTS: {
      return {
        ...state,
        districts: action.payload,
        isLoading: false,
        error: '',
        attr: ''
      };
    }

    case CARDFETCH: {
      return {
        ...state,
        cards: action.payload,
        error: '',
        attr: ''
      };
    }
    case ORDERSCUSTOMER: {
      return {
        ...state,
        orders: action.payload,
        error: '',
        attr: ''
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default client;
