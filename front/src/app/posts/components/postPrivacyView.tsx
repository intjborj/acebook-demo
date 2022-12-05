import React from 'react'
import * as categoriesIcon from "@admin/components/icons/category";
import { getIcon } from "@utils/get-icon";

type Props = {
    privacy: string | null | undefined
}

const PostPrivacyView = ({privacy}: Props) => {
    return (
        <div className=' text-gray-400 w-[1.10rem] pt-[.30rem]'> {getIcon({
            iconList: categoriesIcon,
            iconName: privacy,
            // className: "text-8xl",
        })}</div>
    )
}

export default PostPrivacyView