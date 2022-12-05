import React from 'react'

type Props = {
    label?: string
    variation?: string;
    width?: string;
}

const TypeLabel = ({label, variation, width}: Props) => {
    return (
        <div>
            <div className={` ${width ?? 'w-28 md:w-fit'}`}>
                <div className={`border-solid text-xs ${(variation && variation == 'small') ? '' : 'md:text-sm'} border-2  p-1  ${(variation && variation == 'small') ? '' : 'md:p-2'} rounded-lg min-w-fit  `}>
                    <div className='flex justify-center text-center'>  {label}</div>
                </div>
            </div>
        </div>
    )
}

export default TypeLabel