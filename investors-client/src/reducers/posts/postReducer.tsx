
export const postReducer = (state : any, action:any ) => {
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

  export const initialStatePostRedc : any = {
    active: false,
  }


  export type PostReducerStateType ={
    active?: Boolean;
  }