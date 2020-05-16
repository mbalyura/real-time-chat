import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './components/App.jsx';
import NameContext from './context';

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
