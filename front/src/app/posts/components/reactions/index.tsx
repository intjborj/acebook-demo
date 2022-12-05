import { HandThumbUpIcon, HeartIcon, LinkIcon } from '@heroicons/react/20/solid'
import React, { useContext, useState, useEffect } from 'react'
import { PostContext } from '@/app/posts';
import { ContainerBgColor, LabelColor } from '@/constants/enums/themes';
import { useQuery, useMutation } from '@apollo/client';
import { REACT_POST, REMOVE_REACT_POST } from '@graphql/operations/posts/postMutation';
import { getAuthCredentials } from "@utils/auth-utils";
import _ from 'lodash';
import ABModal from '@/components/customs/modals/ABModal';
import UserReactions from './userReactions';
import ABTransition from '@/components/customs/transitions/ABTransition';
import { ABReactIconLayout } from '@/components/customs/layouts/ABReactIconLayout';
import SmallLoader from '@/components/ui/loaders/smallLoader';

type Props = {}
type StateType = {
    hasReacted?: boolean;
    reactionCount: number;
    reactModal?: boolean;
}

// const ABModal = React.lazy(() => import('@/components/customs/modals/ABModal'));
// const UserReactions = React.lazy(() => import('./userReactions'));

const Reactions = (props: Props) => {
    const { user } = getAuthCredentials();
    const postContext = useContext(PostContext);
    const [reactPost] = useMutation(REACT_POST);
    const [removeReactPost] = useMutation(REMOVE_REACT_POST);
    const [state, setState] = useState<StateType>({ hasReacted: false, reactionCount: 0 })

    useEffect(() => {
        if (postContext) {
            let hasReacted = false
            if (postContext?.userReacted && postContext?.userReacted.length > 0) {
                hasReacted = true
            }
            setState((p) => ({ ...p, hasReacted: hasReacted, reactionCount: postContext?.reactionCount ?? 0 }))
        }
    }, [postContext])


    const ReactPostPorcess = (reaction: string) => {
        reactPost({
            variables: {
                "input": {
                    "reactions": {
                        "user": _.get(user, "_id"),
                        "reactionName": reaction
                    },
                    "_id": postContext?._id
                }
            },
        })
            .then((resp) => {

                setState((p) => ({ ...p, hasReacted: true, reactionCount: state.reactionCount + 1 }))
            })
            .catch((error) => {
            });
    }

    const RemoveReactPostPorcess = () => {
        removeReactPost({
            variables: {
                "input": {
                    "reactions": {
                        "user": _.get(user, "_id"),
                    },
                    "_id": postContext?._id
                }
            },
        })
            .then((resp) => {
                setState((p) => ({ ...p, hasReacted: false, reactionCount: state.reactionCount - 1 }))
            })
            .catch((error) => {
            });
    }


    const processReact = (reaction: string) => {

        if (state.hasReacted == false) {
            ReactPostPorcess(reaction)
        } else {
            RemoveReactPostPorcess()
        }
    }

    const modalVisibility = (isOpen: boolean) => {

        setState((p) => ({ ...p, reactModal: isOpen }))
    }


    return (
        <div className='flex'>
            <div className='flex'>
                <ABReactIconLayout>
                    <span
                        onClick={() => processReact("heart")}
                        className={` ${(state.hasReacted == true) ? ' text-red-700 hover:text-red-800' : ' text-slate-200 hover:text-slate-300'} `}>
                        <HeartIcon />
                    </span>
                </ABReactIconLayout>
                {(state.reactionCount > 0) ? <div className='grid content-center'>
                    <ABModal modalClass='w-fit' isOpen={modalVisibility} button={
                        <span className={`text-xs h-fit w-fit px-1 rounded-md ${LabelColor.SECONDARY} ${ContainerBgColor.PRIMARY}`}>
                            {state.reactionCount}
                        </span>
                    }
                    hideCloseBtn={true}
                    >
                        {(state.reactModal && postContext?._id) ?
                            <ABTransition>
                                <UserReactions postId={postContext?._id} />
                            </ABTransition> 
                            : 
                            <div className='flex justify-center pl-2'><SmallLoader /></div>
                        }
                         {/* <div className='flex justify-center pl-2 '><SmallLoader /></div> */}
                    </ABModal>
                </div> : <></>}
            </div >
            {/* <Iconlayout>
                <span className=' text-teal-700'>   <HandThumbUpIcon /></span>
            </Iconlayout> */}



        </div >

    )
}

export default Reactions