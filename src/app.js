import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Thermostats from './Thermostats';

// Needed for onTouchTap, makes taps faster.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const labels = {
  '0': 'Jo\'s Room',
  '1': 'Ari\'s Room',
  '2': 'Jade\'s Room',
  '3': 'Shop',
  '4': 'Living Room',
  '5': 'Bathroom'
};

const App = () => (
  <Thermostats labels={labels} />
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
   document.getElementById('app')
  );
});
