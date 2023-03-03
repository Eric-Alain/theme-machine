import { THEME } from "../types/theme"

export const setTheme = str => ({
  type: THEME,
  payload: str
})
