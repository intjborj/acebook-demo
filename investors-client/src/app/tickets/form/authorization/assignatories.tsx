import PostTagIcon from '@/components/tags/tagIcon'
import React from 'react'

type Props = {
    data:  any;
}

const Assignatories = ({data}: Props)=> {
    return (
        <div>
            <span className='font-bold pb-3'>Assignatories</span>
            <div>
                {data?.map((item: any) => (

                    <div className='pb-2'> <PostTagIcon name={`${item?.firstName}, ${item?.lastName}         (${_.get(item, "departmentOnDuty.name")})`} /> </div>

                ))}
            </div>
        </div>
    )
}

export default Assignatories