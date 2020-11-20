import { combineReducers } from 'redux'
import orders from './orderReducer'
import user from './userReducer'

export default combineReducers({
    orders,
    user
})