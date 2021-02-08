export const addLineItem = (lineItem) => {
    return {
        type: 'ADD_LINE_ITEM',
        payload: lineItem
    }
}

export const startDeleteLineItem = (_id) => {
    return {
        type: 'DEL_LINE_ITEM',
        payload: _id
    }
}

export const startResetLineItem = () => {
    return {
        type: 'RESET_LINE'
    }
}