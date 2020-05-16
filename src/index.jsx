import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import App from './components/App.jsx';
import reducers from './reducers/index.js';
import NameContext from './context';

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

  ReactDOM.render(
    <Provider store={store}>
      <NameContext.Provider value={{ userName }}>
        <App />
      </NameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
