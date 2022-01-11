import React from 'react'
import { GiConfirmed } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Confirm = () => {

    return (
        <div className='orderConfirmeContainer'>
            <div className="orderConfirme">
                <div className="orderSuccessIcon">
                    <GiConfirmed size={60} />
                </div>
                <div className="orderConfirmTitle">
                    Order Confirmed
                </div>
                <div className="orderConfirmSubTitle">
                    Your order is conirmed.You will receive an order confiramation email/sms
                    <br />
                    shortly with the expected delivery data for your items.
                </div>

                <div className="orderConvenieceContainer">
                    <div className="orderConvniece">
                        <div className=" orderConvenieceTitle">
                            <span>Now pay at your conveniece</span>
                            <span>New</span>
                        </div>
                        <div className='convnieceSubTitle'>Now you can pay online using Pay Now
                            option from orders or you can Pay on
                            Delivery  (Cash/Card/UPI)</div>
                        <div className='sewHowbtn'>sew How</div>
                    </div>
                    <div className="orderConvniecImg">
                        <img src="/images/orderCon.png" alt="" />
                    </div>
                </div>
                <div className="ChoppingBtns">
                    <div className='continueShopping'>
                        <Link to="/" className='continueShoppingBtn' >CONTINUE SHOPPING</Link>
                    </div>
                    <div className='viewOrderDet'>
                        <Link to='/user/orders' className='viewOrderDetBtn' >VIEW ORDER</Link>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Confirm
