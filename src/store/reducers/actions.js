// action - account reducer
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';

// sms user
export const SENDSMS = '@client/sms';
export const SENDING = '@client/sending';
export const SMSERROR = '@client/error';
export const CODESENDING = '@client/code_sending';
export const CODESENT = '@client/code_sent';
export const CODEERROR = '@client/code_error';
export const RESEND = '@client/resend';

// client fetch
export const CLIENT_FOUND = '@client/found';
export const FETCHING = '@client/fetch';
export const ERROR = '@client/fetch';
export const FETCHED = '@client/fetched';
export const POSTED = '@client/submitted';
export const POSTED_CARD = '@client/post_card';
export const ROLES = '@client/roles';

export const CARDFETCH = '@client/cards';

//client workplace
export const FETCH_WORKPLACE = '@client/fetch_work';
export const FETCH_REGIONS = '@client/region';
export const FETCH_DISTRICTS = '@client/district';

//customer credit
export const ORDERSINGLE = '@client/order_single';
export const ORDERSCUSTOMER = '@client/orders';
export const NEWCREDIT = '@client/new';
export const CHANGEDATAVIAFORM = '@client/mutate';
