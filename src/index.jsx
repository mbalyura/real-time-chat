import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';
import './i18n';
import NameContext from './context';
import App from './components/App.jsx';

export default (userName) => {
  ReactDOM.render(
    <Provider store={store}>
      <NameContext.Provider value={userName}>
        <App />
      </NameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
