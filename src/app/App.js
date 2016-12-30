import React from 'react';
import Chrome from './Chrome';
import Thermostats from './Thermostats';

import styles from './App.scss';

const labels = {
  '0': 'Jo\'s Room',
  '1': 'Ari\'s Room',
  '2': 'Jade\'s Room',
  '3': 'Shop',
  '4': 'Living Room',
  '5': 'Bathroom'
};

const App = () => (
  <div>
    <Chrome />
    <Thermostats labels={labels} />
  </div>
);

export default App;
