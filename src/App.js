import React from 'react'
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Admin from './comopnents/admin/Admin.js';
import StoreFront from './comopnents/storeFront/StoreFront.js'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from  './services/Reducers/index'
const store = createStore(RootReducer)

function App() {


  return (
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/admin' component={Admin} />
        <Route path='/' component={StoreFront} />
      </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
