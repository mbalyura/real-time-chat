import axios from 'axios';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import routes from '../routes.js';
import { toogleLoadingState } from './index';

const showSuccesToast = (text) => toast(i18next.t(text), { className: 'alert alert-success' });
const showDangerToast = (text) => toast(i18next.t(text), { className: 'alert alert-danger' });

export const addMessage = ({ text, userName, channelId }) => async (dispatch) => {
  dispatch(toogleLoadingState());
  try {
    const data = { attributes: { text, userName } };
    await axios.post(routes.channelMessagesPath(channelId), { data });
    dispatch(toogleLoadingState());
  } catch (err) {
    showDangerToast('errors.message');
    dispatch(toogleLoadingState());
    throw err;
  }
};

export const addChannel = ({ name }) => async (dispatch) => {
  dispatch(toogleLoadingState());
  try {
    const data = { attributes: { name } };
    await axios.post(routes.channelsPath(), { data });
    showSuccesToast('alerts.channelAdded');
    dispatch(toogleLoadingState());
  } catch (err) {
    showDangerToast('errors.channelAdding');
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
    showDangerToast('errors.channelRenaming');
    dispatch(toogleLoadingState());
    throw err;
  }
};

export const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(toogleLoadingState());
  try {
    await axios.delete(routes.channelPath(id));
    showDangerToast('alerts.channelRemoved');
    dispatch(toogleLoadingState());
  } catch (err) {
    showDangerToast('errors.channelRemoving');
    dispatch(toogleLoadingState());
    throw err;
  }
};
