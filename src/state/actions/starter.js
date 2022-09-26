import { STARTER_DATA } from "../types/starter"

export const setStarter = string => ({
  type: STARTER_DATA,
  payload: string
})
