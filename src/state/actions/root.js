import { RESET_STORE } from "../types/root"

export const resetStore = obj => ({
  type: RESET_STORE,
  payload: obj
})
