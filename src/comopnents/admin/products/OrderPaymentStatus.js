import React, { useEffect, useState } from 'react'
import { Button, Image } from 'react-bootstrap';
import { BiArrowBack, BiRupee } from "react-icons/bi";
import { RiCheckboxBlankCircleFill } from "react-icons/ri"
import { MdOutlineRadioButtonUnchecked, MdCheckCircleOutline } from 'react-icons/md';
import { FcEngineering } from 'react-icons/fc';
import { db } from '../../confing/confing'

const OrderPaymentStatus = (props) => {
    const orderId = props.match.params.slug


    const [paymentStatusUpdate, setPaymentStatusUpdate] = useState('');
    useEffect(() => {
        db.collection('orders').where('orderId', "==", Number(orderId)).get().then(snapshot => {

            setPaymentStatusUpdate(snapshot.docs[0].data())
        })
    }, [])

    const updatefulfillmentStatus = (orderId) => {
        db.collection('orders').doc(`${orderId}`).update({
            FulfillmentStatus: 'Fulfillment'
        })
        setTimeout(() => {
            window.open(`/admin/orders/${orderId}`, '_self')
        }, 1000);
    }
    const updatePaymentStatus = (orderId) => {
        db.collection('orders').doc(`${orderId}`).update({
            paymentStatus: 'Paid'
        })
        setTimeout(() => {
            window.open(`/admin/orders/${orderId}`, '_self')
        }, 1000);
    }
    console.log('paymentStatusUpdate', paymentStatusUpdate)
    return (

        <div className='paymentStautsContainer'>
            <div className='paymentStatusHeader'>
                <div>
                    <a href="/admin/orders" className='backButton'><BiArrowBack size={25} /></a>
                    <span className='orderId'> #{paymentStatusUpdate.orderId}</span>
                    <span className={paymentStatusUpdate.paymentStatus == 'Paid' ? 'paymentStatus paymentStatusPaid' : 'paymentStatus'}>
                        {paymentStatusUpdate.paymentStatus}</span>
                    <span className={paymentStatusUpdate.FulfillmentStatus == 'Fulfillment' ? 'productUnfulfillmentStstus mgr20 fulfilledStatus' : 'productUnfulfillmentStstus mgr20'}>{paymentStatusUpdate.FulfillmentStatus}</span>
                </div>
                <div className='orderTitmeDate'>{paymentStatusUpdate.orderDate}</div>
            </div>
            <div className='paymentStatusSubcontainer' >
                <div className='paymentStatusLeftContainer'>
                    <div className='fulfilledContainer'>

                        <div>
                            {paymentStatusUpdate.FulfillmentStatus == 'Fulfillment' ?
                                <MdCheckCircleOutline className='reactIconCheck' size={20} /> :
                                <MdOutlineRadioButtonUnchecked className='reactIconUncheck' size={20} />
                            }

                            <span className='fulfillmentStatusTitle'>{paymentStatusUpdate.FulfillmentStatus}</span>
                            <span className='productQtyTitle'>({paymentStatusUpdate.totalQty})</span>
                        </div>
                        <div>
                            <ul className='pd0'>
                                {paymentStatusUpdate && paymentStatusUpdate.items.map(ordersItems => {
                                    return (
                                        <li className='ordersItems'>
                                            <div className='ordersItemsContainer'>
                                                <div className='ordersItemsSubContainer'>
                                                    <div className='orderProductImageContainer'>
                                                        <Image src={ordersItems.image} alt='orderProductImage' thumbnail className='paymentStatustproductImage' />
                                                        <span className='orderItemQty'>{ordersItems.qty}</span>
                                                    </div>
                                                    <div className='orderItemtitle'>{ordersItems.ProductSubtitle}</div>
                                                </div>
                                                <div className='orderItemTotalPrice'> <BiRupee />{ordersItems.TotalProductPrice}.00</div>
                                            </div>
                                        </li>
                                    )
                                })
                                }

                            </ul>
                        </div>
                        <div className={paymentStatusUpdate.FulfillmentStatus == "Fulfillment" ? 'displayNone' : 'fulfillmentStatusBtn'} >
                            <Button variant="success" onClick={() => updatefulfillmentStatus(paymentStatusUpdate.orderId)}>Fulfillment</Button>
                        </div>
                    </div>
                    <div className='productPaymentStatusContainer'>

                        <div>
                            {paymentStatusUpdate.paymentStatus == 'Paid' ?
                                <MdCheckCircleOutline className='reactIconCheck' size={20} /> :
                                <MdOutlineRadioButtonUnchecked className='reactIconUncheck' size={20} />
                            }
                            <span className='paymentStatusTitle'>{paymentStatusUpdate.paymentStatus}</span>
                        </div>
                        <div>
                            <ul className='pd0'>
                                <li className='ordersItems'>
                                    <div className='orderProductSubtotalContainer'>
                                        <div className='orderProductSubtotalSubContainer' >
                                            <div className='orderProductSubtotal'>
                                                Sutotal
                                            </div>
                                            <div className='orderItemCount'>{paymentStatusUpdate.totalQty} items</div>
                                        </div>
                                        <div className='orderItemSubTotalPrice'> <BiRupee />{paymentStatusUpdate.totalPrice}.00</div>
                                    </div>
                                </li>
                                <li className='ordersItems'>
                                    <div className='orderProductSubtotalContainer'>
                                        <div className='orderProducttotal'>
                                            Total
                                        </div>
                                        <div className='orderItemTotalPrice'><BiRupee />{paymentStatusUpdate.totalPrice}.00</div>
                                    </div>
                                </li>
                            </ul>
                            <div className='paymentPaidStatus'>
                                <div> Paid by Customer</div>
                                <div>{paymentStatusUpdate.paymentStatus == 'Paid' ? <div><BiRupee />
                                    {paymentStatusUpdate.totalPrice}.00 </div> : <div><BiRupee /> 0.00 </div>}</div>
                            </div>
                        </div>
                        <div className={paymentStatusUpdate.paymentStatus == "Paid" ? 'displayNone' : 'paymentStatusBtn'}>
                            <Button variant="success" onClick={() => updatePaymentStatus(paymentStatusUpdate.orderId)}>Paid</Button>
                        </div>
                    </div>
                </div>
                <div className='paymentStatusRightContainer'>
                    {paymentStatusUpdate && <div className='CustomerDetails'>
                        <div className='customerDetailsContainer'>
                            <div className='customerNameHeader'>Customer</div>
                            <div className='customerName'>{paymentStatusUpdate.shipping_Address.name}</div>
                        </div>
                        <div className='customerDetailsContainer'>
                            <div className='customerCotactDetails'>Contact Details</div>
                            <div className='customerMnumber'>{paymentStatusUpdate.shipping_Address.mobile}</div>
                        </div>
                        <div className='customerDetailsContainer borderNone'>
                            <div className='customerAddress'>SHIPPING ADDRESS</div>
                            <div className='customerName'>{paymentStatusUpdate.shipping_Address.name}</div>
                            <div className='customerHomeAddress'>{paymentStatusUpdate.shipping_Address.homeAddress}</div>
                            <div className='customerTown'>{paymentStatusUpdate.shipping_Address.town}</div>
                            <div className='customerDistricty'>{paymentStatusUpdate.shipping_Address.district}</div>
                            <div className='customerstate'>{paymentStatusUpdate.shipping_Address.state}</div>
                            <div className='customerPincode'>{paymentStatusUpdate.shipping_Address.pincode}</div>

                        </div>
                    </div>}

                </div>
            </div>

        </div>
    )
}

export default OrderPaymentStatus
