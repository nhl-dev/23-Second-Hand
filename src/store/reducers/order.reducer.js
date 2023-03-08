import { GET_ORDERS, DELETE_ORDER } from "../actions/order.action";

const INITIAL_STATE = {
    list: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return { ...state, list: action.payload };

        case DELETE_ORDER:
            return {
                ...state,
                list: state.list.filter((item) => item.id !== action.orderId)
            };

        default:
            return state;
    }
}

export default orderReducer;