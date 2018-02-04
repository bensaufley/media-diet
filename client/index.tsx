import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';

import rootReducer from './ducks/rootReducer';

const preloadedState = (window as any).__PRELOADED_STATE__;
delete (window as any).__PRELOADED_STATE__;

const store = createStore(rootReducer, preloadedState);

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
