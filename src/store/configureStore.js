import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducer, userDetailsReducer } from '../reducers/userReducer'
import customersReducer from '../reducers/customersReducer'
import productsReducer from '../reducers/productsReducer'
import lineItemReducer from '../reducers/lineItemReducer'
import billsReducer from '../reducers/billsReducer'
import currentBillReducer from '../reducers/currentBillReducer'

const configureStore = () => {

    const store = createStore(combineReducers({
        user: userReducer,
        userDetails: userDetailsReducer,
        customers: customersReducer,
        products: productsReducer,
        lineItem: lineItemReducer,
        bills: billsReducer,
        currentBill: currentBillReducer
    }), applyMiddleware(thunk))

    return store
}

export default configureStore