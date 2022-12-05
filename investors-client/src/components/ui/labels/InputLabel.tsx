import React from 'react'

type Props = {
    label?: string;
    value?: string;
}

const InputLabelCont = (props: Props) => {
    return (
        <div className="flex mb-3 w-max">
            <span className=" font-medium inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                {props.label}
            </span>
            <span className="rounded-none min-w-[5rem] rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-max text-sm p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {props.value}
            </span>
        </div>
    )
}

export default InputLabelCont