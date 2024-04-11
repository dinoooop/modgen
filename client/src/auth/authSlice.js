import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

const authUserFromStorage = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null
const tokenFromStorage = localStorage.getItem('token') ? localStorage.getItem('token') : null
const themeFromStorage = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'

const initialState = {
    user: authUserFromStorage,
    token: tokenFromStorage,
    theme: themeFromStorage,
    error: '',
    loading: false
};

export const register = createAsyncThunk('auth/register', async (data) => {
    try {
        const response = await axios.post(`${config.api}/register`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

export const login = createAsyncThunk('auth/login', async (data) => {
    try {
        const response = await axios.post(`${config.api}/login`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


export const logout = createAsyncThunk('auth/logout', async (data) => {
    try {
        const response = await axios.post(`${config.api}/logout`, data, config.header());
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            console.log(action.payload);
            state.theme = action.payload
            localStorage.setItem('theme', action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
                localStorage.setItem('authUser', JSON.stringify(action.payload.user))
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = false
                state.loading = false
                localStorage.removeItem('authUser')
                localStorage.removeItem('token')
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
                localStorage.setItem('authUser', JSON.stringify(action.payload.user))
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
})
export const { toggleTheme } = authSlice.actions

export default authSlice.reducer