import React from 'react';
import { commentReducer, initialStateCommentRedc } from './commentReducer';
import { CommentContext } from './commentContext';

const CommentProvider = ({children}:any) => {
    const [state, dispatch] = React.useReducer(commentReducer, initialStateCommentRedc)
    return (
        <CommentContext.Provider value={[state, dispatch]}>
           {children}
        </CommentContext.Provider>
    )
}

export default CommentProvider




