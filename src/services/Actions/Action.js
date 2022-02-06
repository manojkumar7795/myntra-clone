import { ADD_TO_CART, DANGER, DEC, DELETE, EMPTY, INC, MOVE_TO_CART, SUCCESS,CLOSE } from '../constants/constants'

export const AddToCart = (data) => {
    return {
        type: ADD_TO_CART,
        data: data
    }
}
export const MoveToCart = (data) => {
    return {
        type: MOVE_TO_CART,
        data: data
    }
}
export const Inc = (data) => {
    return {
        type: INC,
        data:data
    }
}
export const Dec = (data) => {
    return {
        type: DEC,
        data: data
    }
}
export const Delete = (data) => {
    return {
        type: DELETE,
        data: data
    }
}
export const Empty = (data) => {
    return {
        type: EMPTY,
        data: data
    }
}
export const MToastSuccess = (data)=>{
    return {
        type: SUCCESS,
        data:data
    }
}
export const MToastDanger = (data)=>{
    return {
        type: DANGER,
        data:data
    }
}
export const MToastClose = (data)=>{
    return {
        type: CLOSE,
        data:data
    }
}
export const LoderClose = (data)=>{
    return {
        type: CLOSE,
        data:data
    }
}
