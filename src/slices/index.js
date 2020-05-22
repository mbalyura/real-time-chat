import { combineReducers } from 'redux';

import channelsInfo, { actions as channelsActions } from './channelsInfo';
import messagesInfo, { actions as messagesActions } from './messagesInfo';
import loadingInfo, { actions as loadingActions } from './loadingInfo';

export default combineReducers({ channelsInfo, messagesInfo, loadingInfo });

export const {
  addChannel,
  removeChannel,
  renameChannel,
  switchChannel,
  addMessage,
  toggleLoadingState,
} = { ...channelsActions, ...messagesActions, ...loadingActions };
