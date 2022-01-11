import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { AiOutlineEye } from 'react-icons/ai';
import { db } from '../../confing/confing';

const Orders = () => {
    const [order, setOrder] = useState([])
    useEffect(() => {
        db.collection('orders').orderBy('orderId').startAfter(null).limit(40).get().then(result => {
            setOrder(() =>
                result.docs.map(product => product.data()))
        })

    }, [])
    const updateStates = (orderId) => {
        window.open(`/admin/orders/${orderId}`, '_self')
    }



    return (
        <Table responsive className='orderDetails'>
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment status</th>
                    <th>Fulfillment status</th>
                    <th>Items</th>

                </tr>
            </thead>
            <tbody>

                {order.map(orderData => {
                    return (
                        <tr onClick={() => updateStates(orderData.orderId)} style={{ "cursor": 'pointer' }}>
                            <td>#{orderData.orderId}</td>
                            <td>{orderData.orderDate}</td>
                            <td> {orderData.shipping_Address.name}</td>
                            <td>Rs.{orderData.totalPrice}</td>
                            <td> <span className={orderData.paymentStatus == 'Paid' ? 'paymentStatusPaid paymentStatus' : 'paymentStatus'}>{orderData.paymentStatus}</span></td>
                            <td>  <span className={orderData.FulfillmentStatus == 'Fulfillment' ? 'fulfillmentStatus fulfilledStatus' : 'fulfillmentStatus'}>{orderData.FulfillmentStatus} </span></td>
                            <td>{orderData.totalQty} Itms</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default Orders
