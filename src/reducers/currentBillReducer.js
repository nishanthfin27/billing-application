const initialStateValue = {}

const currentBillReducer = (state = initialStateValue, action) => {
    switch(action.type) {
        case 'CURRENT_BILL' : {
            return {...action.payload}
        }
        default: {
            return {...state}
        }
    }
}

export default currentBillReducer