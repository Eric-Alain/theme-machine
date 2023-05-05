import { COLORS, FONTS, SHAPE } from "../types/styles"

export const initialState = {
  colors: {
    primary: "#f7ef04",
    secondary: "#fa9902",
    tertiary: "#c202fc",
    background: "#000000",
    foreground: "#000000",
    black: "#292929",
    white: "#fff"
  },
  fonts: {
    general: `'Roboto', sans-serif`,
    heading: `'Viga', sans-serif`
  },
  shape: {
    rounded: false,
    radius: 0
  }
}

const stylesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case COLORS:
      return {
        ...state,
        colors: { ...state.colors, [payload.category]: payload.color }
      }
    case FONTS:
      const types = ["general", "heading"]
      const returnValue = type => {
        return {
          ...state,
          fonts: { ...state.fonts, [type]: payload[type] }
        }
      }
      if (payload.hasOwnProperty(types[0])) {
        return returnValue(types[0])
      } else if (payload.hasOwnProperty(types[1])) {
        return returnValue(types[1])
      }
      break
    case SHAPE:
      const key = Object.keys(payload)[0]
      const value = Object.values(payload)[0]
      return {
        ...state,
        shape: { ...state.shape, [key]: value }
      }

    default:
      return state
  }
}

export default stylesReducer
