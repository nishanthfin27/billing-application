import axios from '../config/axios'

const setBill = (bill) => {
    return {
        type: 'ADD_BILL',
        payload: bill
    }
}

const getBills = (bills) => {
    return {
        type: 'GET_ALL_BILLS',
        payload: bills
    }
}

const delBill = (bill) => {
    return {
        type: 'DELETE_BILL',
        payload: bill
    }
}

const currentBill = (bill) => {
    return {
        type: 'CURRENT_BILL',
        payload: bill
    }
}

export const startPostBill = (bill) => {
    return (dispatch) => {
        axios.post('/bills',bill, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data 
            if(result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                dispatch(setBill(result))
                dispatch(currentBill(result))
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

export const startGetBills = () => {
    return (dispatch) => {
        axios.get('/bills',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data 
            if(result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                dispatch(getBills(result))
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

export const startGetBill = (id) => {
    return (dispatch) => {
        axios.get(`/bills/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data 
            if(result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                alert(result.date.slice(0,10))
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

export const startDeleteBill = (id) => {
    return (dispatch) => {
        axios.delete(`/bills/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data 
            if(result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                dispatch(delBill(result))
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}