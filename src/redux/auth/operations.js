import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const instance = axios.create({
  baseURL: 'https://vocab-builder-backend.onrender.com',
  withCredentials: true,
});

export const setToken = token => {
  console.log('Setting token:', token);
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

instance.interceptors.response.use(
  response => response, // Повертаємо успішну відповідь
  async error => {
    const originalRequest = error.config;

    // Якщо помилка 401 і запит ще не був повторений
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Викликаємо refreshUserAPI
        const { data } = await instance.post('/users/refresh');
        setToken(data.data.accessToken); // Оновлюємо токен

        // Повторюємо оригінальний запит з новим токеном
        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh Error:', refreshError);
        return Promise.reject(refreshError);
      }
    }

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
      // Запит на оновлення сесії
      const { data } = await instance.post('/users/refresh');
      console.log('Refreshed User Data:', data.data);

      // Встановити новий токен у заголовки запитів
      setToken(data.data.accessToken);

      return data.data; // Повертаємо accessToken
    } catch (e) {
      console.error('Error in Refresh User API:', e);
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const getUserAPI = createAsyncThunk(
  'auth/getUser',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get('/users/current');
      console.log('Fetched User Data:', data);
      return data;
    } catch (e) {
      console.error('Error in Get User API:', e);
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
