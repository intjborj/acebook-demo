import { ContainerBgColor, LabelColor } from '@/constants/enums/themes'
import { XCircleIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import { TodoType } from './toDoForm'
import TextArea from '@/components/ui/forms/text-area';

type Props = {
    item: TodoType,
    triggerRemove?: (description: string) => void
    triggerUpdate?: ({newDescription, oldDescription}: {newDescription: string, oldDescription:string}) => void
}

const TodoItemForm = ({ item, triggerRemove, triggerUpdate }: Props) => {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const onUpdate = (value: string, ) => {
       
        setShowEdit(false)
        if(triggerUpdate){
            triggerUpdate({newDescription: value, oldDescription:item.description })
        }
    }
    return (
        <div className={`${ContainerBgColor.PRIMARY} ${LabelColor.SECONDARY} p-2 rounded`}>
            <div className=' absolute w-5 z-[5] h-5 pt-1 pr-1 right-3 cursor-pointer' onClick={e => triggerRemove && triggerRemove(item.description)}><XCircleIcon /></div>
            {showEdit ? <TextArea
                onBlur={(event:any)=>onUpdate(event.target.value)}
                name='description'
                variant="outline"
                inputClassName='rounded-md'
                className="w-full"
                defaultValue={item.description}
            /> : <div onDoubleClick={() => setShowEdit(true)}>  {item.description} </div>}
            {/* <div className=' absolute w-5 z-[5] h-5 pt-1 pr-1 right-0 cursor-pointer' onClick={e => triggerRemove && triggerRemove(attachment.name)}><XCircleIcon /></div> */}

        </div>
    )
}

export default TodoItemForm