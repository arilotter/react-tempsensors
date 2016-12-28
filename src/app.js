import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange400} from 'material-ui/styles/colors';

import Thermostats from './Thermostats';

// Needed for onTouchTap, makes taps faster.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange400
  }
});

const labels = {
  '0': 'Jo\'s Room',
  '1': 'Ari\'s Room',
  '2': 'Jade\'s Room',
  '3': 'Shop',
  '4': 'Living Room',
  '5': 'Bathroom'
};

const App = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Thermostats labels={labels} />
    </MuiThemeProvider>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
