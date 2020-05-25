import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './slices';

const serverState = window.gon;

const preloadedState = {
  channelsInfo: {
    channels: serverState.channels,
    currentChannelId: serverState.currentChannelId,
  },
  messagesInfo: { messages: serverState.messages },
};

const middleware = [...getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
}), logger];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

export default store;
