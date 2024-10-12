import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async filters => {
    const { keyword, category, isIrregular, page, limit } = filters;
    const response = await axios.get('/words/all', {
      params: { keyword, category, isIrregular, page, limit },
    });
    return response.data;
  }
);

export const createWord = createAsyncThunk(
  'words/createWord',
  async wordData => {
    const response = await axios.post('/words/create', wordData);
    return response.data;
  }
);

export const editWord = createAsyncThunk(
  'words/editWord',
  async ({ id, wordData }) => {
    const response = await axios.patch(`/words/edit/${id}`, wordData);
    return response.data;
  }
);

export const deleteWord = createAsyncThunk('words/deleteWord', async id => {
  const response = await axios.delete(`/words/delete/${id}`);
  return response.data;
});
