import React, { useContext } from 'react'
import { BiRupee } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { db } from '../confing/confing'
import { CartContext } from '../global/CartContext'
import Header from '../header'
import firebase from 'firebase/compat/app';


const WishList = (props) => {
    const userId = JSON.parse(localStorage.getItem('userId'))
    var { shoppingCart, totalPrice, totalQty, totalRackPrice } = JSON.parse(localStorage.getItem('wishList'))
    var wishListData = []
    if (shoppingCart) {
        var emptyData = new Array(4 - shoppingCart.length % 4).fill(null)

        shoppingCart.map(wishlist => {
            wishListData.push(wishlist)
        })
    }
    const wishListconcatData = wishListData.concat(emptyData)

    const deleteItem = (item) => {
        const filtered = shoppingCart.filter(wishlistProduct => wishlistProduct.variantId !== item.variantId)
        localStorage.setItem("wishList", JSON.stringify({
            shoppingCart: [...filtered],
            totalQty: totalQty - item.qty,
            totalPrice: totalPrice - item.pricing.sellPrice,
            totalRackPrice: totalRackPrice - item.pricing.rackPrice
        }));

        db.collection('wishList').doc(`${userId}`).update({
            shoppingCart: firebase.firestore.FieldValue.arrayRemove(item),
            totalQty: totalQty - item.qty,
            totalPrice: totalPrice - item.pricing.sellPrice,
            totalRackPrice: totalRackPrice - item.pricing.rackPrice

        })
    }
    return (
        <>
            <Header />
            {shoppingCart.length > 0 && <div className='searchProHeaderCon'>
                <span > My Wishlist :</span>
                <span> {totalQty}  item</span>
            </div>}
            {shoppingCart.length == 0 && <div className="wishlistEmpty-container">
                <div className="wishlistEmpty-heading">YOUR WISHLIST IS EMPTY</div>
                <div className="wishlistEmpty-info">Add items that you like to your wishlist. Review them anytime and easily move them to the bag.</div>
                <div className="wishlistEmpty-icon-sprite wishlistEmpty-icon"></div>
                <div>
                    <Link to='/' className="wishlistEmpty-button">CONTINUE SHOPPING </Link>
                </div>
            </div>}
            <div className="wishlist-container">
                {wishListconcatData && wishListconcatData.map(wishlist => {
                    return (
                        <div className='wishListData-container pdr-30 pdb-30' >
                            {wishlist && <div>
                                <img className="wishListProductImage" src={wishlist.images[0]} alt="wishlistImg" />
                                <div className='wishlisht-data-wrapper'>
                                    <p>{wishlist.ProductSubtitle}</p>
                                    <div style={{ 'paddingBottom': '10px' }}>
                                        <span className="totalSellPrice"> Rs.{wishlist.TotalProductPrice}</span>
                                        <span className="totalRackPrice">Rs.{wishlist.TotalProductRackPrice}</span>
                                    </div>
                                    <button onClick={() => { props.MoveToCartHandler({ id: wishlist.variantId, wishlist }); deleteItem(wishlist) }}>MOVE TO BAG</button>
                                </div>
                            </div>}
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default WishList
