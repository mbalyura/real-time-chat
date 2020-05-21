import axios from 'axios';
import { toast } from 'react-toastify';

import routes from '../routes.js';
import { toogleLoadingState } from './index';

const getSuccesToast = (text) => toast(text, { className: 'alert alert-success' });
const getDangerToast = (text) => toast(text, { className: 'alert alert-danger' });

export const addMessage = ({ text, userName, channelId }) => async (dispatch) => {
  dispatch(toogleLoadingState());
  try {
    const data = { attributes: { text, userName } };
    await axios.post(routes.channelMessagesPath(channelId), { data });
    dispatch(toogleLoadingState());
  } catch (err) {
    console.log('addMessage -> err', err);
    getDangerToast('Error sending message');
    dispatch(toogleLoadingState());
    // throw err;
  }
};

export const addChannel = ({ name }) => async (dispatch) => {
  dispatch(toogleLoadingState());
  try {
    const data = { attributes: { name } };
    await axios.post(routes.channelsPath(), { data });
    getSuccesToast('Channel added!');
    dispatch(toogleLoadingState());
  } catch (err) {
    getDangerToast('Error adding channel');
    dispatch(toogleLoadingState());
    throw err;
  }
};

export const renameChannel = ({ name, id }) => async (dispatch) => {
  dispatch(toogleLoadingState());
  try {
    const data = { attributes: { name } };
    await axios.patch(routes.channelPath(id), { data });
    dispatch(toogleLoadingState());
  } catch (err) {
    getDangerToast('Error channel renaming');
    dispatch(toogleLoadingState());
    throw err;
  }
};

export const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(toogleLoadingState());
  try {
    await axios.delete(routes.channelPath(id));
    getDangerToast('Channel removed!');
    dispatch(toogleLoadingState());
  } catch (err) {
    getDangerToast('Error channel removing');
    dispatch(toogleLoadingState());
    throw err;
  }
};
