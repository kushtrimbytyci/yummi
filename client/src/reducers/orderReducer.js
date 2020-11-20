import { ADD_ORDER, REMOVE_ORDER, SUBTOTAL, DELETE_ORDER, CLEAR_ORDERS } from './types'


const initialState = {
    nrOfOrders: 0,
    orders: [],
    subTotal: 0
}


const orders = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            let arr = [...state.orders]
            let nrOfOrders = state.nrOfOrders;
            const bol = arr.some((e) => {
                return e['product_name'] === action.payload.product_name
            })
            if (bol) {
                const index = arr.findIndex((e) => {
                    return e.product_name === action.payload.product_name
                })
                arr[index].quantity = parseInt(action.payload.quantity) + parseInt(arr[index].quantity)
            } else {
                arr.push(action.payload)
                nrOfOrders = nrOfOrders + 1
            }
            let subtotal = state.subTotal;
            arr.forEach((e) => { subtotal = subtotal + (e.price * e.quantity) })
            return { ...state, nrOfOrders, orders: arr, subTotal: subtotal }
        case REMOVE_ORDER:
            return { ...state, nrOfOrders: state.nrOfOrders - 1 }
        case SUBTOTAL:
            let arr2 = [...state.orders]
            arr2[action.index].quantity = action.quantity
            let subtotal2 = 0;
            arr2.forEach((e) => subtotal2 = subtotal2 + (e.price * e.quantity))
            return { ...state, subTotal: subtotal2, orders: arr2 }
        case DELETE_ORDER:
            let orders = [...state.orders]
            let subTotal = state.subTotal - (orders[action.index].price * orders[action.index].quantity)
            orders.splice(action.index, 1)
            return { ...state, orders, subTotal, nrOfOrders: state.nrOfOrders - 1 }
        case CLEAR_ORDERS:
            return { ...state, orders: [], nrOfOrders: 0, subTotal: 0 }
        default:
            return state;
    }
}

export default orders;