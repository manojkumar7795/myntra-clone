import { connect } from 'react-redux'
import WishList from '../comopnents/storeFront/WishList'
import {MoveToCart } from '../services/Actions/Action'


const mapStateToProps=state=>({
    // data:state.cardItems
})
const mapDispatchToProps=dispatch=>({
    MoveToCartHandler:data=>dispatch(MoveToCart(data)),



})
export default connect(mapStateToProps,mapDispatchToProps)(WishList)