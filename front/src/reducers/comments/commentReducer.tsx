
export const commentReducer = (state : any, action:any ) => {
    switch (action.type) {
      case "refetch":
        return {
          ...state,
          active: !state.active
        }
      default:
        return state
    }
  }

  export const initialStateCommentRedc = {
    active: false,
  }