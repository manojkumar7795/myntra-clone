import React, { useContext } from 'react'
import { BiRupee } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { CartContext } from '../global/CartContext'
import Header from '../header'

const WishList = () => {
    var { shoppingCart, totalPrice, totalQty, totalRackPrice } = JSON.parse(localStorage.getItem('wishList'))
    var wishListData = []
    if (shoppingCart) {
        var emptyData = new Array(4 - shoppingCart.length % 4).fill(null)

        shoppingCart.map(wishlist => {
            wishListData.push(wishlist)
        })
    }
    const wishListconcatData = wishListData.concat(emptyData)
    const { dispatch } = useContext(CartContext)

    return (
        <>
            <Header />
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
                        <div className='wishListData-container pdr-30 pdb-30'>
                            {wishlist && <div>
                                <img className="wishListProductImage" src={wishlist.images[0]} alt="wishlistImg" />
                                <p>{wishlist.ProductSubtitle}</p>
                                <span className="totalSellPrice"><BiRupee /> {wishlist.TotalProductPrice}</span>
                                <span className="totalRackPrice"><del><BiRupee />{wishlist.TotalProductRackPrice}</del></span>
                                <div><button onClick={() => dispatch({ type: 'MOVE_TO_CART', id: wishlist.variantId, wishlist })}>MOVE TO BAG</button></div>
                            </div>}
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default WishList
