import { LogBox } from 'react-native'
import { ADD_ITEM, REMOVE_ITEM, CONFIRM_CART } from '../actions/cart.action'

const INITIAL_STATE = {
    items: [],
    total: 0,
}

const sumTotal = list => {
    const total = list.map(item => item.quantity * item.price).reduce((a, b) => a + b, 0)
    return total
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REMOVE_ITEM:
            const newItems = state.items.filter((item) => item.id !== action.itemId)
            return {...state, items: newItems, total: sumTotal(newItems)}

        case ADD_ITEM:
            const item = state.items.findIndex((item) => item.id === action.item.id)

            if (item === -1) {
                const item = {...action.item, quantity: 1}
                const updatedItems = [...state.items, item]
                return {...state, items: updatedItems, total: sumTotal(updatedItems)}
            }

            const items = [...state.items].map((item) => {
                if (item.id === action.item.id) {
                    item.quantity++
                    return item
                } else {
                    return item
                }
            })

            return {...state, items, total: sumTotal(items)}

        case CONFIRM_CART:
            return {...state, items: [], total: 0}

        default:
            return state
    }
}

export default cartReducer