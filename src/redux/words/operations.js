import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async (filters, thunkApi) => {
    try {
      const { keyword, category, isIrregular, page, limit } = filters;
      const response = await axios.get('/words/all', {
        params: { keyword, category, isIrregular, page, limit },
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createWord = createAsyncThunk(
  'words/createWord',
  async (wordData, thunkApi) => {
    try {
      const response = await axios.post('/words/create', wordData);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editWord = createAsyncThunk(
  'words/editWord',
  async ({ id, wordData }, thunkApi) => {
    try {
      const response = await axios.patch(`/words/edit/${id}`, wordData);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`/words/delete/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchStatistics = createAsyncThunk(
  'words/fetchStatistics',
  async (_, thunkApi) => {
    try {
      const response = await axios.get('/words/statistics');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
