
export const postReducer = (state: any, action: any) => {

  switch (action.type) {
    case "refetch":
      return {
        ...state,
        active: !state.active
      }
    case "refetchPost":
      return {
        ...state,
        active: action.active
      }
    case "refetchComment":
      return {
        ...state,
        commentActive: action.commentActive
      }
    case "content":
      return {
        ...state,
        content: action.content
      }
    default:
      return state
  }
}

export const initialStatePostRedc: PostReducerStateType = {
  active: false,
  commentActive: false,
}


export type PostReducerStateType = {
  active?: Boolean;
  commentActive?: Boolean;
  content?: string;
}