import React from 'react'

type Props = {
    name: string ;
    identifier?: string;
    bgColor?: string ;
    textColor?: string;
    bgClass?: string;
}

const PostTagIcon = (props: Props) => {
const col = '#b6d7a8'
    return (
        <div>
          <div
                // className={`text-xs inline-flex items-center font-bold leading-sm  px-3 py-1 ${ "bg-blue-200"} ${"text-blue-700"} rounded-full`}
                // className={`text-xs inline-flex items-center font-bold leading-sm  px-3 py-1 ${props.bgColor ?`bg-[${props.bgColor}]`: "bg-blue-200"} ${props.textColor ?` text-[${props.textColor}]`: "text-blue-700"} rounded-full`}
                className={`text-xs inline-flex items-center font-bold leading-sm  px-3 py-1 ${props.bgClass ?? 'bg-blue-200 text-blue-700' } rounded-full`}
                // className={`text-xs inline-flex items-center font-bold leading-sm  px-3 py-1 ${props.bgColor ?'bg-['+props.bgColor+']': "bg-blue-200"} ${props.textColor ?` text-[#6aa84f]`: "text-blue-700"} rounded-full`}
            
                // className={`text-xs inline-flex items-center font-bold leading-sm  px-3 py-1 ${props.bgColor ?? "bg-blue-200"} ${props.textColor ?? "text-blue-700"} rounded-full`}
                // className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
            >
                

               <span> {props.name}</span> 
            </div>
        </div>
    )
}

export default PostTagIcon