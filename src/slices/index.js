import { combineReducers } from 'redux';

import channelsInfo, { actions as channelsActions } from './channelsInfo';
import messagesInfo, { actions as messagesActions } from './messagesInfo';

export default combineReducers({ channelsInfo, messagesInfo });

export const {
  addChannel,
  removeChannel,
  renameChannel,
  switchChannel,
  addMessage,
} = { ...channelsActions, ...messagesActions };
