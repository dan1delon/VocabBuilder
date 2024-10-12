import { createSlice } from '@reduxjs/toolkit';
import { fetchWords, createWord, editWord, deleteWord } from './operations';

const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    words: [],
    totalPages: 1,
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWords.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createWord.fulfilled, (state, action) => {
        state.words.push(action.payload);
      })
      .addCase(editWord.fulfilled, (state, action) => {
        const index = state.words.findIndex(
          word => word._id === action.payload._id
        );
        if (index !== -1) {
          state.words[index] = action.payload;
        }
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.words = state.words.filter(
          word => word._id !== action.payload.id
        );
      });
  },
});

export const wordsReducer = wordsSlice.reducer;
