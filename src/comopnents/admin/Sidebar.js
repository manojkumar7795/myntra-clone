import React, { useState } from 'react'
import { Collapse, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { BsTags } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import { VscTag } from "react-icons/vsc";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineCollectionsBookmark, MdCollectionsBookmark } from "react-icons/md";
import { withRouter } from 'react-router';
import { FaCartArrowDown, FaUser } from 'react-icons/fa';



const Sidebar = (props) => {
    const location = props.location.pathname
    const isCustomer = location == "/admin/customer";
    const isDashboard = location == "/admin/dashboard"
    const isAllProducts = location == "/admin/products";
    const isCollectionGroups = location == '/admin/collection-groups';
    const isCollections = location == '/admin/collections';
    const isOrders = location == '/admin/orders';

    const [open, setOpen] = useState(isAllProducts || isCollectionGroups || isCollections);

    const product = () => {
        setOpen(!open)
    }

    return (
        <>

            <Navbar id="sidebar">
                <Nav className="flex-column">
                    {/* <Nav.Link href="/admin/dashboard" className={isDashboard ? "activeTab" : ''}>
                        <AiOutlineDashboard />
                        <span>Dashboard</span>
                    </Nav.Link> */}
                    <Nav.Link href={isOrders ? "#" : '/admin/orders'} className={isOrders ? 'activeTab' : ''}>
                        <AiOutlineDashboard />
                        <span>Orders</span>
                    </Nav.Link>
                    <Nav.Link href="/admin/customer" className={isCustomer ? "activeTab" : ''}>
                        <FaUser />
                        <span>Customer</span>
                    </Nav.Link>
                    <Nav.Link eventKey="link-2" onClick={() => product()} className={open ? 'activeTab' : ''}>
                        <VscTag />
                        <span>Products</span>
                        {open ? <IoIosArrowUp className="sidbarArrow" /> : <IoIosArrowDown className='sidbarArrow' />}
                    </Nav.Link>
                    <Collapse in={open}>
                        <Nav className="flex-column">
                            <Nav.Link className={isAllProducts ? 'activeTab' : ''} href={isAllProducts ? "#" : "/admin/products"} >
                                <BsTags />
                                <span>  All Products</span>
                            </Nav.Link>
                            <Nav.Link className={isCollectionGroups ? 'activeTab' : ''} href={isCollectionGroups ? '#' : '/admin/collection-groups'}  >
                                <MdCollectionsBookmark />
                                <span>Collection Groups</span>
                            </Nav.Link>
                            <Nav.Link className={isCollections ? 'activeTab' : ''} href={isCollections ? '#' : "/admin/collections"} >
                                <MdOutlineCollectionsBookmark />
                                <span>Collections</span>
                            </Nav.Link>
                        </Nav>
                    </Collapse>
                </Nav>
            </Navbar>
        </>
    )
}

export default withRouter(Sidebar)
