import React, { useState } from 'react'
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Icon from "awesome-react-icons";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Variant from './Variant';


const Sidebar = () => {
   
    return (     
          <Navigation
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
            />
      ) 
}

export default Sidebar
