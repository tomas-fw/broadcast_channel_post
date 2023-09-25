import { User } from '@/types/user';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    status: 'idle' | 'loading' | 'done';
    isLoggedIn: boolean;
    user: User | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    status: 'idle',
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<AuthState['status']>) => {
            state.status = action.payload;
        },
        login: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, setStatus } = authSlice.actions;

export default authSlice.reducer;
