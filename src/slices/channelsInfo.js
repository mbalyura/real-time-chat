import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const slice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload.channel);
      toast.success('Channel added!', { className: 'alert alert-success' });
    },
    renameChannel: (state, action) => {
      const { channel } = action.payload;
      state.channels = state.channels.map((c) => (c.id === channel.id ? channel : c));
    },
    removeChannel: (state, action) => {
      const { channelId } = action.payload;
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.currentChannelId = 1;
      toast.success('Channel deleted!', { className: 'alert alert-danger' });
    },
    switchChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
