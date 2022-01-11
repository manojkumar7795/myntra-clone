import React from 'react'
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Admin from './comopnents/admin/Admin.js';
import StoreFront from './comopnents/storeFront/StoreFront.js'


function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route path='/admin' component={Admin} />
        <Route path='/' component={StoreFront} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
