import { combineReducers } from 'redux';

const text = (state = '', action) => {
  switch (action.type) {
    case 'TEXT_UPDATE': {
      return action.payload.text;
    }
    case 'MESSAGE_ADD_REQUEST': {
      return '';
    }
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  console.log('messages -> action', action);

  switch (action.type) {
    case 'MESSAGE_ADD_SUCCESS':
    case 'MESSAGE_ADD_SOCKET':
    {
      return [...state, action.payload.message];
    }
    default:
      return state;
  }
};

const channels = (state = [], action) => {
  switch (action.type) {
    case 'CHANNEL_ADD': {
      return [...state, action.payload.channel];
    }
    default:
      return state;
  }
};

const currentChannelId = (state = 1, action) => {
  switch (action.type) {
    case 'CHANNEL_SWITCH': {
      return action.payload.id;
    }
    default:
      return state;
  }
};

export default combineReducers({
  text,
  channels,
  messages,
  currentChannelId,
});
