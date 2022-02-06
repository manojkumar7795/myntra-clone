import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { BiRupee } from 'react-icons/bi'
import { db } from '../../confing/confing'

const Customer = () => {
    const [customer, setCustomer] = useState([])
    const allOrdedr = async (customerDetail) => {
        const promises = [];
        customerDetail.forEach(CustomerOrders => {
            const promise = db.collection('orders')
                .where('customerId', '==', CustomerOrders.id).get().then(async orderSnapshot => {

                    CustomerOrders.order = orderSnapshot.docs.map(s => s.data())
                })
            promises.push(promise)
        });
        await Promise.all(promises)
        return customerDetail
    }
    useEffect(() => {
        db.collection('customer').orderBy('id').startAfter(null).limit(40).get().then(result => {
            allOrdedr(result.docs.map(product => product.data())).then(data => {
                setCustomer(data)
            })
        })
    }, [])
    const customerdetails = (customerId) => {
        window.open(`/admin/customer/${customerId}`, '_self')
    }



    return (
        <div>
            <div className='cutomerTitle'>Customer</div>
            <div className='customerOrderContainer'>
                {customer.map(customerDetail => {

                    return (
                        <div className='customerContainer' onClick={() => customerdetails(customerDetail.id)}>
                            <div className='customerOrderName'>{customerDetail.name}</div>
                            <div className='countOrdersContainer'>
                                <div className='countOrders'>{customerDetail.orderCount} Order</div>
                                {customerDetail.order.map(orderDetail => {
                                })}
                                <div className='orderPrice'> <BiRupee />{customerDetail.order.reduce((prev, o) => prev + o.totalPrice, 0)}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Customer
