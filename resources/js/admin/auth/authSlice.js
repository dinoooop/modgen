import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

const authUserFromStorage = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null
const tokenFromStorage = localStorage.getItem('token') ? localStorage.getItem('token') : null
const themeFromStorage = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'

const initialState = {
    user: authUserFromStorage,
    token: tokenFromStorage,
    theme: themeFromStorage,
    loading: false,
    error: '',
    success: ''
};

// When try to visit a protected page
export const check = createAsyncThunk('auth/check', async (data = {}) => {
    try {
        const response = await axios.get(`${config.api}/auth/check`, {
            params: data,
            headers: config.header().headers,
        });
        const user = response.data?.user
        const currentURL = window.location.href;
        if (user.is_verified) {
            if (currentURL.indexOf("/login") !== -1) {
                window.location.href = '/admin/modules'
            }
            return response.data;
        } else {
            // user is authenticated but not verified always redirect to verify page
            if (currentURL.indexOf("/verify/") === -1) {
                window.location.href = '/verify/' + user.process_link
            }
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authUser')
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
    }
});


export const login = createAsyncThunk('auth/login', async (data) => {
    try {
        const response = await axios.post(`${config.api}/auth/login`, data);
        return response.data;
    } catch (error) {
        // throw new Error(error.response.data.message);
        throw error.response.data.message

    }
});




export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const response = await axios.post(`${config.api}/auth/logout`, null, config.header());
        return response.data;
    } catch (error) {
        throw error.response.data.message
    }
});

export const register = createAsyncThunk('auth/register', async (data) => {
    try {
        const response = await axios.post(`${config.api}/auth/register`, data);
        return response.data;
    } catch (error) {
        throw error.response.data.message
    }
});

export const show = createAsyncThunk('auth/show', async () => {
    try {
        const response = await axios.get(`${config.api}/auth`, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const update = createAsyncThunk('auth/update', async (data) => {
    try {
        const response = await axios.post(`${config.api}/auth`, data, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const security = createAsyncThunk('auth/security', async (data) => {
    try {
        const response = await axios.post(`${config.api}/auth/security`, data, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const verify = createAsyncThunk('auth/verify', async (data) => {
    try {
        const response = await axios.post(`${config.api}/auth/verify`, data, config.formdataheader());
        return response.data;
    } catch (error) {
        throw error.response.data.message
    }
});

export const resendVerify = createAsyncThunk('auth/resend-verify', async () => {
    try {
        const response = await axios.get(`${config.api}/auth/resend-verify`, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})
export const forgotPassword = createAsyncThunk('auth/forgot-password', async (data) => {
    try {
        const response = await axios.post(`${config.api}/auth/forgot-password`, data)
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const resetPassword = createAsyncThunk('auth/reset-password', async (data) => {
    try {
        const response = await axios.post(`${config.api}/auth/reset-password`, data)
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = action.payload
            localStorage.setItem('theme', action.payload)
        },
        reset: (state, action) => {
            state.error = ''
            state.success = ''
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.loading = false
                localStorage.setItem('authUser', JSON.stringify(action.payload.user))
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // logout
            .addCase(logout.pending, (state) => {
                state.loading = true
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
            // Show
            .addCase(show.pending, (state) => {
                state.loading = true;
            })
            .addCase(show.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(show.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update
            .addCase(update.pending, (state) => {
                state.loading = true
            })
            .addCase(update.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.success = action.payload.message ?? ''
                localStorage.setItem('authUser', JSON.stringify(action.payload.user))
            })
            .addCase(update.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // security
            .addCase(security.pending, (state) => {
                state.loading = true
            })
            .addCase(security.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.success = action.payload.message ?? ''
            })
            .addCase(security.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // verify
            .addCase(verify.pending, (state) => {
                state.loading = true
            })
            .addCase(verify.fulfilled, (state, action) => {
                console.log("verify fullfilled");
                console.log(action.payload);
                state.loading = false
                state.error = ''
                localStorage.setItem('authUser', JSON.stringify(action.payload.user))
            })
            .addCase(verify.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Resend verfification mail
            .addCase(resendVerify.pending, (state) => {
                state.loading = true
            })
            .addCase(resendVerify.fulfilled, (state, action) => {
                state.loading = false
                state.success = action.payload.message
            })
            .addCase(resendVerify.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Forgot password
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false
                state.success = action.payload.message
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Reset password
            .addCase(resetPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})
export const { toggleTheme, reset } = authSlice.actions

export default authSlice.reducer