import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'All',
  knowledge: 'All',
  price: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeLanguageFilter(state, action) {
      state.language = action.payload;
    },
    changeKnowledgeFilter(state, action) {
      state.knowledge = action.payload;
    },
    changePriceFilter(state, action) {
      state.price = action.payload;
    },
    resetFilters(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  changeLanguageFilter,
  changeKnowledgeFilter,
  changePriceFilter,
  resetFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
