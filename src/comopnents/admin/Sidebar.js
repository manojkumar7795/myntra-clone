import React, { useState } from 'react'
import { Collapse, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { BsTags } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import { VscTag } from "react-icons/vsc";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineCollectionsBookmark, MdCollectionsBookmark } from "react-icons/md";



const Sidebar = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div id="sidebar" className="mhfvh">
                <div className="sidebar-header">
                    <span className="name-icon text-uppercase">A</span>
                    <sapn className="name-icon-details">
                        <span>Ashish Yadav</span><br />
                        <a href="{{ path('su_logout') }}">Logout</a>
                    </sapn>
                </div>
                <Navbar id="sidebar">

                    <Nav defaultActiveKey="/admin/dashboard" className="flex-column">
                        <Nav.Link href="/admin/dashboard">
                            <AiOutlineDashboard />
                            <span>Dashboard</span>
                        </Nav.Link>
                        <Nav.Link eventKey="link-1" onClick={() => setOpen(!open)}>
                            <VscTag />
                            <span>Products</span>
                            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </Nav.Link>
                        <Collapse in={open}>
                            <Nav className="flex-column">
                                <Nav.Link href="/admin/products">
                                    <BsTags />
                                    <span>  All Products</span>
                                </Nav.Link>
                                <Nav.Link href ="/admin/collection-groups">
                                    <MdCollectionsBookmark />
                                    <span>Collection Groups</span>
                                </Nav.Link>
                                <Nav.Link href ="/admin/collections">
                                    <MdOutlineCollectionsBookmark />
                                    <span>Collections</span>
                                </Nav.Link>
                            </Nav>
                        </Collapse>
                    </Nav>

                    {/* <ul class="list-unstyled components">
            <li class="active">
              <a href="/su_home">Dashboard</a>
            </li>
            <li>
              <a href="#appUsersSubmenu" data-toggle="collapse" aria-expanded="false">Products</a>
              <ul class="collapse list-unstyled" id="appUsersSubmenu">
                <li><a href="">All Products</a></li>
                <li><a href="">Collaction Groups</a></li>
                <li ><a href="">Collactions</a></li>
              </ul>
            </li>
            <li >
              <a href="">Faqs</a>
            </li>
            <li >
              <a href="">Demo Stores</a>
            </li>
          </ul> */}
                </Navbar>
                {/* <Navigation
              // you can use your own router's api to get pathname
              activeItemId="/management/members"
              onSelect={({itemId}) => {
                window.open(itemId, "_self")
              }}
              items={[
                {
                  title: 'Dashboard',
                  itemId: '/dashboard',
                  // you can use your own custom Icon component as well
                  // icon is optional
                  elemBefore: () => <Icon name="inbox" />,
                },
                {
                  title: 'Products',
                  elemBefore: () => <Icon name="tag" />,
                  subNav: [
                    {
                      title: 'Collection Group',
                      itemId: '/collection_Group',
                    },
                    {
                      title: 'Collection',
                      itemId: '/Collection',
                    },
                    {
                      title: 'Products',
                      itemId: '/admin/product',
                    },
                    {
                      title: 'Product Variant',
                      itemId: '/admin/variant',
                    },
                  ],
                },
                {
                  title: 'Another Item',
                  itemId: '/another',
                  subNav: [
                    {
                      title: 'Teams',
                      itemId: '/management/teams',
                    },
                  ],
                },
              ]}
            /> */}
            </div>
        </>
    )
}

export default Sidebar
