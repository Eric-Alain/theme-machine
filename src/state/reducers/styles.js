import { COLORS, FONTS, SIZES } from "../types/styles"

const defaultFont = `'Jost', sans-serif`

export const initialState = {
  colors: {
    black: "#292929",
    white: "#fff",
    primary: "#5800a1",
    secondary: "#a10572",
    tertiary: "#FFFFFF"
  },
  fonts: {
    general: defaultFont,
    heading: defaultFont
  },
  sizes: {
    xs: 360,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
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
    case SIZES:
      return {
        ...state,
        sizes: { ...state.sizes, payload }
      }

    default:
      return state
  }
}

export default stylesReducer
