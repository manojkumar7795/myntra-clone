import {CLOSE } from '../constants/constants'

const initialState = {
    visible: true,
}

const LoderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLOSE:
            return {
                visible: action.data.visible
            }
        default:
            return state;
    }
}

export default LoderReducer
