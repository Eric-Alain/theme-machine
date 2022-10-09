import { COLORS, FONTS, SIZES } from "../types/styles"

export const initialState = {
  colors: {
    black: "#292929",
    white: "#fff",
    primary: "#14213D",
    secondary: "#FCA311",
    tertiary: "#E5E5E5"
  },
  fonts: {
    dosis: `'Dosis', sans-serif`
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
      return {
        ...state,
        fonts: { ...state.fonts, payload }
      }

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
