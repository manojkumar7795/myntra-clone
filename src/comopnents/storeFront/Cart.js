import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../global/CartContext';
import { BiRupee } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { IoMdRemove } from "react-icons/io";
import { VscAdd } from "react-icons/vsc";
import UserHeader from './UserHeader';
import { db } from '../confing/confing';



const Cart = (props) => {
    const userId = JSON.parse(localStorage.getItem('userId'))
    const userName = JSON.parse(localStorage.getItem('userName'))
// var { shoppingCart, totalPrice, totalQty, totalRackPrice } = props.data
    var { shoppingCart, totalPrice, totalQty, totalRackPrice } = JSON.parse(localStorage.getItem('localCart'))
    const moveToWishList = () => {
        const wishListData = {
            shoppingCart,
            totalPrice,
            totalRackPrice,
            totalQty,
            userId:userId
        }
        db.collection("wishList").doc(`${userId}`).set(wishListData).then(() => {
            props.EmptyHandler()
        })
        db.collection("wishList").doc(`${userId}`).get().then(snapshot=>{
            localStorage.setItem("wishList", JSON.stringify(snapshot.data()))
        })
        
    }
    return (
        <>
            <UserHeader />
            <div className='empty-cart-container'>
                {
                    shoppingCart.length === 0 && <>
                        <img className='cart-image-banner' src="https://constant.myntassets.com/checkout/assets/img/empty-bag.png" alt="" />
                        <div className='empty-cart-title'>Hey, it feels so light!</div>
                        <div className='empty-cart-dec'>There is nothing in your bag. Let's add some items.</div>
                        <div><Link className='empty-cart-wishlist' to="/wishlist">ADD ITEMS FROM WISHLIST</Link></div>
                    </>
                }
            </div>
            <div className='cart-container'>
                {shoppingCart.length > 0 && <div className="cartProductBlock">
                    <div className="removeItemButtonContainer">
                        <button className='RemoveAllItem' onClick={() => props.EmptyHandler()}>REMOVE</button>
                        <button className='empty-cart-wishlist' onClick={() => moveToWishList()}>MOVE TO WISHLIST</button>
                    </div>
                    {shoppingCart && shoppingCart.map(cartProduct => {

                        return (
                            <div className='productContainer'>
                                <div className="cartImageContainer">
                                    <img className='cartImage' src={cartProduct.images[0]} alt="not found" />
                                </div>
                                <div className="productCartDetails">
                                    <div className="removeCartItemAndTitle">
                                        <div className="cartTitle">{cartProduct.productTitle}</div>
                                        <button className='removeItemButton' onClick={() =>props.DeleteHandler({ id: cartProduct.variantId, cartProduct })}>
                                            <VscAdd size={25} className='removeItem' />
                                        </button>
                                    </div>
                                    <div className="cartSubtitle">{cartProduct.ProductSubtitle}</div>
                                    <div className="soldBy">Sold by : {cartProduct.inventory.sku}</div>

                                    <div className="cartProductQtyContainer">
                                        <IoMdRemove className='cartProductQtyDec' onClick={() => props.DecHandler({ id: cartProduct.variantId, cartProduct })} />
                                        <span className='cartProductQty' >
                                            Qty : {cartProduct.qty}
                                        </span>
                                        <GrAdd className='cartProductQtyIns' onClick={() => props.IncHandler({id: cartProduct.variantId, cartProduct })} />
                                    </div>
                                    <span className="totalSellPrice"><BiRupee /> {cartProduct.TotalProductPrice}</span>
                                    <span className="totalRackPrice"><del><BiRupee />{cartProduct.TotalProductRackPrice}</del></span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                }
                {shoppingCart.length > 0 && <div className="cartCashBlock">
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
                    <div>

                        <Link className='orderButton' to={userName ? '/checkout/address' : '/login'}>
                            PLACE ORDER
                        </Link>


                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default Cart
