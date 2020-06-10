import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import routes from '../routes';
import { actions as channelsActions } from './channelsInfo';

const requestAddMessage = createAsyncThunk(
  'messagesInfo/AddingMessageStatus',
  async ({ text, userName, channelId }) => {
    const data = { attributes: { text, userName } };
    const response = await axios.post(routes.channelMessagesPath(channelId), { data });
    return response;
  },
);

const slice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload.message);
      state.isLoading = false;
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, action) => {
      const { channelId } = action.payload;
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
    },
    [requestAddMessage.pending]: (state) => {
      state.isLoading = true;
    },
    [requestAddMessage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

const { actions, reducer } = slice;

export { actions, requestAddMessage };
export default reducer;
