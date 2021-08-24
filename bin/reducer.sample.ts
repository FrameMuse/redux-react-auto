import type { CompileActions } from "redux-react-auto"

interface Actions {
  ACTION: {
    data: object
  }
}

const initialState = {
  ie: "data"
}

export default (state = initialState, action: CompileActions<Actions>): typeof initialState => {
  switch (action.type) {

    case "ACTION":
      return { ...state, ...action.payload }

    default:
      return state
  }
}