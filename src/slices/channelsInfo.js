import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    addChannel: ({ channels }, { payload: { channel } }) => {
      channels.push(channel);
    },
    renameChannel: ({ channels }, { payload: { channel } }) => {
      const channelToRename = channels.find((c) => c.id === channel.id);
      channelToRename.name = channel.name;
    },
    removeChannel: (state, { payload: { channelId } }) => {
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
