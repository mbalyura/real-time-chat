import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

export default (reducer, preloadedState) => {
  const middleware = [...getDefaultMiddleware(), logger];

  const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });

  return store;
};
