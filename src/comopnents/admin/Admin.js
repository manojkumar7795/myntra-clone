import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Sidebar from './Sidebar'
import Variant from './Variant'
import ProductDetails from './ProductDetails'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap'
import Products from './Products'
import CollectionGroup from './CollectionGroup'


const Admin = () => {
    return (
        <Container fluid  >
            <Row>
                <Col md={3} className="pl0 max-hight">
                    <Sidebar />
                </Col>
                <Col md={9} className="pr0 ofya">
                    <BrowserRouter>
                        <Switch>
                            <Route path='/admin/products/:pid' component={ProductDetails} />
                            <Route path='/admin/collection-groups' component={CollectionGroup} />
                            <Route path='/admin/products' component={Products} />
                            <Route path='/admin/variants/:pid' component={Variant} />
                            <Route path='/admin/variants/:vid' component={Variant} />
                        </Switch>
                    </BrowserRouter>
                </Col>
            </Row>
        </Container>
    )
}

export default Admin
