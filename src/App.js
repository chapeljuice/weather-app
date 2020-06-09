import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCircleNotch,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faSun
} from '@fortawesome/free-solid-svg-icons';
import Search from './components/Search';
import './App.scss';

// adding this library so these icons can be used across multiple components
library.add(
  faCircleNotch,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faSun
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Chapel Weather.
        </p>
      </header>
      <Search />
    </div>
  );
}

export default App;
