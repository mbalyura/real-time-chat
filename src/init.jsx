import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { internet } from 'faker/locale/en/';
import cookies from 'js-cookie';
import socket from 'socket.io-client';
import './i18n';
import gon from 'gon';

import rootReducer, {
  addMessageSucces,
  addChannelSucces,
  renameChannelSucces,
  removeChannelSucces,
} from './slices';
import { showSuccesToast, showDangerToast } from './toasts';
import NameContext from './context';
import configStore from './configStore';
import App from './components/App';

export default () => {
  const randomUserName = cookies.get('userName') || internet.userName();
  cookies.set('userName', randomUserName);

  const preloadedState = {
    channelsInfo: {
      channels: gon.channels,
      currentChannelId: gon.currentChannelId,
    },
    messagesInfo: { messages: gon.messages },
  };

  const store = configStore(rootReducer, preloadedState);

  const { dispatch } = store;

  socket()
    .on('connect', () => showSuccesToast('alerts.connected'))
    .on('disconnect', () => showDangerToast('alerts.disconnected'))
    .on('newMessage', ({ data: { attributes } }) => dispatch(addMessageSucces({ message: attributes })))
    .on('newChannel', ({ data: { attributes } }) => dispatch(addChannelSucces({ channel: attributes })))
    .on('renameChannel', ({ data: { attributes } }) => dispatch(renameChannelSucces({ channel: attributes })))
    .on('removeChannel', ({ data: { id } }) => dispatch(removeChannelSucces({ id })));

  ReactDOM.render(
    <Provider store={store}>
      <NameContext.Provider value={randomUserName}>
        <App />
      </NameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
