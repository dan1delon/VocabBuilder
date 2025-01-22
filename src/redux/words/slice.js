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
  wordsLoading: false,
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

const handleWordsPending = state => {
  state.wordsLoading = true;
  state.error = null;
};

const handleWordsRejected = (state, action) => {
  state.wordsLoading = false;
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
        state.wordsLoading = false;
        state.words = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.recommendPage = action.payload.page;
      })
      .addCase(fetchUsersWords.fulfilled, (state, action) => {
        state.wordsLoading = false;
        state.usersWords = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(createWord.fulfilled, (state, action) => {
        state.words.push(action.payload);
        state.loading = false;
      })
      .addCase(editWord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.words.findIndex(
          word => word._id === action.payload._id
        );
        if (index !== -1) {
          state.words[index] = action.payload;
        }
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.loading = false;
        state.words = state.words.filter(
          word => word._id !== action.payload.id
        );
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics.totalCount = action.payload.totalCount;
      })
      .addCase(fetchUsersTasks.fulfilled, (state, action) => {
        state.wordsLoading = false;
        state.tasks = action.payload;
      })
      .addCase(postAnswer.fulfilled, (state, action) => {
        state.wordsLoading = false;
        state.tasksResults = action.payload;
      })
      .addMatcher(
        isAnyOf(
          createWord.pending,
          editWord.pending,
          deleteWord.pending,
          fetchStatistics.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          createWord.rejected,
          editWord.rejected,
          deleteWord.rejected,
          fetchStatistics.rejected
        ),
        handleRejected
      )
      .addMatcher(
        isAnyOf(
          fetchWords.pending,
          fetchUsersWords.pending,
          fetchUsersTasks.pending,
          postAnswer.pending
        ),
        handleWordsPending
      )
      .addMatcher(
        isAnyOf(
          fetchWords.rejected,
          fetchUsersWords.rejected,
          fetchUsersTasks.rejected,
          postAnswer.rejected
        ),
        handleWordsRejected
      );
  },
});

export const { changePage, changeRecommendPage } = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
