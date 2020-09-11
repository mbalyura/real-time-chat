import socket from 'socket.io-client';

import {
  addMessageSuccess,
  addChannelSuccess,
  renameChannelSuccess,
  removeChannelSuccess,
} from './slices';
import { showSuccessToast, showDangerToast } from './toasts';

export default (dispatch) => {
  socket()
    .on('connect', () => showSuccessToast('alerts.connected'))
    .on('disconnect', () => showDangerToast('alerts.disconnected'))
    .on('newMessage', ({ data: { attributes } }) => dispatch(addMessageSuccess({ message: attributes })))
    .on('newChannel', ({ data: { attributes } }) => dispatch(addChannelSuccess({ channel: attributes })))
    .on('renameChannel', ({ data: { attributes } }) => dispatch(renameChannelSuccess({ channel: attributes })))
    .on('removeChannel', ({ data: { id } }) => dispatch(removeChannelSuccess({ id })));
};
