import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import App from './components/App.jsx';
import { addMessageOnSocket } from './actions';
import reducers from './reducers/index.js';
import NameContext from './context';

export default (io, preloadedState, userName) => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const store = createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

  const socket = io();
  socket.on('newMessage', (response) => {
    console.log('message', response);
    console.warn('*** IO new message ***');
    addMessageOnSocket('test');
  });

  ReactDOM.render(
    <Provider store={store}>
      <NameContext.Provider value={{ userName }}>
        <App />
      </NameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
