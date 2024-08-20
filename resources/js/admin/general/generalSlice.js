import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

const stockFromStorage = localStorage.getItem('stock') ? JSON.parse(localStorage.getItem('stock')) : null

const initialState = {
    loading: false,
    message: '',
    error: '',
    stock: stockFromStorage,
};

export const flush = createAsyncThunk('general/flush', async (data = {}) => {
    try {
        const response = await axios.post(`${config.api}/general/flush`, data, config.header());
        return response.data;
    } catch (error) {
        throw error.response.data.message
    }
});

export const getStock = createAsyncThunk('general/stock', async () => {
    try {
        const response = await axios.get(`${config.api}/general/stock`, config.header());
        return response.data;
    } catch (error) {
        throw error.response.data.message
    }
});

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.error = ''
            state.success = ''
        },
    },
    extraReducers: (builder) => {
        builder
            // flush
            .addCase(flush.pending, (state) => {
                state.loading = true;
            })
            .addCase(flush.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
            })
            .addCase(flush.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // stock
            .addCase(getStock.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStock.fulfilled, (state, action) => {
                state.loading = false;
                state.stock = action.payload;
                localStorage.setItem('stock', JSON.stringify(action.payload))
            })
            .addCase(getStock.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { reset } = generalSlice.actions

export default generalSlice.reducer