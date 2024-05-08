import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

const initialState = {
    loading: false,
    message: '',
    error: '',
};

export const flush = createAsyncThunk('general/flush', async (data = {}) => {
    try {
        const response = await axios.post(`${config.api}/general/flush`, data, config.header());
        return response.data;
    } catch (error) {
        throw error.response.data.message
    }
});

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            // flush
            .addCase(flush.pending, (state) => {
                state.loading = true;
            })
            .addCase(flush.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(flush.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export default generalSlice.reducer