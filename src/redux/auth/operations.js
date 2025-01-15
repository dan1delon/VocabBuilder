import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const instance = axios.create({
  baseURL: 'https://vocab-builder-backend.onrender.com',
  withCredentials: true,
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

instance.interceptors.request.use(
  config => {
    console.log('Request Config:', config);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    console.log('Response Data:', response.data);
    return response;
  },
  error => {
    console.error('Response Error:', error.response || error);
    return Promise.reject(error);
  }
);

export const registerAPI = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      console.log(formData);
      const { data } = await instance.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (e) {
      toast.error(e.message);
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const loginAPI = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/login', formData);
      console.log(data);
      setToken(data.token);
      return data;
    } catch (e) {
      toast.error(e.message);
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const refreshUserAPI = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      console.log('Token from State:', token);

      if (!token) {
        console.error('No Token Found');
        return thunkApi.rejectWithValue('Token is not valid');
      }

      setToken(token);
      const { data } = await instance.get('/users/current');
      console.log('Refreshed User Data:', data);

      return data;
    } catch (e) {
      console.error('Error in Refresh User API:', e);
      return thunkApi.rejectWithValue(e.message);
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
      toast.error(e.message);
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
