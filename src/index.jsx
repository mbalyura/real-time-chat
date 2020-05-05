import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import io from 'socket.io-client';

import App from './components/App.jsx';
import reducers from './reducers/index.js';
import NameContext from './context';

// import { addMessageOnSocket } from './actions/index.js';

export default (preloadedState, userName) => {
  const middlewares = [thunk];
  let devtoolMiddleware = (f) => f;

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
    const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (ext) devtoolMiddleware = ext();
  }

  const store = createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(...middlewares),
      devtoolMiddleware,
    ),
  );

  // const socket = io();
  // socket.on('newMessage', ({ data: { attributes } }) => {
  //   console.warn('*** IO new message ***');
  //   store.dispatch(addMessageOnSocket(attributes));
  // });

  ReactDOM.render(
    <Provider store={store}>
      <NameContext.Provider value={{ userName }}>
        <App />
      </NameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
