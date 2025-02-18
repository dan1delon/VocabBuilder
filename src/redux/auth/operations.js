import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const instance = axios.create({
  baseURL: 'https://vocabbuilder-354712174604.europe-central2.run.app',
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = newToken => {
  refreshSubscribers.forEach(callback => callback(newToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = callback => {
  refreshSubscribers.push(callback);
};

instance.interceptors.request.use(config => {
  config.params = { ...config.params, t: Date.now() };
  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await instance.post('/users/refresh');
        const newAccessToken = data.data.accessToken;

        setToken(newAccessToken);

        isRefreshing = false;
        onTokenRefreshed(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        clearToken();
        return Promise.reject(refreshError);
      }
    } else if (error.response?.status === 401) {
      clearToken();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const setToken = token => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    clearToken();
  }
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
  localStorage.removeItem('token');
};

export const registerAPI = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const loginAPI = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/login', formData);
      setToken(data.token);
      return data;
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const refreshUserAPI = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;
      console.log(token);

      const { data } = await instance.post('/users/refresh', {
        refreshToken: token,
      });
      setToken(data.data.accessToken);
      return data.data;
    } catch (e) {
      clearToken();
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const getUserAPI = createAsyncThunk(
  'auth/getUser',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get('/users/current');
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const logoutAPI = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await instance.post('/users/signout');
      clearToken();
      return;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const googleOAuthAPI = createAsyncThunk(
  'auth/googleOAuth',
  async (code, thunkApi) => {
    try {
      const { data } = await instance.post('/users/confirm-oauth', { code });
      const accessToken = data.data.accessToken;
      setToken(accessToken);
      return data.data;
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);
