import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { selectToken } from './selectors';

export const instance = axios.create({
  baseURL: 'https://vocab-builder-backend.onrender.com',
  withCredentials: true,
});

let isRefreshing = false;
let pendingRequests = [];

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const token = localStorage.getItem('refreshToken');
          const refreshedData = await refreshToken(token);
          setToken(refreshedData.token);
          isRefreshing = false;

          pendingRequests.forEach(p => p.resolve(refreshedData.token));
          pendingRequests = [];
        } catch (refreshError) {
          isRefreshing = false;
          pendingRequests.forEach(p => p.reject(refreshError));
          pendingRequests = [];
          clearToken();
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve, reject) => {
        pendingRequests.push({
          resolve: token => {
            originalRequest._retry = true;
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(axios(originalRequest));
          },
          reject: err => reject(err),
        });
      });
    }

    return Promise.reject(error);
  }
);

export const setToken = token => {
  console.log('Setting token:', token);
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
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
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const refreshToken = async token => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      pendingRequests.push({ resolve, reject });
    });
  }

  isRefreshing = true;
  try {
    setToken(token); // Встановлюємо старий токен, якщо він потрібен для рефреш-запиту
    const { data } = await instance.post('/users/refresh');
    pendingRequests.forEach(p => p.resolve(data.token)); // Передаємо новий токен у відкладені запити
    pendingRequests = [];
    return data; // Повертаємо весь об'єкт із токеном
  } catch (error) {
    pendingRequests.forEach(p => p.reject(error));
    pendingRequests = [];
    throw error;
  } finally {
    isRefreshing = false;
  }
};

export const refreshUserAPI = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = selectToken(state);

    if (!token) {
      return thunkApi.rejectWithValue('Token is not valid');
    }
    try {
      setToken(token);
      const { data } = await instance.post('/users/refresh');
      return data.data;
    } catch (e) {
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
