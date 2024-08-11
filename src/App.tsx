import React from 'react';
import { Provider, useSelector } from 'react-redux';
import './App.css';
import Map from "./components/Map";
import Controls from './components/Controls';
import store from './state/store';
import { IAppState } from './state/intial_state';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Controls />
        <Map />
      </Provider>
    </div>
  );
}

export default App;
