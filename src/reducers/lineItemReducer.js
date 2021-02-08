const intialStateValue = []

const lineItemReducer = (state = intialStateValue, action) => {
    switch(action.type) {
        case 'ADD_LINE_ITEM' : {
            return [action.payload,...state]
        }
        case 'DEL_LINE_ITEM' : {
            return state.filter((item) => {    
                return item.product  !== action.payload
            })
        }
        case 'RESET_LINE': {
            state.length = 0;
            return [...state]
          }
        default: {
            return state
        }
    }
}

export default lineItemReducer
