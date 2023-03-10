import { URL_API } from '../../constants/Database';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CONFIRM_CART = 'CONFIRM_CART';

import { getOrders } from './order.action';

export const addItem = (item) => ({
    type: ADD_ITEM,
    item
})

export const removeItem = (itemId) => ({
    type: REMOVE_ITEM,
    itemId
})

export const confirmCart = ( payload, total ) => {
    return async dispatch => {
        try {
            const response = await fetch(`${URL_API}/orders.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: Date.now(),
                    items: {...payload},
                    total
                }),
            });
            const resData = await response.json();
            dispatch({
                type: CONFIRM_CART,
                confirm: true
            })
            dispatch(getOrders())
        } catch (error) {
            console.log(error);
        }
    }
}