import { connect } from 'react-redux'
import ProductDetails from '../comopnents/storeFront/ProductDetails'
import { AddToCart } from '../services/Actions/Action'


const mapStateToProps=state=>({
    data:state.cardItems
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(AddToCart(data)),



})
export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails)