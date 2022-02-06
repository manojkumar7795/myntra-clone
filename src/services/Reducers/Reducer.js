import { ADD_TO_CART } from "../constants/constants"
import {MOVE_TO_CART} from '../constants/constants'
import {INC} from '../constants/constants'
import {DEC} from '../constants/constants'
import {DELETE} from '../constants/constants'
import {EMPTY} from '../constants/constants'
const initialState = {
    shoppingCart: [],
    totalPrice: 0,
    totalQty: 0,
    totalRackPrice: 0,
    cartId: 0
}
const cartItem = (state = initialState, action) => {
    if (JSON.parse(localStorage.getItem('localCart'))) {
        var { shoppingCart, totalPrice, totalQty, totalRackPrice, cartId } = JSON.parse(localStorage.getItem('localCart'))
    }
    else {

        var { shoppingCart, totalPrice, totalQty, totalRackPrice, cartId } = state;
    }
    const generateCartId = () => {
        return Date.now() + Math.floor(1000 + Math.random() * 9000)
    }
    let product;
    let index;
    let updatedPrice;
    let updatedQty;
    let variant;
    let updatedRackPrice;
    let updateCartId;
    switch (action.type) {

        case ADD_TO_CART:

            const check = shoppingCart.find(product => product.variantId === action.data.id);
            if (check) {
                // console.log('this product is already in your cart')
                // toast.info('this product is already in your cart', {
                //     position: "top-right",
                //     autoClose: 2000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: false,
                //     draggable: false,
                //     progress: undefined,
                // });
                return state;
            }
            else {
               

                variant = action.data.product.variant.variants[action.data.product.currentVariant];
                product = action.data.product.variant
                variant['ProductSubtitle'] = product.subTitle;
                variant['productTitle'] = product.title;
                variant['qty'] = 1;
                variant['TotalProductPrice'] = variant.pricing.sellPrice * variant.qty;
                variant['TotalProductRackPrice'] = variant.pricing.rackPrice * variant.qty;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + variant.pricing.sellPrice;
                updatedRackPrice = totalRackPrice + variant.pricing.rackPrice;
                updateCartId = generateCartId()

                const addTocart = {
                    shoppingCart: [variant, ...shoppingCart],
                    totalPrice: updatedPrice,
                    totalQty: updatedQty,
                    totalRackPrice: updatedRackPrice,
                    cartId: updateCartId
                }
                localStorage.setItem("localCart", JSON.stringify(addTocart));
                return addTocart
            }
        case MOVE_TO_CART:
            variant = action.data.wishlist;
            updatedQty = ++totalQty;
            variant.TotalProductPrice = variant.qty * variant.pricing.sellPrice;
            variant.TotalProductRackPrice = variant.qty * variant.pricing.rackPrice
            updatedPrice = totalPrice + variant.pricing.sellPrice;
            updatedRackPrice = totalRackPrice + variant.pricing.rackPrice;
            const movetocart = {
                shoppingCart: shoppingCart.concat(variant),
                totalPrice: updatedPrice,
                totalQty: updatedQty,
                totalRackPrice: updatedRackPrice

            }
            localStorage.setItem("localCart", JSON.stringify(movetocart));
            return movetocart

        case INC:
            variant = action.data.cartProduct;
            variant.qty = variant.qty + 1;
            variant.TotalProductPrice = variant.qty * variant.pricing.sellPrice;
            variant.TotalProductRackPrice = variant.qty * variant.pricing.rackPrice
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + variant.pricing.sellPrice;
            updatedRackPrice = totalRackPrice + variant.pricing.rackPrice;
            index = shoppingCart.findIndex(cartProduct => cartProduct.variantId === action.data.id);
            shoppingCart[index] = variant;

            const inc = {
                shoppingCart: [...shoppingCart],
                totalPrice: updatedPrice,
                totalQty: updatedQty,
                totalRackPrice: updatedRackPrice
            }
            localStorage.setItem("localCart", JSON.stringify(inc));
            return inc


        case DEC :
            variant = action.data.cartProduct;
            if (variant.qty > 1) {
                variant.qty = variant.qty - 1;
                variant.TotalProductPrice = variant.qty * variant.pricing.sellPrice;
                variant.TotalProductRackPrice = variant.qty * variant.pricing.rackPrice
                updatedPrice = totalPrice - variant.pricing.sellPrice;
                updatedRackPrice = totalRackPrice - variant.pricing.rackPrice;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cartProduct => cartProduct.variantId === action.data.id);
                shoppingCart[index] = variant;

                const dec = {
                    shoppingCart: [...shoppingCart],
                    totalPrice: updatedPrice,
                    totalQty: updatedQty,
                    totalRackPrice: updatedRackPrice
                }
                localStorage.setItem("localCart", JSON.stringify(dec));
                return dec
            }
            else {
                return state;
            }

        case DELETE :
            const filtered = shoppingCart.filter(cartProduct => cartProduct.variantId !== action.data.id);
            variant = action.data.cartProduct;
            updatedQty = totalQty - variant.qty;
            updatedPrice = totalPrice - variant.qty * variant.pricing.sellPrice;
            updatedRackPrice = totalRackPrice - variant.qty * variant.pricing.rackPrice;

            const del = {
                shoppingCart: [...filtered],
                totalPrice: updatedPrice,
                totalQty: updatedQty,
                totalRackPrice: updatedRackPrice
            }
            localStorage.setItem("localCart", JSON.stringify(del));
            return del

        case EMPTY :
            const empty = {
                shoppingCart: [],
                totalPrice: 0,
                totalQty: 0,
                totalRackPrice: 0
            }
            localStorage.setItem("localCart", JSON.stringify(empty));

            return empty

        default:
            return state;

    }


}
export default cartItem