import { connect } from 'react-redux'
import Collection from '../comopnents/storeFront/Collection'
import SearchProduct from '../comopnents/storeFront/SearchProduct'
import Loader from '../loader/Loader'
import { LoderClose } from '../services/Actions/Action'

const mapStateToProps=state=>({
    data:state.LoderReducer 
})
const mapDispatchToProps=dispatch=>({
    LoderCloseHandler:data=>dispatch(LoderClose(data))
})

export default  {
   loder: connect(mapStateToProps,mapDispatchToProps)(Loader),
   searchProduct: connect(mapStateToProps,mapDispatchToProps)(SearchProduct),
   collection:connect(mapStateToProps,mapDispatchToProps)(Collection)

}
