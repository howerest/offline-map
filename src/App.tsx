import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Map from "./components/Map";
import Controls from './components/Controls';
import store from './state/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Controls />
        <Map mapMode="online" />
      </Provider>
    </div>
  );
}

export default App;
