import { combineReducers } from 'redux';

import channelsInfo, {
  actions as channelsActions,
  requestAddChannel,
  requestRenameChannel,
  requestRemoveChannel,
} from './channelsInfo';
import messagesInfo, { actions as messagesActions, requestAddMessage } from './messagesInfo';

export default combineReducers({ channelsInfo, messagesInfo });

export const asyncActions = {
  requestAddChannel,
  requestRenameChannel,
  requestRemoveChannel,
  requestAddMessage,
};

export const {
  addChannel,
  renameChannel,
  removeChannel,
  switchChannel,
  addMessage,
} = { ...channelsActions, ...messagesActions };
