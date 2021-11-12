
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Myantra from './comopnents/myantra';
import SubmitForm from './comopnents/SubmitCollectionForm';
import AddProducts from './comopnents/AddProducts';
import Products from './comopnents/products';
import ProductDetailsAdd from './comopnents/ProductDetailsAdd';
import ProductsDetails from './comopnents/ProductsDetails';
import Admin from './comopnents/admin/Admin.js';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Myantra}></Route>
        <Route path='/SubmitForm' component={SubmitForm}></Route>
        <Route path='/addproducts' component={AddProducts}/>
        <Route path="/products/:slug/:id"  component= {ProductsDetails}/>
        <Route path="/products"  component= {Products}/>
        <Route path='/ProductDetailsAdd' component={ProductDetailsAdd}/>
        <Route path='/admin' component={Admin}/>
        
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
