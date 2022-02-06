import { SUCCESS } from "../constants/constants";
import { DANGER, CLOSE } from '../constants/constants'

const initialState = {
    visible: false,
    title: '',
    description: '',
    type: ''
}

const MToastReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
        case DANGER:
            return {
                ...action.data,
                visible: true,
                type: action.type.toLowerCase()
            }
        case CLOSE:
            return {
                visible: action.data.visible
            }
        default:
            return state;
    }
}

export default MToastReducer
