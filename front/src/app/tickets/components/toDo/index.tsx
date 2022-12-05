import React, { useState, useEffect } from 'react'
import { ContainerBgColor, LabelColor } from '@/constants/enums/themes';
import EditPackIcon from '@/components/customs/iconPackage/editPack-icon';
import ABModal from '@/components/customs/modals/ABModal';
import ToDoForm from './toDoForm';
import { useQuery, useLazyQuery } from '@apollo/client';

type Props = {
    toDoList?: any;
}

const ToDo = ({ toDoList }: Props) => {
    const [iseMounted, setIseMounted] = useState<boolean>(true)


    useEffect(() => {
        return () => {
            setIseMounted(false)
        }
    }, [])




    return (
        <>
            {iseMounted &&
                <div className='pb-3 w-full'>
                    <div className={`${ContainerBgColor.PRIMARY} p-1 rounded`}>
                        <div className='grid grid-cols-2 w-full'>
                            <span className={`text-sm font-bold ${LabelColor.PRIMARY}`}>Task Instructions</span>
                            <div className='flex justify-end'>
                                <ABModal button={<EditPackIcon />}>
                                    <ToDoForm defaultList={toDoList} />
                                </ABModal>
                            </div>
                        </div>
                        <ul className={`grid grid-cols-1 text-md pl-3 list-disc list-inside w-full ${LabelColor.SECONDARY}`}>
                            {(toDoList && toDoList.length > 0) &&
                                <>
                                    {toDoList.map((item: any) =>
                                        <li className='w-full'>
                                            {item.description}
                                        </li>
                                    )}
                                </>
                            }
                        </ul>

                    </div>
                </div>
            }
        </>
    )
}

export default ToDo