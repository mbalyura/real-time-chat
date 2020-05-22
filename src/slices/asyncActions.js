import axios from 'axios';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import routes from '../routes';
import { toggleLoadingState } from '.';

const showSuccesToast = (text) => toast(i18next.t(text), { className: 'alert alert-success' });
const showDangerToast = (text) => toast(i18next.t(text), { className: 'alert alert-danger' });

export const addMessage = ({ text, userName, channelId }) => async (dispatch) => {
  dispatch(toggleLoadingState());
  try {
    const data = { attributes: { text, userName } };
    await axios.post(routes.channelMessagesPath(channelId), { data });
  } catch (err) {
    showDangerToast('errors.message');
    throw err;
  } finally {
    dispatch(toggleLoadingState());
  }
};

export const addChannel = ({ name }) => async (dispatch) => {
  dispatch(toggleLoadingState());
  try {
    const data = { attributes: { name } };
    await axios.post(routes.channelsPath(), { data });
    showSuccesToast('alerts.channelAdded');
  } catch (err) {
    showDangerToast('errors.channelAdding');
    throw err;
  } finally {
    dispatch(toggleLoadingState());
  }
};

export const renameChannel = ({ name, id }) => async (dispatch) => {
  dispatch(toggleLoadingState());
  try {
    const data = { attributes: { name } };
    await axios.patch(routes.channelPath(id), { data });
  } catch (err) {
    showDangerToast('errors.channelRenaming');
    throw err;
  } finally {
    dispatch(toggleLoadingState());
  }
};

export const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(toggleLoadingState());
  try {
    await axios.delete(routes.channelPath(id));
    showDangerToast('alerts.channelRemoved');
  } catch (err) {
    showDangerToast('errors.channelRemoving');
    throw err;
  } finally {
    dispatch(toggleLoadingState());
  }
};
