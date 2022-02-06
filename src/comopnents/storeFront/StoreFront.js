import LoderContainer from '../../containers/LoderContainer'
import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddProducts from '../AddProducts'
// import ProductDetails from './ProductDetails'
import { db, fAuth } from '../confing/confing'
// import { CartContextProvider } from '../global/CartContext'
import Myantra from '../myantra'
import ProductDetailsAdd from '../ProductDetailsAdd'
import ProductsDetails from '../ProductsDetails'
import SubmitForm from '../SubmitCollectionForm'
import Address from './Address'
import CollectionList from './CollectionList'
import Confirm from './Confirm'
import Payment from './Payment'
import Singup from './Singup'
import Login from './Login'
import User from './User'
import { BrowserRouter } from 'react-router-dom'
import CartContainer from '../../containers/CartContainer'
import ProductDetailsContainer from '../../containers/ProductDetailsContainer'
import WishLishtContainer from '../../containers/WishLishtContainer'
// import LoderContainer from "../../containers/LoderContainer"



const StoreFront = () => {
  const [state, setState] = useState({
    userName: null,
    userId: null
  });

  useEffect(() => {
    fAuth.onAuthStateChanged(user => {
      if (user) {
        db.collection('customer').doc(user.uid).get().then(snapshot => {
          setState({
            userName: snapshot.data().name,
            userId: user.uid
          })
          localStorage.setItem("userName", JSON.stringify(snapshot.data().name))
          localStorage.setItem('userId',JSON.stringify(user.uid))
        })
      }
      else {
        setState({
          userName: null,
          userId: null
        })
      }
    })
  }, [])

  return (
    // <CartContextProvider>
     
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={() => <Myantra/>}></Route>
            <Route path='/SubmitForm' component={SubmitForm}></Route>
            <Route path='/addproducts' component={AddProducts} />
            <Route path="/products/:slug/:id" component={() => <ProductsDetails/>} />
            <Route path='/ProductDetailsAdd' component={ProductDetailsAdd} />
            <Route path='/collections/:slug' component={LoderContainer.collection} />
            {/* <Route path='/products/:slug' component={ProductDetails} /> */}
            <Route path='/products/:slug' component={ProductDetailsContainer} />
            <Route path='/products' component={LoderContainer.searchProduct} />
            <Route path='/shop/:slug' component={CollectionList} />
            <Route path='/checkout/cart' component={CartContainer} />
            <Route path='/checkout/address' component={() => <Address/>} />
            <Route path='/checkout/payment' component={() => <Payment/>} />
            <Route path='/chekout/confirm/:slug' component={() => <Confirm  />} />
            <Route path='/login' component={Login} />
            <Route path='/singup' component={Singup} />
            <Route path='/wishlist' component={() => <WishLishtContainer/>} />
            <Route poth="/user" component={() => <User/>} />
          </Switch>
        </BrowserRouter>
    // </CartContextProvider>
  )
}

export default StoreFront
