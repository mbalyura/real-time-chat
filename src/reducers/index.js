import { combineReducers } from 'redux';

// const text = (state = '', action) => {
//   switch (action.type) {
//     case 'TEXT_UPDATE': {
//       return action.payload.text;
//     }
//     case 'MESSAGE_ADD_REQUEST': {
//       return '';
//     }
//     default:
//       return state;
//   }
// };

const messages = (state = [], action) => {
  switch (action.type) {
    case 'MESSAGE_ADD_SOCKET':
    {
      return [...state, action.payload.message];
    }
    case 'CHANNEL_REMOVE_SOCKET': {
      const { channelId } = action.payload;
      const newState = state.filter((m) => m.channelId !== channelId);
      return newState;
    }
    default:
      return state;
  }
};

const channels = (state = [], action) => {
  switch (action.type) {
    case 'CHANNEL_ADD_SOCKET': {
      return [...state, action.payload.channel];
    }
    case 'CHANNEL_RENAME_SOCKET': {
      const { channel } = action.payload;
      const newState = state.map((c) => (c.id === channel.id ? channel : c));
      return newState;
    }
    case 'CHANNEL_REMOVE_SOCKET': {
      const { channelId } = action.payload;
      const newState = state.filter((c) => c.id !== channelId);
      return newState;
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
    case 'CHANNEL_REMOVE_SOCKET': {
      return 1;
    }
    default:
      return state;
  }
};

export default combineReducers({
  // text,
  channels,
  messages,
  currentChannelId,
});
