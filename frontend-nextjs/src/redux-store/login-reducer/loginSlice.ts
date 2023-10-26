import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/redux-store/store';
import axios from 'axios';
const serverUrl = "http://localhost:8080";
export interface AuthenticationState {
    jwtToken: any;
    username: any;
    userID: any;
    status: 'loading' | 'failed' | 'idle';
}

const initialState: AuthenticationState = {
    jwtToken: null,
    username: null,
    userID: null,
    status: "idle",
};

export const loginAsync = createAsyncThunk(
    'authentication/login',
    async (user: any) => {
        try {
            const { userName, password } = user;
            const response = await axios.post(serverUrl + '/api/user/login', { userName, password })
            console.log("response 1111", response.data);

            return response.data;
        } catch (error) {
            console.log("error", error);

        }

    }
);

export const LoginSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.jwtToken = action.payload.jwtToken;
                state.username = action.payload.username;
                state.userID = action.payload.id;
            }).addCase(loginAsync.rejected, (state) => {
                state.status = 'failed';

            });

    },
});

export const getJWTToken = (state: RootState) => state.authenticationState.jwtToken;
export const getUserFullname = (state: RootState) => state.authenticationState.username;
export const getUserID = (state: RootState) => state.authenticationState.userID;
export const getStatus = (state: RootState) => state.authenticationState.status;

export default LoginSlice.reducer;  