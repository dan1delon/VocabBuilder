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
      console.log('Fetched words', response.data);
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
      console.log('Fetched Users words:', response.data);
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
      console.log(wordData);
      const response = await instance.post('/words/create', wordData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Created word:', response.data);
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
      console.log('Edited word:', response.data);
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
      console.log('Fetched statistics:', response.data);
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
      console.log('Added word:', response.data);
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
      console.log('Fetched tasks:', response.data);
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
      console.log('Posted answer:', response.data);
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
