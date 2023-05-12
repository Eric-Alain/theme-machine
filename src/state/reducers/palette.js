import { ACTIVE_PALETTE } from "../types/palette"

export const initialState = ""

const paletteReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {

    case ACTIVE_PALETTE:
      return payload

    default:
      return state
  }
}

export default paletteReducer
