import { RESET_STORE } from "../types/root"

import { combineReducers } from "redux"

import stylesReducer from "../reducers/styles"
import codeReducer from "../reducers/code"
import themeReducer from "../reducers/theme"
import { storage } from "../createStore"

//Create root reducer
export const appReducer = combineReducers({
  styles: stylesReducer,
  code: codeReducer,
  theme: themeReducer
})

const rootReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case RESET_STORE:
      storage.removeItem("persist:root")
      return appReducer(undefined, action)

    default:
      return appReducer(state, action)
  }
}

export default rootReducer
