import * as fs from 'fs';
import * as koa from 'koa';
import * as path from 'path';
import * as pug from 'pug';
import { renderToString } from 'react-dom/server';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from '../client/components/App';
import rootReducer from '../client/ducks/rootReducer';

const compileIndex: pug.compileTemplate = require('./views/index');

const prerender = (context: koa.Context): string => {
  const store = createStore(rootReducer);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  const preloadedState = store.getState();

  return compileIndex({ preloadedState, rendered: html });
};

export default prerender;
