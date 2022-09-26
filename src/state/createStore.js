//Redux
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
//import thunk from 'redux-thunk'
//import { composeWithDevTools } from "redux-devtools-extension"

//Reducers
import starterReducer from "../state/reducers/starter"
import stylesReducer from "../state/reducers/styles"


//Create root reducer
export const rootReducer = combineReducers({
  starter: starterReducer,
  styles: stylesReducer
})

//Create store, pass preloadedState via plugin
const createStore = preloadedState => {
  return configureStore({ reducer: rootReducer }, preloadedState)
}

export default createStore
