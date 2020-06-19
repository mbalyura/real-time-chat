import { combineReducers } from 'redux';

import messagesInfo, { actions as messagesActions } from './messagesInfo';
import channelsInfo, { actions as channelsActions } from './channelsInfo';
import modalsInfo, { actions as modalsActions } from './modalsInfo';

export default combineReducers({ channelsInfo, messagesInfo, modalsInfo });

export const {
  addMessageSuccess,
  addChannelSuccess,
  renameChannelSuccess,
  removeChannelSuccess,
  switchChannel,
  setModal,
} = { ...channelsActions, ...messagesActions, ...modalsActions };
