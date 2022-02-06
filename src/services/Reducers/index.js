import {combineReducers} from "redux"
import cartItem from './Reducer'
import MToastReducer from "./MToastReduce"
import LoderReducer from "./LoderReducer"


export default combineReducers({
    cartItem,
    MToastReducer,
    LoderReducer
})