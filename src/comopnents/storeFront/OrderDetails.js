import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import { BiRupee } from 'react-icons/bi';
import { MdArrowForwardIos } from 'react-icons/md';
import { db } from '../confing/confing'

const OrderDetails = (props) => {
    const index = props.match.params.i;
    const id = props.match.params.id;


    const [orderDetails, setOrderDetails] = useState([])

    useEffect(() => {
        db.collection('orders').where('orderId', '==', Number(id)).get().then(snapshot => {
            setOrderDetails(snapshot.docs.map(querySnapshot => querySnapshot.data()))

        })
    }, [])


    const otherItemShow = (index) => {
        window.open(`/user/orders/${index}/${id}`, '_self')
    }
    return (
        <div style={{ "overflow": 'auto', "height": '100vh' }}>
            {orderDetails.length > 0 && <div className='orderDetailsComponent'>
                <div className='orderItemsDetails'>
                    <div className='orderItemsDetails-itemInfo'>
                        <div className='itemInfo-Thumbnail'>
                            <img src={orderDetails[0].items[index].image} alt="" className='itemInfo-image' />
                        </div>
                        <div className='itemInfo-itemName'>
                            {orderDetails[0].items[index].ProductSubtitle}
                        </div>
                    </div>
                    <div className='orderItemPrice'>
                        <div className='orderPriceDetails'>
                            <div className='orderPriceDetailsContainer'>
                                <div className='priceDetails-itemPrice'>
                                    <p>Total Item Price</p>
                                    <p><BiRupee />{orderDetails[0].items[index].TotalProductPrice}.00</p>
                                </div>
                                <div className="itemDiscountPrice-constainer">
                                    <div className='itemDiscountPrice'>
                                        <span>You Saved</span>
                                        <span style={{ 'color': 'rgb(3, 166, 133)', 'fontWeight': 600 }}><BiRupee />{orderDetails[0].items[index].TotalProductRackPrice}.00</span>
                                        <span> on this item</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ 'backgroundColor': "white", 'padding': '0 4.44% 16px' }}>
                                <div className='paidBy-container'>
                                    <div className='paidBy-wrapper'>
                                        <span className='codImg-cod' ></span>
                                        <p className='mgb0' style={{ "fontSize": '14px' }}>Pay on delivery.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={orderDetails[0].items.length == 1 ? 'displayNone' : 'itemDetails-otherItem'}>
                            <div className='otehrItem-penal'>
                                <div className='otherItem-title'> Other items in this order</div>
                                <div className='otherItem-container'>
                                    <div className='orderItem-orderId'>Order ID # {orderDetails[0].orderId}</div>

                                    <div>
                                        <div className='otherItemsInfo'>
                                            <div className='otherItemsInfo-List'>
                                                {orderDetails[0].items.map((item, i) => {
                                                    return (
                                                        <div className={index == i ? "displayNone" : 'otherItem-wraper'} onClick={() => otherItemShow(i)} key={i}>
                                                            <div className='orderItemContainer ' >
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
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='orderPriceDetailsContainer'>
                                    <div className='priceDetails-itemPrice'>
                                        <p>Total Order Price</p>
                                        <p><BiRupee />{orderDetails[0].totalPrice}.00</p>
                                    </div>
                                    <div className="itemDiscountPrice-constainer">
                                        <div className='itemDiscountPrice'>
                                            <span>You Saved</span>
                                            <span style={{ 'color': 'rgb(3, 166, 133)', 'fontWeight': 600 }}><BiRupee />{orderDetails[0].totalRackPrice}.00</span>
                                            <span> on this item</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default OrderDetails
