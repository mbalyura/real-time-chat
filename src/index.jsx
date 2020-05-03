import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';


import App from './components/App.jsx';

import reducers from './reducers/index.js';

import NameContext from './context';


export default (preloadedState, userName) => {
  const store = createStore(
    reducers,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  ReactDOM.render(
    <Provider store={store}>
      <NameContext.Provider value={{ userName }}>
        <App initState={preloadedState} />
      </NameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
