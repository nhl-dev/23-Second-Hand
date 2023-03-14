import { URL_API } from "../../constants/Database";

export const GET_ORDERS = "GET_ORDERS";
export const DELETE_ORDER = "DELETE_ORDER";

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${URL_API}/orders.json`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      const orders = [];
      for (const key in resData) {
        orders.push({
          id: key,
          date: resData[key].date,
          items: resData[key].items,
          total: resData[key].total,
        });
      }
      dispatch({
        type: GET_ORDERS,
        payload: orders,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const deleteOrder = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${URL_API}/orders/${id}.json`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      dispatch({
        type: DELETE_ORDER,
        orderId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}