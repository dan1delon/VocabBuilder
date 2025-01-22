import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { authReducer } from './auth/slice';
import { categoriesReducer } from './categories/slice';
import { wordsReducer } from './words/slice';
import sessionStorage from 'redux-persist/lib/storage/session';

const authPersistConfig = {
  key: 'auth',
  storage: sessionStorage,
  whitelist: ['token', 'name'],
};

export const store = configureStore({
  reducer: {
    words: wordsReducer,
    categories: categoriesReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
