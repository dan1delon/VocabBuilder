import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { loginAPI, logoutAPI, refreshUserAPI, registerAPI } from './operations';

const AUTH_INITIAL_STATE = {
  name: null,
  email: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: false,
};

const handlePending = state => {
  state.loading = true;
  state.error = false;
};

const handleRejected = state => {
  state.loading = false;
  state.error = true;
};

const authSlice = createSlice({
  name: 'auth',

  initialState: AUTH_INITIAL_STATE,

  extraReducers: builder => {
    builder
      // Registration
      .addCase(registerAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
      })
      //   Login
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
      })
      //   Refresh
      .addCase(refreshUserAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
      })
      //   Logout
      .addCase(logoutAPI.fulfilled, () => {
        return AUTH_INITIAL_STATE;
      })
      // Matchers
      .addMatcher(
        isAnyOf(
          registerAPI.pending,
          loginAPI.pending,
          refreshUserAPI.pending,
          logoutAPI.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          registerAPI.rejected,
          loginAPI.rejected,
          refreshUserAPI.rejected,
          logoutAPI.rejected
        ),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;
