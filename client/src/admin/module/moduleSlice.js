import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';
import download from 'downloadjs';

const initialState = {
    modules: [],
    module: {},
    loading: false,
    // pagination
    perPage: 0,
    total: 0,
};

export const index = createAsyncThunk('module/index', async (data = {}) => {
    try {
        const response = await axios.get(`${config.api}/modules`, {
            params: data,
            headers: config.header().headers,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const show = createAsyncThunk('module/show', async (id) => {
    try {
        const response = await axios.get(`${config.api}/modules/${id}`, config.header());
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const store = createAsyncThunk('module/store', async (formData) => {
    try {
        const response = await axios.post(`${config.api}/modules`, formData, config.formdataheader());
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
});

export const update = createAsyncThunk('module/update', async (formData) => {

    if (typeof formData.id === 'undefined') {
        // a file upload // use POST
        const id = formData.get('id');
        try {
            const response = await axios.post(`${config.api}/modules/${id}`, formData, config.formdataheader());
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message)
        }

    } else {
        // Normal data update using PUT
        const id = formData.id;
        try {
            const response = await axios.put(`${config.api}/modules/${id}`, formData, config.header());
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }
});

export const destroy = createAsyncThunk('module/destroy', async (module) => {
    try {
        const response = await axios.delete(`${config.api}/modules/${module.id}`, config.header());
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const generate = createAsyncThunk('module/generate', async (data) => {
    try {
        const response = await axios.post(`${config.api}/generate/${data.id}`, data, config.blobheader())
        if (response.data instanceof Blob) {
            const fileName = data.red.replace(" ", "_") + ".zip"
            download(response.data, fileName, response.headers['content-type'])
            return { success: true }
        } else {
            console.log("not instanceof Blob");
        }
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
});

export const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        remove: (state, action) => {
            state.modules = state.modules.filter(module => module.id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(index.fulfilled, (state, action) => {
                state.modules = action.payload.data
                state.perPage = action.payload.per_page
                state.total = action.payload.total
                state.loading = false
            })
            .addCase(show.fulfilled, (state, action) => {
                state.loading = false
                state.module = action.payload
            })

            // Store
            .addCase(store.pending, (state) => {
                state.loading = true
            })
            .addCase(store.fulfilled, (state, action) => {
                state.loading = false
                state.module = action.payload
            })
            .addCase(store.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // update
            .addCase(update.pending, (state) => {
                state.loading = true
            })
            .addCase(update.fulfilled, (state, action) => {
                state.loading = false
                state.module = action.payload
            })
            .addCase(update.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            });
    },
})

export const { remove } = moduleSlice.actions

export default moduleSlice.reducer