/* eslint react/jsx-filename-extension: "off" */

import 'babel-polyfill';
import 'config/logger';

import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import createStore from 'duckredux/store';

import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';

import Root from './Root';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const dest = document.getElementById('app');
const store = createStore();

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={browserHistory} />
  </AppContainer>, dest
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./Root').default;

    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} history={browserHistory} />
      </AppContainer>,
      dest
    );
  });
}
