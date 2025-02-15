// action - state management
import {
  FETCHING, ORDERSINGLE, POSTED, ORDERSCUSTOMER, CODEERROR
} from './actions';

// ==============================|| AUTH REDUCER ||============================== //

const orders = (state, action) => {
  switch (action.type) {
    case POSTED: {
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
        error: ''
      };
    }
    case ORDERSINGLE: {
      return {
        ...state,
        customer_order: action.payload,
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
        smsStatus: false,
        attr: ''
      };
    }
    case ORDERSCUSTOMER: {
      return {
        ...state,
        isLoading: false,
        error: '',
        smsStatus: false,
        customers_order: action.payload
      };
    }
    case CODEERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Server Error'

      };
    }


    default: {
      return { ...state };
    }
  }
};

export default orders;
