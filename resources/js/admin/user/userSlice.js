import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../../config'

const initialState = {
    items: [],
    item: {},
    perPage: 0,
    total: 0,
    loading: false,
    success: '',
    error: '',
}

export const index = createAsyncThunk('user/index', async (data = {}) => {
    try {
        const response = await axios.get(`${config.api}/users`, {
            params: data,
            headers: config.header().headers,
        })
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const show = createAsyncThunk('user/show', async (id) => {
    try {
        const response = await axios.get(`${config.api}/users/${id}`, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const store = createAsyncThunk('user/store', async (data) => {
    try {
        const response = await axios.post(`${config.api}/users`, data, config.formdataheader())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const update = createAsyncThunk('user/update', async (data) => {
    try {
        const response = await axios.put(`${config.api}/users/${data.id}`, data, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const destroy = createAsyncThunk('user/destroy', async (data) => {
    try {
        const response = await axios.delete(`${config.api}/users/${data.id}`, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        remove: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },
        reset: (state, action) => {
            state.error = ''
            state.success = ''
        },
    },
    extraReducers: (builder) => {
        builder
            // index
            .addCase(index.pending, (state) => {
                state.loading = true
            })
            .addCase(index.fulfilled, (state, action) => {
                state.items = action.payload.data
                state.perPage = action.payload.per_page
                state.total = action.payload.total
                state.loading = false
            })
            .addCase(index.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // show
            .addCase(show.pending, (state) => {
                state.loading = true
                state.success = ''
                state.error = ''
            })
            .addCase(show.fulfilled, (state, action) => {
                state.loading = false
                state.item = action.payload
            })
            .addCase(show.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // Store
            .addCase(store.pending, (state) => {
                state.loading = true
            })
            .addCase(store.fulfilled, (state, action) => {
                state.loading = false
                state.item = action.payload
                state.error = ''
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
                state.error = ''
                state.success = action.payload.message ?? ''
            })
            .addCase(update.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // destroy
            .addCase(destroy.pending, (state) => {
                state.loading = true
            })
            .addCase(destroy.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(destroy.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { remove, reset } = userSlice.actions

export default userSlice.reducer