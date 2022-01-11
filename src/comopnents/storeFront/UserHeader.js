import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'

const UserHeader = (props) => {
    // const location = props.location.pathname
    const queryParams = useLocation().pathname;
    const isCart = queryParams == "/checkout/cart";
    const isAddress = queryParams=='/checkout/address'
    const isPayment = queryParams=='/checkout/payment'
    
    return (
        <div className='mainHeader'>
            <div className="logo-container">
                <a href="/" className="logo-anchor"><i></i></a>
            </div>
            <Navbar variant="light" >
                <Container>
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Nav className="me-auto">
                        <Nav.Link  className={isCart ? "activeNavlink borderUserHeader" : ''} >CART</Nav.Link>
                        <Nav.Link className={isAddress ? "activeNavlink borderUserHeader" : ''}>ADDRESS</Nav.Link>
                        <Nav.Link className={isPayment ? "activeNavlink borderUserHeader" : ''}>PAYMENT</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default UserHeader
