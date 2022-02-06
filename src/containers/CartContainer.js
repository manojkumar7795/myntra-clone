import { connect } from 'react-redux'
import Cart from '../comopnents/storeFront/Cart'
import { Dec, Delete, Empty, Inc } from '../services/Actions/Action'



const mapStateToProps=state=>({
    data:state.cartItem
})
const mapDispatchToProps=dispatch=>({
    IncHandler:data=>dispatch(Inc(data)),
    DecHandler:data=>dispatch(Dec(data)),
    DeleteHandler:data=>dispatch(Delete(data)),
    EmptyHandler:data=>dispatch(Empty(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Cart)