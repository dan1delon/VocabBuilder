import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchWords,
  createWord,
  editWord,
  deleteWord,
  fetchStatistics,
} from './operations';

const INITIAL_STATE = {
  words: [],
  totalPages: 1,
  page: 1,
  loading: false,
  error: null,
  statistics: {
    totalCount: 0,
  },
};

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const wordsSlice = createSlice({
  name: 'words',
  initialState: INITIAL_STATE,
  extraReducers: builder => {
    builder
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
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
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics.totalCount = action.payload.totalCount;
      })
      .addMatcher(
        isAnyOf(
          fetchWords.pending,
          createWord.pending,
          editWord.pending,
          deleteWord.pending,
          fetchStatistics.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchWords.rejected,
          createWord.rejected,
          editWord.rejected,
          deleteWord.rejected,
          fetchStatistics.rejected
        ),
        handleRejected
      );
  },
});

export const wordsReducer = wordsSlice.reducer;
