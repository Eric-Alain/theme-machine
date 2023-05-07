import { RESET_STORE, LOAD_STORE } from "../types/root"

export const resetStore = obj => ({
  type: RESET_STORE,
  payload: obj
})

export const loadStore = obj => ({
  type: LOAD_STORE,
  payload: obj
})
