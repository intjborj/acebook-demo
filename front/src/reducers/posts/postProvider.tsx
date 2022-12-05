import React from 'react';
import { postReducer, initialStatePostRedc } from './postReducer';
import { PostContextRd } from './postContextRd';

const PostProvider = ({children}:any) => {
    const [state, dispatch] = React.useReducer(postReducer, initialStatePostRedc)
    return (
        <PostContextRd.Provider value={[state, dispatch]}>
           {children}
        </PostContextRd.Provider>
    )
}

export default PostProvider




