import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import categoryReducer from "./reducers/category.reducer"
import productReducer from "./reducers/products.reducer"
import cartReducer from "./reducers/cart.reducer"
import orderReducer from "./reducers/order.reducer"
import authReducer from "./reducers/auth.reducer"
import userdataReducer from "./reducers/userdata.reducer"

const RootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
  userdata: userdataReducer,
})

export default createStore(RootReducer, applyMiddleware(thunk))