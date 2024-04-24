import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

const initialState = {
    posts: [],
    post: {},
    loading: false,
    // pagination
    perPage: 0,
    total: 0,
};

export const index = createAsyncThunk('post/index', async (data = {}) => {
    try {
        const response = await axios.get(`${config.api}/posts`, {
            params: data,
            headers: config.header().headers,
          });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
});

export const show = createAsyncThunk('post/show', async (id) => {
    try {
        const response = await axios.get(`${config.api}/posts/${id}`, config.header());
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
});

export const store = createAsyncThunk('post/store', async (post) => {
    try {
        const response = await axios.post(`${config.api}/posts`, post, config.header());
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
});

export const update = createAsyncThunk('post/update', async (post) => {
    try {
        const response = await axios.put(`${config.api}/posts/${post.id}`, post, config.header());
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
});

export const destroy = createAsyncThunk('post/destroy', async (post) => {
    try {
        const response = await axios.delete(`${config.api}/posts/${post.id}`, config.header());
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        remove: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(index.fulfilled, (state, action) => {
                state.posts = action.payload.data;
                state.perPage = action.payload.per_page;
                state.total = action.payload.total;
                state.loading = false;
            })
            
            .addCase(show.fulfilled, (state, action) => {
                state.post = action.payload;
                state.loading = false;
            })

            // Store
            .addCase(store.pending, (state) => {
                state.loading = true;
            })
            .addCase(store.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
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
                state.post = action.payload
            })
            .addCase(update.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            });
    },
})

export const { remove } = postSlice.actions

export default postSlice.reducer