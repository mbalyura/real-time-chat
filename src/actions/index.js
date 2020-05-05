import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes.js';

export const fetchChannelsRequest = createAction('CHANNELS_FETCH_REQUEST');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');
export const fetchChannelsFailure = createAction('CHANNELS_FETCH_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const switchChannelSuccess = createAction('CHANNEL_SWITCH_SUCCESS');
export const switchChannelFailure = createAction('CHANNEL_SWITCH_FAILURE');
export const switchChannelRequest = createAction('CHANNEL_SWITCH_REQUEST');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

// export const addMessageOnSocket = createAction('MESSAGE_ADD_SOCKET');

export const addMessageOnSocket = (message) => ({
  type: 'MESSAGE_ADD_SOCKET',
  payload: {
    message,
  },
});

export const addChannel = (channel) => ({
  type: 'CHANNEL_ADD',
  payload: {
    channel,
  },
});

export const deleteChannel = (id) => ({
  type: 'CHANNEL_DELETE',
  payload: {
    id,
  },
});

export const switchChannel = (id) => ({
  type: 'CHANNEL_SWITCH',
  payload: {
    id,
  },
});

export const updateNewMessageText = (text) => ({
  type: 'TEXT_UPDATE',
  payload: {
    text,
  },
});

export const fetchMessages = (channelId) => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const response = await axios.get(routes.channelMessagesPath(channelId));
    dispatch(fetchMessagesSuccess({ messages: response.data }));
  } catch (err) {
    dispatch(fetchMessagesFailure());
    throw err;
  }
};

export const addMessage = ({ text, userName, channelId }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const data = { attributes: { text, userName } };
    await axios.post(routes.channelMessagesPath(channelId), { data });
    dispatch(addMessageSuccess());
  } catch (err) {
    dispatch(addMessageFailure());
    throw err;
  }
};
