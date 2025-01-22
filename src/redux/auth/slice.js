import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  loginAPI,
  logoutAPI,
  refreshUserAPI,
  registerAPI,
  setToken,
  googleOAuthAPI,
} from './operations';

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
      //   GoogleOAuth
      .addCase(googleOAuthAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.accessToken;
      })
      //   Refresh
      .addCase(refreshUserAPI.pending, state => {
        state.isRefreshing = true;
        state.isLoggedIn = false;
        state.token = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(refreshUserAPI.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        setToken(action.payload.accessToken);
      })
      .addCase(refreshUserAPI.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.token = null;
        state.error = true;
        state.loading = false;
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
          logoutAPI.pending,
          googleOAuthAPI.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          registerAPI.rejected,
          loginAPI.rejected,
          logoutAPI.rejected,
          googleOAuthAPI.rejected
        ),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;
