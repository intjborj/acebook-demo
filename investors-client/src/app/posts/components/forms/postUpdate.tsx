import React, { useEffect, useState } from 'react'
import {   PostViewDefaultType } from '@/types/posts/postTypes';
import _ from 'lodash';
import { postDefaultFormService } from '../services/postDefaultFormServices';
import PostForm from './postForm';
import Spinner from '@/components/ui/loaders/spinner/spinner';

type Props = {
    data?: PostViewDefaultType | null;
}

const PostUpdate = ({ data }: Props) => {

    const [defaults, setDefaults] = useState(null as any)

    const initializeDefaults = async () => {
        let defpost = await postDefaultFormService(data);
        
        setTimeout(() => {
            setDefaults(defpost)
        }, 500);
    }

    useEffect(() => {
        if (data) {
            initializeDefaults()
        }
    }, [data])

    return (
        <>
        { defaults ?  <PostForm data={defaults} /> : <Spinner showText={false} />}
           
        </>
    )
}

export default PostUpdate