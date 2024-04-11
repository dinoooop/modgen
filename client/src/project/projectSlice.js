import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

const initialState = {
    projects: [],
    project: {},
    loading: false
};

export const index = createAsyncThunk('project/index', async (data = {}) => {
    try {
        const response = await axios.get(`${config.api}/projects`, {
            params: data,
            headers: config.header(),
          });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const show = createAsyncThunk('project/show', async (id) => {
    try {
        const response = await axios.get(`${config.api}/projects/${id}`, config.header());
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const destroy = createAsyncThunk('project/destroy', async (project) => {
    try {
        const response = await axios.delete(`${config.api}/projects/${project.id}`, config.header());
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const update = createAsyncThunk('project/updateProject', async (project) => {
    try {
        const response = await axios.put(`${config.api}/projects/${project.id}`, project, config.header());
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const store = createAsyncThunk('project/store', async (project) => {
    try {
        const response = await axios.post(`${config.api}/projects`, project, config.header());
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        remove: (state, action) => {
            state.projects = state.projects.filter(project => project.id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(index.pending, (state) => {
                state.loading = true;
            })
            .addCase(index.fulfilled, (state, action) => {
                state.projects = action.payload;
                state.loading = false;
            })
            .addCase(index.rejected, (state, action) => {
                console.error('Error fetching projects:', action.error);
                state.loading = false;
            })

            .addCase(show.pending, (state) => {
                state.loading = true;
            })
            .addCase(show.fulfilled, (state, action) => {
                state.project = action.payload;
                state.loading = false;
            })
            .addCase(show.rejected, (state, action) => {
                console.error('Error fetching project:', action.error);
                state.loading = false;
            });
    },
})

export const { remove } = projectSlice.actions

export default projectSlice.reducer