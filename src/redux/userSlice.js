import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
    phone: '',
    user: [],
    error: null,
    loading: false,
    orders: [],
    installments: []
};

// export const orderFetchUser = createAsyncThunk('orderFetchUser', async () => {
//     const response = await axiosServices.get(collections.getUserOrders);
//     return response.data;
// });

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},


});

export const {} = userSlice.actions;

export default userSlice.reducer;
