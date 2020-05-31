import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default (reducer, preloadedState) => {
  const isDevelop = process.env.NODE_ENV !== 'production';

  const middleware = [thunk];

  if (isDevelop) middleware.push(logger);

  const store = configureStore({
    reducer,
    middleware,
    devTools: isDevelop,
    preloadedState,
  });

  return store;
};
