import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import { MdArrowForwardIos } from 'react-icons/md';
import { db } from '../confing/confing';

const Orders = (props) => {
    const userId = props.userId
    const [orders, setOrders] = useState([]);
    // feach orders 
    useEffect(() => {
        db.collection('orders').where('customerId', '==', userId).get().then(snapshot => {
            setOrders(snapshot.docs.map(querySnapshot => querySnapshot.data()))

        })
    }, [])
    const viewOrderDetails = (orderId, index) => {
        window.open(`/user/orders/${index}/${orderId}`, '_self')
    }

    return (
        <div className='orderContainer'>
            <div className="orderItemHeader">
                <span>Showing</span>
                <span>All Orders</span>
            </div>
            {orders && orders.map(order => {
                return (
                    order.items.map((item, i) => {
                        return (
                            <div className="orderItemContainer-padding" key={item.ProductSubtitle}>
                                <div className='orderItemContainer' onClick={() => viewOrderDetails(order.orderId, i)} >
                                    <div className="orderItemDetailsContainer">
                                        <div className='orderPriductList-thumbnail'>
                                            <Image src={item.image} thumbnail />
                                        </div>
                                        <div className='orderProductList-name'>
                                            <div>{item.ProductSubtitle}</div>
                                            {/* <div>man</div>
                                        <div>M</div> */}
                                        </div>
                                    </div>
                                    <div><MdArrowForwardIos /></div>
                                </div>
                            </div>
                        )
                    })
                )
            })}

        </div>
    )
}

export default Orders
