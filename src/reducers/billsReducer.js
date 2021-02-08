const initialStateValue = []

const billsReducer = (state = initialStateValue, action) => {
    switch(action.type) {
        case 'GET_ALL_BILLS' : {
            return [...action.payload]
        }
        case 'ADD_BILL' : {
            return [action.payload, ...state]
        }
        case 'DELETE_BILL' : {
            return state.filter((bill) => {
                return bill._id !== action.payload._id
            })
        }
        default: {
            return state
        }
    }
}

export default billsReducer