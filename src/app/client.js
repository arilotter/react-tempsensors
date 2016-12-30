import 'react-toolbox/lib/commons.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap, makes taps faster.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const rootEl = document.getElementById('app');

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const App = require('./App.js').default;
    ReactDOM.render(
      <AppContainer>
        <App />
      </AppContainer>,
      rootEl
    );
  });
}
