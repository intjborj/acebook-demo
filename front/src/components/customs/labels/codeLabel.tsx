import React from 'react'

type Props = {
    code?: string;
    className?: string;
}

const CodeLabel = ({ code, className }: Props) => {
    return (
        <h1 className= {`${className} font-extrabold  text-gray-900 `} >
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">#</span> {code}
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">#</span> {code} */}
        </h1>

    )
}

export default CodeLabel