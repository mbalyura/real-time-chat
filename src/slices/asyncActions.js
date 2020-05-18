import axios from 'axios';
import { createAction } from 'redux-actions';
import { toast } from 'react-toastify';

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

const getToast = (text) => toast(text, { className: 'alert alert-danger' });

export const addMessage = ({ text, userName, channelId }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const data = { attributes: { text, userName } };
    await axios.post(routes.channelMessagesPath(channelId), { data });
    dispatch(addMessageSuccess()); // ? no payload ??!
  } catch (err) {
    dispatch(addMessageFailure());
    getToast('Error sending message');
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
    getToast('Error adding channel');
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
    getToast('Error channel renaming');
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
    getToast('Error channel removing');
    throw err;
  }
};
