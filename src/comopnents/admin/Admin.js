import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Sidebar from './Sidebar'
import Variant from './Variant'
import ProductDetails from './ProductDetails'
import Product from './Product'

const Admin = () => {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="absolute-right">
                <BrowserRouter>
                    <Switch>
                        <Route path='/admin/product' component={Product} />
                        <Route path='/admin/variants/:pid' component={Variant} />
                        <Route path='/admin/products/:pid' component={ProductDetails} />
                        <Route path='/admin/variants' component={Variant} />
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default Admin
