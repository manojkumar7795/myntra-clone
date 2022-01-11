import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../global/CartContext';
import { BiRupee } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { db } from '../confing/confing';
import firebase from 'firebase/compat/app';
import UserHeader from './UserHeader';


const Payment = (props) => {
    const userName = props.user;
    const userId = props.userId;
    const [customer, setCustomer] = useState({})

    const { dispatch } = useContext(CartContext)


    var { shoppingCart, totalPrice, totalQty, totalRackPrice } = JSON.parse(localStorage.getItem('localCart'))

    let shopingData = []
    shoppingCart.map(shoppingCartDataObj => {
        shopingData.push({
            ProductSubtitle: shoppingCartDataObj.ProductSubtitle,
            TotalProductPrice: shoppingCartDataObj.TotalProductPrice,
            TotalProductRackPrice: shoppingCartDataObj.TotalProductRackPrice,
            qty: shoppingCartDataObj.qty,
            productId: shoppingCartDataObj.productId,
            variantId: shoppingCartDataObj.variantId,
            image: shoppingCartDataObj.images[0],
        })
    })
    let myCurrentDate = new Date();
    let orderDate = myCurrentDate.getFullYear() + '/' + (myCurrentDate.getMonth() + 1) + '/' + myCurrentDate.getDate() + ' at ' + myCurrentDate.getHours() + ':' + myCurrentDate.getMinutes();

    const generateOrderId = () => {
        return Date.now() + Math.floor(1000 + Math.random() * 9000)
    }
    const orderId = generateOrderId()
    // var address = JSON.parse(localStorage.getItem('userInfo'))


    const addressData = async (addressArray) => {
        if (addressArray.addressId.length > 0) {
            const promises = [];
            const promise = db.collection('address')
                .where('id', 'in', addressArray.addressId).get().then(async addressSnapshot => {

                    addressArray.address = addressSnapshot.docs.map(s => s.data())
                })
            promises.push(promise)
            await Promise.all(promises);

        }
        return addressArray;

    }
    // feach data 
    useEffect(() => {

        db.collection('customer').doc(`${userId}`).get().then(snapshot => {
            const AddressData = snapshot.data();
            addressData(AddressData).then(data => {
                setCustomer(data)
            })
        })
    }, [])
    // increment Customer Order
    const incrementOrder = () => {
        db.collection('customer').doc(`${userId}`).update({
            orderCount: firebase.firestore.FieldValue.increment(1)
        })
    }
    // add order in db 
    const addOrder = () => {
        db.collection('orders').doc(`${orderId}`).set({
            orderId: orderId,
            customerId: userId,
            items: shopingData,
            totalPrice,
            totalQty,
            totalRackPrice,
            paymentStatus: 'Pending',
            FulfillmentStatus: 'Unfulfillment',
            orderDate: orderDate,
            shipping_Address: {
                name: customer.name,
                mobile: customer.mobile,
                pincode: customer.address[0].pincode,
                homeAddress: customer.address[0].homeAddress,
                town: customer.address[0].town,
                district: customer.address[0].district,
                state: customer.address[0].state
            }
        }).catch(err => {
            console('error', err.message)
        });
        incrementOrder()

    }

    return (
        <>
            <UserHeader />

            <div className='paymentStatusContainer'>
                <div className="paymentStatus-Left">
                    <div className="bankPaymentOffer">
                        <div className="bankOfferTitle">
                            {/* <div className='bankOfferTitleImg'></div> */}
                            Bank Offer
                        </div>
                        <div className="bankOfferSubTitle">
                            <li>
                                10% Instant Discount on Kotak Credit and Debit Cards on a min spend of Rs 3,000. TCA
                            </li>
                            <div className='ShowHideBtn'>
                                <span>Show More</span>
                                <span className='showBankOfferImage showBankOffer'></span>
                            </div>
                        </div>
                    </div>
                    <div className="choosePaymentMode">
                        Choose Payment Mode
                    </div>
                    <div className="cashOnDeliveryContainer">
                        <div className="cashonDelivery">
                            <div>CASH ON DELIVERY</div>
                            <div>(CASH/CARD/UPI)</div>
                        </div>
                    </div>
                    <div className='paymentHelpText'>
                        You can pay via Cash/Card or UPI enabled app at the time of delivery.
                        Ask your delivery executive for these options.
                    </div>
                    <div className="placeOrder">
                        <Link to={`/chekout/confirm/${orderId}`} className='placeOrderBtn' onClick={() => { dispatch({ type: 'EMPTY' }); addOrder() }}>
                            PLACE ORDER
                        </Link>
                    </div>
                </div>
                <div className="paymentStatus-Right">
                    {shoppingCart.length > 0 && <div>
                        <div className="itemDetails">
                            PRICE DETAILS({totalQty} Items)
                        </div>
                        <div className="totalPrice">
                            <span>Total MRP</span>
                            <span> <BiRupee /> {totalPrice + totalRackPrice}</span>
                        </div>
                        <div className="rackPrice">
                            <span>Discount on MRP</span>
                            <span className='disscountPrice'>-<BiRupee /> {totalRackPrice}</span>
                        </div>
                        <div className="totalAmount">
                            <span>Total Amount</span>
                            <span><BiRupee /> {totalPrice}</span>
                        </div>
                    </div>
                    }

                </div>

            </div>
        </>
    )
}

export default Payment
