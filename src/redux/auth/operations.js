import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

export const registerAPI = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const loginAPI = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/signin', formData);
      setToken(data.token);
      return data;
    } catch (e) {
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
      if (!token) return thunkApi.rejectWithValue('Token is not valid');

      setToken(token);

      const { data } = await instance.get('/users/current');
      return data;
    } catch (e) {
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
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
