import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddProducts from '../AddProducts'
import ProductDetails from './ProductDetails'
import { db, fAuth } from '../confing/confing'
import { CartContextProvider } from '../global/CartContext'
import Myantra from '../myantra'
import ProductDetailsAdd from '../ProductDetailsAdd'
import ProductsDetails from '../ProductsDetails'
import SubmitForm from '../SubmitCollectionForm'
import Address from './Address'
import Cart from './Cart'
import Collection from './Collection'
import CollectionList from './CollectionList'
import Confirm from './Confirm'
import Payment from './Payment'
import Singup from './Singup'
import Login from './Login'
import User from './User'
import WishList from './WishList'
import { BrowserRouter } from 'react-router-dom'
import SearchProduct from './SearchProduct'

const StoreFront = () => {
  const [state, setState] = useState({
    user: null,
    userId: null
  });

  useEffect(() => {
    fAuth.onAuthStateChanged(user => {
      if (user) {
        db.collection('customer').doc(user.uid).get().then(snapshot => {
          setState({
            user: snapshot.data().name,
            userId: user.uid
          })
          localStorage.setItem("userName", JSON.stringify(snapshot.data().name))
        })
      }
      else {
        setState({
          user: null,
          userId: null
        })
      }
    })
  }, [])
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={() => <Myantra user={state.user} />}></Route>
          <Route path='/SubmitForm' component={SubmitForm}></Route>
          <Route path='/addproducts' component={AddProducts} />
          <Route path="/products/:slug/:id" component={() => <ProductsDetails user={state.user} userId={state.userId} />} />
          <Route path='/ProductDetailsAdd' component={ProductDetailsAdd} />
          <Route path='/collections/:slug' component={Collection} />
          <Route path='/products/:slug' component={ProductDetails} />
          <Route path='/products' component={SearchProduct} />
          <Route path='/shop/:slug' component={CollectionList} />
          <Route path='/checkout/cart' component={() => <Cart user={state.user} userId={state.userId} />} />
          <Route path='/checkout/address' component={() => <Address user={state.user} userId={state.userId} />} />
          <Route path='/checkout/payment' component={() => <Payment user={state.user} userId={state.userId} />} />
          <Route path='/chekout/confirm/:slug' component={() => <Confirm user={state.user} userId={state.userId} />} />
          {/* <Route  path='/user/account/' component={()=><Accounts userId={state.userId} />}/> */}
          <Route path='/login' component={Login} />
          <Route path='/singup' component={Singup} />
          <Route path='/wishlist' component={() => <WishList user={state.user} userId={state.userId} />} />
          {/* <Route poth='/user' component={NavLink}/> */}
          <Route poth="/user" component={() => <User user={state.user} userId={state.userId} />} />
        </Switch>
      </BrowserRouter>
    </CartContextProvider>
  )
}

export default StoreFront
