import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsInfo';

const slice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessageSucces: (state, { payload: { message } }) => {
      state.messages.push(message);
    },
  },
  extraReducers: {
    [channelsActions.removeChannelSucces]: (state, { payload: { id } }) => {
      state.messages = state.messages.filter((m) => m.channelId !== id);
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
