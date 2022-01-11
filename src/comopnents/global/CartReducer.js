
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const CartReducer = (state, action) => {
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

        case 'ADD_TO_CART':

            const check = shoppingCart.find(product => product.variantId === action.id);
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

                variant = action.product.variant.variants[action.product.currentVariant];
                product = action.product.variant
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
                JSON.parse(localStorage.getItem('localCart'))
                return addTocart
                // console.log("shoppingCart",shoppingCart)\

                // return {
                //     shoppingCart: [variant,...shoppingCart],
                //     totalPrice: updatedPrice,
                //     totalQty: updatedQty,
                //     totalRackPrice: updatedRackPrice
                // }

            }
        case 'MOVE_TO_CART':
            variant = action.wishlist;
            updatedQty = ++variant.qty;
            variant.TotalProductPrice = variant.qty * variant.pricing.sellPrice;
            variant.TotalProductRackPrice = variant.qty * variant.pricing.rackPrice
            updatedPrice = variant.pricing.sellPrice;
            updatedRackPrice = variant.pricing.rackPrice;
            const movetocart = {
                shoppingCart: shoppingCart.concat(variant),
                totalPrice: updatedPrice,
                totalQty: updatedQty,
                totalRackPrice: updatedRackPrice

            }
            localStorage.setItem("localCart", JSON.stringify(movetocart));
            localStorage.setItem("wishList", JSON.stringify({ shoppingCart: [], totalPrice: 0, totalQty: 0, totalRackPrice: 0 }));
            return movetocart

        case 'INC':

            variant = action.cartProduct;
            variant.qty = ++variant.qty;
            variant.TotalProductPrice = variant.qty * variant.pricing.sellPrice;
            variant.TotalProductRackPrice = variant.qty * variant.pricing.rackPrice
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + variant.pricing.sellPrice;
            updatedRackPrice = totalRackPrice + variant.pricing.rackPrice;
            index = shoppingCart.findIndex(cartProduct => cartProduct.variantId === action.id);
            shoppingCart[index] = variant;

            // return {
            //     shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty, totalRackPrice: updatedRackPrice
            // }
            const inc = {
                shoppingCart: [...shoppingCart],
                totalPrice: updatedPrice,
                totalQty: updatedQty,
                totalRackPrice: updatedRackPrice
            }
            localStorage.setItem("localCart", JSON.stringify(inc));
            return inc


        case 'DEC':
            variant = action.cartProduct;
            if (variant.qty > 1) {
                variant.qty = variant.qty - 1;
                variant.TotalProductPrice = variant.qty * variant.pricing.sellPrice;
                variant.TotalProductRackPrice = variant.qty * variant.pricing.rackPrice
                updatedPrice = totalPrice - variant.pricing.sellPrice;
                updatedRackPrice = totalRackPrice - variant.pricing.rackPrice;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cartProduct => cartProduct.variantId === action.id);
                shoppingCart[index] = variant;
                // return {
                //     shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty, totalRackPrice: updatedRackPrice
                // }
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

        case 'DELETE':
            const filtered = shoppingCart.filter(cartProduct => cartProduct.variantId !== action.id);
            variant = action.cartProduct;
            updatedQty = totalQty - variant.qty;
            updatedPrice = totalPrice - variant.qty * variant.pricing.sellPrice;
            updatedRackPrice = totalRackPrice - variant.qty * variant.pricing.rackPrice;
            // return {
            //     shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty, totalRackPrice: updatedRackPrice
            // }
            const del = {
                shoppingCart: [...filtered],
                totalPrice: updatedPrice,
                totalQty: updatedQty,
                totalRackPrice: updatedRackPrice
            }
            localStorage.setItem("localCart", JSON.stringify(del));
            return del


        case 'EMPTY':
            // return {
            //     shoppingCart: [], totalPrice: null, totalQty: null
            // }
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
export default CartReducer