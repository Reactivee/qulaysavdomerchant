import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosServices from '../utils/axios';
import {collections} from '../utils/collections';
import {iNotify} from "../hooks/useMessage.js";

const initialState = {
    token: localStorage.getItem('serviceToken') || null,
    phone: '',
    otp: '',
    status: 'idle',
    error: null,
    isOtp: false,
    isLogged: false,
    open: false,
    user: {},
    is_identified: ''
};

export const loginFetch = createAsyncThunk('signIn', async (data) => {
    const {phone} = data
    const pCode = '998'
    const postData = {'phone': `${pCode}${phone}`}
    const response = await axiosServices.post(collections.signIn, postData);
    return response.data;
});
export const viaOtpVerification = createAsyncThunk('otp', async (data) => {
    const response = await axiosServices.post(collections.otp, data);
    return response.data;
});

export const fetchUser = createAsyncThunk('fetchUser', async () => {
    const response = await axiosServices.get(collections.userInfo);
    return response.data;
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('serviceToken');
            state.token = null;
            state.user = null;
            state.isLogged = false
        },
        login: (state, action) => {
            state.isLogged = true
            state.is_identified = state.user?.is_identified

        },
        backToPhone: (state, action) => {
            state.isOtp = false
            state.error = ''
            state.loading = false
        },
        handleOpenClose: (state, {payload}) => {

            state.open = payload
        }

    },

    extraReducers: (builder) => {
        builder
            // send sms to phone
            .addCase(loginFetch.pending, (state) => {
                state.isSubmitting = true;
                state.loading = true;
            })
            .addCase(loginFetch.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.phone = action.payload.phone;
                state.isOtp = true;
                state.loading = false;
                // state.user = jwtDecode(action.payload.token);
            })
            .addCase(loginFetch.rejected, (state, action) => {
                state.error = action.error.message;
                state.isSubmitting = false;
                state.loading = false;

            })
            // verification otp
            .addCase(viaOtpVerification.pending, (state) => {
                state.isSubmitting = true;
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(viaOtpVerification.fulfilled, (state, action) => {
                state.status = 'auth';
                state.token = action.payload.data.token;
                state.user = action.payload.data;
                state.isOtp = false;
                state.loading = false;

            })
            .addCase(viaOtpVerification.rejected, (state, action) => {
                state.error = "SMS xato kiritildi";
                state.loading = false;
                iNotify('error', action.error.message)
            })
            .addCase(fetchUser.pending, (state) => {
                state.error = "";

            })
            .addCase(fetchUser.fulfilled, (state, {payload}) => {
                state.user = payload.data;
                state.is_identified = payload.data?.is_identified;

                // state.user = jwtDecode(action.payload.token);
            })
            .addCase(fetchUser.rejected, (state, {error}) => {
                state.error = error.message;
            })

    }
});

export const {logout, handleOpenClose, backToPhone, login} = authSlice.actions;

export default authSlice.reducer;
