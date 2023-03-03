import { THEME } from "../types/theme"

export const initialState = "system-default"

const themeReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case THEME:
      return payload

    default:
      return state
  }
}

export default themeReducer
