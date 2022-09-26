import { COLORS, FONTS, SIZES } from "../types/styles"

export const setColors = obj => ({
  type: COLORS,
  payload: obj
})

export const setFonts = obj => ({
  type: FONTS,
  payload: obj
})

export const setSizes = obj => ({
  type: SIZES,
  payload: obj
})
