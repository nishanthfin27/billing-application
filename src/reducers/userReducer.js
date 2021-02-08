const initialLoginStatus = false

 export const userReducer = (state = initialLoginStatus, action) => {
    switch(action.type) {
        case 'TOGGLE_STATE': {
            return !state
        }
        default: {
            return state 
        }
    }
}

const initialUserDetails = {}

export const userDetailsReducer = (state = initialUserDetails, action) => {
    switch(action.type) {
        case 'GET_USER': {
            return {...action.payload}
        }
        default : {
            return state 
        }
    }
}
