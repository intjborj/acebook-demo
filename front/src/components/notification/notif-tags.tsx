import React from 'react'

type Props = {
    tagList?: any;
}

const NotifTags = ({tagList}: Props) => {
    return (
        <div className='pt-1'>
            {
                tagList.length > 0 ? <>
                    {
                        <div className=' grid grid-flow-col auto-cols-max'>
                            {
                                tagList.map((item: any) => (
                                    <span className="w-fit bg-slate-100 text-slate-600 text-light font-normal mr-1 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                                    {/* <span className="w-fit bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"> */}
                                        {item?.name}
                                    </span>
                                ))
                            }

                        </div>
                    }
                </> : <></>
            }
        </div>
    )
}

export default NotifTags