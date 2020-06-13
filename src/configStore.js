import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

export default (reducer, preloadedState) => {
  const isDevelop = process.env.NODE_ENV !== 'production';

  const middleware = getDefaultMiddleware();

  if (isDevelop) middleware.push(logger);

  const store = configureStore({
    reducer,
    middleware,
    devTools: isDevelop,
    preloadedState,
  });

  return store;
};
