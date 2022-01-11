import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Sidebar from './Sidebar'
import CollectionGroup from './products/CollectionGroups'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap'
import Products from "./products/Products"
import ProductDetails from './products/ProductDetails'
import Variants from './products/Variants'
import Variant from './products/Variant'
import Collections from './products/Collections'
import Collection from './products/Collection'
import CollectionGroupDetails from './products/CollectionGroupDetails'
import CollectionGroups from './products/CollectionGroups'
import { Login } from './Login'
import Orders from './products/Orders'
import OrderPaymentStatus from './products/OrderPaymentStatus'
import Customer from './products/Customer'




const Admin = () => {


    const userAuth = () => {
        if (localStorage.auth_info) {
            const authInfo = JSON.parse(localStorage.getItem('auth_info'))
            if (authInfo.timestamp <= Date.now()) {
                localStorage.removeItem("auth_info")
                return false;
            }
            authInfo.timestamp = Date.now() + (30 * 60000)
            localStorage.setItem('auth_info', JSON.stringify(authInfo))
            return true;
        }
    }

    let colUserCount = 0
    if (localStorage.auth_info) {
        colUserCount = 3
    }
    const logout = () => {
        localStorage.removeItem("auth_info");
    }


    return (
        <Container fluid  >
            <Row>
                {userAuth() &&
                    <Col md={colUserCount} className="pl0 max-hight">
                        <div id="sidebar" className="mhfvh">
                            <div className="sidebar-header">
                                <span className="name-icon text-uppercase">A</span>
                                <sapn className="name-icon-details">
                                    <span>Ashish Yadav</span><br />
                                    <a href="/admin/" onClick={logout} >Logout</a>
                                </sapn>
                            </div>
                            <Sidebar />
                        </div>
                    </Col>
                }
                <Col md={12 - colUserCount} className="pr0 ofya">
                    <BrowserRouter>
                        {userAuth() ?

                            <Switch>
                                <Route path='/admin/products/:pid/variants/:vid' component={Variant} />
                                <Route path='/admin/products/:pid/variants' component={Variants} />
                                <Route path='/admin/products/:pid' component={ProductDetails} />
                                <Route path='/admin/collection-groups/:cgId' component={CollectionGroupDetails} />
                                <Route path='/admin/collection/:cid' component={Collection} />
                                <Route path='/admin/collection-groups' component={CollectionGroups} />
                                <Route path='/admin/collections' component={Collections} />
                                <Route path='/admin/products' component={Products} />
                                <Route path='/admin/orders/:slug' component={OrderPaymentStatus} />
                                <Route path='/admin/orders' component={Orders} />
                                <Route path='/admin/customer' component={Customer} />
                            </Switch>
                            :
                            <Switch>
                                <Route path='/admin' component={Login} />
                            </Switch>
                        }
                    </BrowserRouter>
                </Col>
            </Row>
        </Container>
    )
}

export default Admin
