import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsInfo';

const slice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessageSucces: (state, action) => {
      state.messages.push(action.payload.message);
    },
  },
  extraReducers: {
    [channelsActions.removeChannelSucces]: (state, action) => {
      const { channelId } = action.payload;
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
