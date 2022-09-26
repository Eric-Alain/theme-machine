import { STARTER_DATA } from "../types/starter"

export const initialState = {
  data: ""
}

const starterReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case STARTER_DATA:
      return {
        ...state,
        data: payload
      }

    default:
      return state
  }
}

export default starterReducer
