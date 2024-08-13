import React from 'react';
import { Provider, useSelector } from 'react-redux';
import './App.css';
import Map from "./components/Map";
import Controls from './components/Controls';
import store from './state/store';
import { IAppState } from './state/intial_state';
import Panel from './components/Panel';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <div className="App__grid">
          <div className="App__grid__controls-panel">
            <Controls />
          </div>
          <div className="App__grid__panel">
            <Panel />
          </div>
          <div className="App__grid__map-container">
            <div>
              <Map />
            </div>
          </div>
        </div>
      </Provider>
    </div>
  );
}

export default App;
