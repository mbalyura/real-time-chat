import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import routes from '../routes';

const requestAddChannel = createAsyncThunk(
  'channelsInfo/AddingChannelStatus',
  async ({ name }) => {
    const data = { attributes: { name } };
    const response = await axios.post(routes.channelsPath(), { data });
    return response;
  },
);

const requestRenameChannel = createAsyncThunk(
  'channelsInfo/RenamingChannelStatus',
  async ({ name, id }) => {
    const data = { attributes: { name } };
    const response = await axios.patch(routes.channelPath(id), { data });
    return response;
  },
);

const requestRemoveChannel = createAsyncThunk(
  'channelsInfo/RemovingChannelStatus',
  async ({ id }) => {
    const response = await axios.delete(routes.channelPath(id));
    return response;
  },
);

const slice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.channels.push(channel);
      state.currentChannelId = channel.id;
      state.isLoading = false;
    },
    renameChannel: (state, { payload: { channel } }) => {
      const channelToRename = state.channels.find((c) => c.id === channel.id);
      channelToRename.name = channel.name;
      state.isLoading = false;
    },
    removeChannel: (state, { payload: { channelId } }) => {
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.currentChannelId = 1;
      state.isLoading = false;
    },
    switchChannel: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
  },
  extraReducers: {
    [requestAddChannel.pending]: (state) => {
      state.isLoading = true;
    },
    [requestAddChannel.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [requestRenameChannel.pending]: (state) => {
      state.isLoading = true;
    },
    [requestRenameChannel.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [requestRemoveChannel.pending]: (state) => {
      state.isLoading = true;
    },
    [requestRemoveChannel.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

const { actions, reducer } = slice;

export {
  actions,
  requestAddChannel,
  requestRenameChannel,
  requestRemoveChannel,
};
export default reducer;
