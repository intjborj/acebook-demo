import React from "react"
import { initialStateCommentRedc } from "./commentReducer"

export const CommentContext = React.createContext({
    state: initialStateCommentRedc,
    dispatch: () => null
  })
  