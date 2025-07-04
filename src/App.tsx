import React from 'react';
import './App.css';
import MenuComponent from './Components/MenuComponent';
import { Provider } from 'react-redux';
import store from './redux_toolkit/store';

function App() {
  return (
    <div >
      <Provider store={store}>
        <MenuComponent />
      </Provider>
    </div>
  );
}

export default App;
