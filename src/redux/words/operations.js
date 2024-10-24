import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../auth/operations';
import toast from 'react-hot-toast';

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async (filters, thunkApi) => {
    try {
      const { keyword, category, isIrregular, page, limit } = filters;
      const response = await instance.get('/words/all', {
        params: { keyword, category, isIrregular, page, limit },
      });
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchUsersWords = createAsyncThunk(
  'words/fetchUsersWords',
  async (filters, thunkApi) => {
    try {
      const { keyword, category, isIrregular, page, limit } = filters;
      const response = await instance.get('/words/own', {
        params: { keyword, category, isIrregular, page, limit },
      });
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createWord = createAsyncThunk(
  'words/createWord',
  async (wordData, thunkApi) => {
    try {
      const response = await instance.post('/words/create', wordData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editWord = createAsyncThunk(
  'words/editWord',
  async ({ id, wordData }, thunkApi) => {
    try {
      const response = await instance.patch(`/words/edit/${id}`, wordData);
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async (id, thunkApi) => {
    try {
      const response = await instance.delete(`/words/delete/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchStatistics = createAsyncThunk(
  'words/fetchStatistics',
  async (_, thunkApi) => {
    try {
      const response = await instance.get('/words/statistics');
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addRecommendedWord = createAsyncThunk(
  'words/addWordFromForeignUser',
  async (wordId, thunkApi) => {
    try {
      const response = await instance.post(`/words/add/${wordId}`);
      toast.success('Word added successfully!');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchUsersTasks = createAsyncThunk(
  'words/fetchUsersTasks',
  async (_, thunkApi) => {
    try {
      const response = await instance.get('/words/tasks');
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const postAnswer = createAsyncThunk(
  'words/postAnswer',
  async (answerData, thunkApi) => {
    try {
      const response = await instance.post('/words/answers', answerData);
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
