import { combineReducers } from 'redux';

import messagesInfo, { actions as messagesActions } from './messagesInfo';
import channelsInfo, { actions as channelsActions } from './channelsInfo';

export default combineReducers({ channelsInfo, messagesInfo });

export const {
  addMessageSucces,
  addChannelSucces,
  renameChannelSucces,
  removeChannelSucces,
  switchChannel,
} = { ...channelsActions, ...messagesActions };
