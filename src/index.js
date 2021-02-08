import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App'
import configureStore from './store/configureStore'
import { startGetAllCust } from './actions/customer-actions'
import { startGetUser, toggleStatus } from './actions/userAuth'
import { startGetAllProd } from './actions/products-action'
import { startGetBills } from './actions/bills-action'


const store = configureStore()
console.log(store.getState())

store.subscribe(() => {
    console.log(store.getState())
})

if(localStorage.getItem('token')) {
    store.dispatch(toggleStatus())
    store.dispatch(startGetUser())
    store.dispatch(startGetAllCust())
    store.dispatch(startGetAllProd())
    store.dispatch(startGetBills())
}


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    ,document.getElementById('root'))