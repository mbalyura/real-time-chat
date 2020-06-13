import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    addChannelSucces: (state, { payload: { channel } }) => {
      state.channels.push(channel);
      state.currentChannelId = channel.id;
    },
    renameChannelSucces: (state, { payload: { channel: { id, name } } }) => {
      const channelToRename = state.channels.find((c) => c.id === id);
      channelToRename.name = name;
    },
    removeChannelSucces: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((c) => c.id !== id);
      state.currentChannelId = 1;
    },
    switchChannel: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
