import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { internet } from 'faker/locale/en/';
import cookies from 'js-cookie';
import './i18n';
import gon from 'gon';
import NameContext from './context';
import rootReducer from './slices';
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

  ReactDOM.render(
    <Provider store={store}>
      <NameContext.Provider value={randomUserName}>
        <App />
      </NameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
