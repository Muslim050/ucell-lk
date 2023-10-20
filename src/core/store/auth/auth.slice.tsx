import { createSlice } from '@reduxjs/toolkit';

import { fetchAuth, fetchOTP } from './auth.thunks';
import { AuthState } from './auth.types';

const initialState: AuthState = {
  otp: '',
  token: '',
  status: 'loading'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuth.fulfilled, (state) => {
        state.status = 'loaded';
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchOTP.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOTP.fulfilled, (state, action) => {
        if (!action.payload) return;

        state.status = 'loaded';
        state.otp = action.payload;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(fetchOTP.rejected, (state) => {
        state.status = 'error';
      });
  }
});

export const authReducer = authSlice.reducer;
