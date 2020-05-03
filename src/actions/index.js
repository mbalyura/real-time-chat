export const addChannel = (channel) => ({
  type: 'CHANNEL_ADD',
  payload: {
    channel,
  },
});

export const deleteChannel = (id) => ({
  type: 'CHANNEL_DELETE',
  payload: {
    id,
  },
});

export const switchChannel = (id) => ({
  type: 'CHANNEL_SWITCH',
  payload: {
    id,
  },
});

export const updateNewMessageText = (text) => ({
  type: 'TEXT_UPDATE',
  payload: {
    text,
  },
});

export const addMessage = (message) => ({
  type: 'MESSAGE_ADD',
  payload: {
    message,
  },
});
