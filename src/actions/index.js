import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes.js';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const addMessageOnSocket = (message) => ({
  type: 'MESSAGE_ADD_SOCKET',
  payload: {
    message,
  },
});

export const addChannelOnSocket = (channel) => ({
  type: 'CHANNEL_ADD_SOCKET',
  payload: {
    channel,
  },
});

export const renameChannelOnSocket = (channel) => ({
  type: 'CHANNEL_RENAME_SOCKET',
  payload: {
    channel,
  },
});

export const removeChannelOnSocket = (channelId) => ({
  type: 'CHANNEL_REMOVE_SOCKET',
  payload: {
    channelId,
  },
});

export const switchChannel = (id) => ({
  type: 'CHANNEL_SWITCH',
  payload: {
    id,
  },
});

export const addMessage = ({ text, userName, channelId }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const data = { attributes: { text, userName } };
    await axios.post(routes.channelMessagesPath(channelId), { data });
    dispatch(addMessageSuccess()); // ? no payload ??!
  } catch (err) {
    dispatch(addMessageFailure());
    throw err;
  }
};

export const addChannel = ({ name }) => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const data = { attributes: { name } };
    await axios.post(routes.channelsPath(), { data });
    dispatch(addChannelSuccess());
  } catch (err) {
    dispatch(addChannelFailure());
    throw err;
  }
};

export const renameChannel = ({ name, id }) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const data = { attributes: { name } };
    await axios.patch(routes.channelPath(id), { data });
    dispatch(renameChannelSuccess());
  } catch (err) {
    dispatch(renameChannelFailure());
    throw err;
  }
};

export const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios.delete(routes.channelPath(id));
    dispatch(removeChannelSuccess());
  } catch (err) {
    dispatch(removeChannelFailure());
    throw err;
  }
};
