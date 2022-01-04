import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const login = createAsyncThunk(
    'auth/login',
    async function (payload, { rejectWithValue }) {
        try {
            const { data } = await axios.post('/api/v1/users/login', payload)
            return data.token
        } catch (e) {
            const message = e?.response?.data?.message || 'Произошла ошибка'
            return rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        token: null,
        isAuth: false,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = {}
            state.isAuth = false
            state.token = null
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true
            state.error = null
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false
            state.token = action.payload
            state.isAuth = true
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    },
})

export const { logout, clearError } = authSlice.actions

export default authSlice.reducer
