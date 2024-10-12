import { createSelector } from '@reduxjs/toolkit';
import { selectTeachers } from '../teachers/selectors';
import { selectFavorites } from '../favorites/selectors';
import { selectIsLoggedIn } from '../auth/selectors';

export const selectFilters = state => state.filters;
export const selectLanguage = state => state.filters.language;
export const selectKnowledge = state => state.filters.knowledge;
export const selectPrice = state => state.filters.price;

export const selectFilteredTeachers = createSelector(
  [selectTeachers, selectLanguage, selectKnowledge, selectPrice],
  (teachers, languageFilter, knowledgeFilter, priceFilter) => {
    let filteredTeachers = teachers;

    if (languageFilter && languageFilter !== 'All') {
      filteredTeachers = filteredTeachers.filter(teacher =>
        teacher.languages.includes(languageFilter)
      );
    }

    if (knowledgeFilter && knowledgeFilter !== 'All') {
      filteredTeachers = filteredTeachers.filter(teacher =>
        teacher.levels.includes(knowledgeFilter)
      );
    }

    if (priceFilter) {
      filteredTeachers = filteredTeachers.filter(teacher => {
        const roundedPrice = Math.floor(teacher.price_per_hour / 10) * 10;
        return roundedPrice === priceFilter;
      });
    }

    return filteredTeachers;
  }
);

export const selectFavoriteTeachers = createSelector(
  [selectFilteredTeachers, selectFavorites, selectIsLoggedIn],
  (filteredTeachers, favorites, isLoggedIn) => {
    if (!isLoggedIn) {
      return [];
    }

    const favoriteIds = Object.keys(favorites);

    return filteredTeachers.filter(teacher => favoriteIds.includes(teacher.id));
  }
);
