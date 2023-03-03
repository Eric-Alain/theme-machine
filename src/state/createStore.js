//Redux
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import createWebStorage from "redux-persist/lib/storage/createWebStorage"
import { getPersistConfig } from "redux-deep-persist"

//Reducers
import stylesReducer from "../state/reducers/styles"
import codeReducer from "../state/reducers/code"

//Create root reducer
export const rootReducer = combineReducers({
  styles: stylesReducer,
  code: codeReducer
})

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null)
    },
    setItem(_key, value) {
      return Promise.resolve(value)
    },
    removeItem(_key) {
      return Promise.resolve()
    }
  }
}

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage()

const persistConfig = getPersistConfig({
  key: "root",
  version: 1,
  storage: storage,
  whitelist: [
    "styles.colors.primary",
    "styles.colors.secondary",
    "styles.colors.tertiary",
    "styles.colors.black",
    "styles.colors.white",
    "styles.fonts.general",
    "styles.fonts.heading",
    "styles.shape.rounded",
    "styles.shape.radius",
    "code.bodyHtml",
    "code.css"
  ],
  rootReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const createStore = () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
      })
  })
  let persistor = persistStore(store)
  return { store, persistor }
}

export default createStore
