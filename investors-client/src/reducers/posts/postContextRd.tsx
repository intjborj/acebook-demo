import React from "react"
import { initialStatePostRedc, PostReducerStateType } from "./postReducer"

export type PostContextType = {
  state?: PostReducerStateType,
  dispatch?: any
}

export const PostContextRd = React.createContext({
    state: initialStatePostRedc,
    dispatch: () => null
  })

