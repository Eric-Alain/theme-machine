//Redux
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"

//Reducers
import stylesReducer from "../state/reducers/styles"
import codeReducer from "../state/reducers/code"

//Create root reducer
export const rootReducer = combineReducers({
  styles: stylesReducer,
  code: codeReducer
})

//Create store, pass preloadedState via plugin
const createStore = preloadedState => {
  return configureStore({ reducer: rootReducer }, preloadedState)
}

export default createStore
