import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsInfo';

const slice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessageSuccess: (state, { payload: { message } }) => {
      state.messages.push(message);
    },
  },
  extraReducers: {
    [channelsActions.removeChannelSuccess]: (state, { payload: { id } }) => {
      state.messages = state.messages.filter((m) => m.channelId !== id);
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
