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
    renameChannelSucces: (state, { payload: { channel } }) => {
      const channelToRename = state.channels.find((c) => c.id === channel.id);
      channelToRename.name = channel.name;
    },
    removeChannelSucces: (state, { payload: { channelId } }) => {
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.currentChannelId = 1;
    },
    switchChannel: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
