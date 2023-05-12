import { ACTIVE_PALETTE } from "../types/palette"

export const setActivePalette = str => ({
  type: ACTIVE_PALETTE,
  payload: str
})
