import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchWords,
  createWord,
  editWord,
  deleteWord,
  fetchStatistics,
  fetchUsersWords,
  fetchUsersTasks,
  postAnswer,
} from './operations';

const INITIAL_STATE = {
  words: [],
  usersWords: [],
  totalPages: 1,
  page: 1,
  recommendPage: 1,
  tasks: [],
  tasksResults: [],
  statistics: {
    totalCount: 0,
  },
  loading: false,
  error: null,
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

  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeRecommendPage: (state, action) => {
      state.recommendPage = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.recommendPage = action.payload.page;
      })
      .addCase(fetchUsersWords.fulfilled, (state, action) => {
        state.loading = false;
        state.usersWords = action.payload.results;
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
      .addCase(fetchUsersTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
      })
      .addCase(postAnswer.fulfilled, (state, action) => {
        state.tasksResults = action.payload;
      })
      .addMatcher(
        isAnyOf(
          fetchWords.pending,
          createWord.pending,
          editWord.pending,
          deleteWord.pending,
          fetchStatistics.pending,
          fetchUsersWords.pending,
          fetchUsersTasks.pending,
          postAnswer.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchWords.rejected,
          createWord.rejected,
          editWord.rejected,
          deleteWord.rejected,
          fetchStatistics.rejected,
          fetchUsersWords.rejected,
          fetchUsersTasks.rejected,
          postAnswer.rejected
        ),
        handleRejected
      );
  },
});

export const { changePage, changeRecommendPage } = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
