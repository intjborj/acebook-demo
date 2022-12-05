import React from 'react'
import { useModalAction } from '@/components/ui/modal/modal.context';
type Props = {
    tags: any[];
}

const PostTagContainer = ({ tags }: Props) => {
    const { openModal } = useModalAction();
    function handleProductQuickView(contents: any) {

        let data = {
            contents: contents,
            removeClose: true
        }
        return openModal('TAG_MODAL', data);
        // return openModal('POST_FORM', "FDS");
    }

    return (
        <div>
            {
                <div className='flex gap-2'>
                    {tags.map((item: any) => (
                        <span onClick={e => handleProductQuickView(item.contentRaw)} className='cursor-pointer'  >{item.content}</span>
                    ))}
                </div>
            }
        </div>
    )
}

export default PostTagContainer