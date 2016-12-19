import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Thermostats from './Thermostats';

// Needed for onTouchTap, makes taps faster.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <Thermostats />
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
   document.getElementById('app')
  );
});
