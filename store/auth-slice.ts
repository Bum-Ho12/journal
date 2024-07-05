import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { Token, User } from '@/utils/types';

interface AuthState {
    user: User | null;
    token: Token | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isSignedIn: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
    isSignedIn: false,
};

export const loadCredentials = createAsyncThunk(
    'auth/loadCredentials',
    async () => {
        const user = await SecureStore.getItemAsync('user');
        const token = await SecureStore.getItemAsync('token');
        if (user && token) {
            return { user: JSON.parse(user), token: JSON.parse(token) };
        }
        return { user: null, token: null };
    }
);

export const setCredentials = createAsyncThunk(
    'auth/setCredentials',
    async (payload: { user: User; token: Token }) => {
        const { user, token } = payload;
        await SecureStore.setItemAsync('user', JSON.stringify(user));
        await SecureStore.setItemAsync('token', JSON.stringify(token));
        return { user, token };
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.isSignedIn = false;
            SecureStore.deleteItemAsync('user');
            SecureStore.deleteItemAsync('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCredentials.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadCredentials.fulfilled, (state, action) => {
                const { user, token } = action.payload;
                state.user = user;
                state.token = token;
                state.isSignedIn = !!user && !!token;
                state.status = 'succeeded';
            })
            .addCase(loadCredentials.rejected, (state) => {
                state.user = null;
                state.token = null;
                state.isSignedIn = false;
                state.status = 'failed';
            })
            .addCase(setCredentials.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(setCredentials.fulfilled, (state, action) => {
                const { user, token } = action.payload;
                state.user = user;
                state.token = token;
                state.isSignedIn = true;
                state.status = 'succeeded';
            })
            .addCase(setCredentials.rejected, (state, action) => {
                state.error = action.error.message ?? 'Failed to set credentials';
                state.status = 'failed';
            });
    },
});

export const { logOut } = authSlice.actions;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsUserSignedIn = (state: { auth: AuthState }) => state.auth.isSignedIn;

export default authSlice.reducer;
