import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
const NavLink = (props) => {

    const user = props.user
    const location = window.location.pathname
    const isOrders = location == '/user/orders'
    const isProfile = location == '/user/account'
    const isAddresses = location == '/user/address'
    return (
        <>
            <Navbar id="userAccount">
                <Nav className="flex-column account-flex-column">
                    <Nav.Link href="/user/orders" className={isOrders ? "activeNavlink" : ''}>
                        <span>Orders</span>
                    </Nav.Link>
                    <Nav.Link href="/user/account" className={isProfile ? "activeNavlink" : ''}>
                        <span>Profile</span>
                    </Nav.Link>
                    <Nav.Link href="/user/address" className={isAddresses ? "activeNavlink" : ''}>
                        <span>Addresses</span>
                    </Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}

export default NavLink
