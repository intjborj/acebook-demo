import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_POST, GET_POST_REACTION } from '@graphql/operations/posts/postQueries';
import _ from 'lodash';
import { getAuthCredentials } from '@/utils/auth-utils';
import { HeartIcon } from '@heroicons/react/20/solid';
import { ABReactIconLayout } from '@/components/customs/layouts/ABReactIconLayout';
import { LabelColor } from '@/constants/enums/themes';


type Props = {
    postId: string
}

const UserReactions = ({ postId }: Props) => {
    const { user } = getAuthCredentials();

    const { data: postReacts, refetch, loading } = useQuery(GET_POST_REACTION, {
        variables: {
            id: postId,
            user: _.get(user, "_id"),
            type: "specific"
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });



    return (
        <div>
            {
                (postReacts && _.get(postReacts, "post.data.reactions").length > 0) &&
                <>
                    {
                        _.orderBy(_.get(postReacts, "post.data.reactions"), "user.firstName", "asc").map((item: any) => (
                            <div>
                                <div className=' text-xs flex gap-1'>
                                    {_.get(item, "reactionIcon.name") == "heart" ?
                                        <ABReactIconLayout>
                                            <span
                                                className={`  text-red-700  `}>
                                                <HeartIcon />
                                            </span>
                                        </ABReactIconLayout>
                                        : <></>
                                    }
                                    <div className='grid content-center'>
                                        <span className={`text-xs h-fit w-fit px-1 rounded-md  ${LabelColor.SECONDARY} `}>
                                            {_.get(item, "user.firstName")}, {_.get(item, "user.lastName")}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        ))
                    }

                </>
            }
        </div>
    )
}

export default UserReactions