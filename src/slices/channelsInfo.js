import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload.channel);
    },
    renameChannel: (state, action) => {
      const { channel } = action.payload;
      state.channels = state.channels.map((c) => (c.id === channel.id ? channel : c));
    },
    removeChannel: (state, action) => {
      const { channelId } = action.payload;
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.currentChannelId = 1;
    },
    switchChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
