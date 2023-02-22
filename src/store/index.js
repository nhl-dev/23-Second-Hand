import { createStore, combineReducers, applyMiddleware } from "redux"

import categoryReducer from "./reducers/category.reducer"
import productReducer from "./reducers/products.reducer"

const RootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
})

export default createStore(RootReducer)