import { BODYHTML, CSS } from "../types/code"

export const setBodyHtml = code => ({
  type: BODYHTML,
  payload: code
})

export const setCSS = code => ({
  type: CSS,
  payload: code
})
