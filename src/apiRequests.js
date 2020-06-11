import axios from 'axios';
import routes from './routes';

export const addMessageRequest = async ({ text, userName, channelId }) => {
  const data = { attributes: { text, userName } };
  await axios.post(routes.channelMessagesPath(channelId), { data });
};

export const addChannelRequest = async ({ name }) => {
  const data = { attributes: { name } };
  await axios.post(routes.channelsPath(), { data });
};

export const renameChannelRequest = async ({ name, id }) => {
  const data = { attributes: { name } };
  await axios.patch(routes.channelPath(id), { data });
};

export const removeChannelRequest = async ({ id }) => {
  await axios.delete(routes.channelPath(id));
};
