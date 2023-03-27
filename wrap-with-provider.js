import React from "react"

//Redux persist provider and persist gate
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import createStore from "./src/state/createStore"

const wrapWithProvider = ({ element }) => {
  const store = createStore().store
  const persistor = createStore().persistor
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {element}
      </PersistGate>
    </Provider>
  )
}

export default wrapWithProvider
