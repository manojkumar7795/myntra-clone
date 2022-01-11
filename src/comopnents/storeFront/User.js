import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Accounts from './Accounts'
import Addressess from './Addressess'
import NavLink from './NavLink'
import OrderDetails from './OrderDetails'
import Orders from './Orders'

const User = (props) => {
    const userId = props.userId
    const user = props.user
    let colUserCount = 0
    if (userId) {
        colUserCount = 2
    }
    return (
        <Container fluid>
            <Row>
                {userId &&
                    <Col md={colUserCount} className="pl0 max-hight">
                        <div id="userAccount" className="userAcount">
                            <div className="Account-header-container">
                                <div className="account-header">Account</div>
                                <div>{user}</div>
                            </div>
                        </div>
                        <NavLink />
                    </Col>
                }
                <Col md={12 - colUserCount} className="pr0 ofya accountBorder">
                    <BrowserRouter>
                        {user &&
                            <Switch>
                                <Route path='/user/orders/:i/:id' component={OrderDetails} />
                                <Route path='/user/account/' component={() => <Accounts userId={userId} />} />
                                <Route path='/user/orders' component={() => <Orders userId={userId} />} />
                                <Route path='/user/address' component={() => <Addressess userId={userId} />} />
                            </Switch>}
                    </BrowserRouter>
                </Col>
            </Row>
        </Container>
    )
}

export default User
