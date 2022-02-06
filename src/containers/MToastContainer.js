import { connect } from 'react-redux'
import { Login } from '../comopnents/admin/Login'
import MToast from '../comopnents/admin/MToast'
import Collection from '../comopnents/admin/products/Collection'
import CollectionGroupDetails from '../comopnents/admin/products/CollectionGroupDetails'
import ProductDetails from '../comopnents/admin/products/ProductDetails.js'
import Variant from '../comopnents/admin/products/Variant'
import { MToastClose, MToastDanger, MToastSuccess } from '../services/Actions/Action'


const mapStateToProps=state=>({
    data:state.MToastReducer    
})
const mapDispatchToProps=dispatch=>({
    MToastCloseHandler:data=>dispatch(MToastClose(data)),
    MToastSuccessHandler:data=>dispatch(MToastSuccess(data)),
    MToastDangerHandler:data=>dispatch(MToastDanger(data))
})

export default  {
    MToast:connect(mapStateToProps,mapDispatchToProps)(MToast),
    Collection:connect(mapStateToProps,mapDispatchToProps)(Collection),
    login:connect(mapStateToProps,mapDispatchToProps)(Login),
    CollectionGroupDetails:connect(mapStateToProps,mapDispatchToProps)(CollectionGroupDetails),
    productDetails : connect(mapStateToProps,mapDispatchToProps)(ProductDetails),
    Variant:connect(mapStateToProps,mapDispatchToProps)(Variant)

}