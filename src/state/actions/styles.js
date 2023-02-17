import { COLORS, FONTS, SHAPE } from "../types/styles"

export const setColors = arr => {
  return {
    type: COLORS,
    payload: {
      category: arr[0],
      color: arr[1]
    }
  }
}

export const setFonts = obj => ({
  type: FONTS,
  payload: obj
})

export const setShape = obj => ({
  type: SHAPE,
  payload: obj
})
