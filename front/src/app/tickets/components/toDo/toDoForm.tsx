import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import TextArea from '@/components/ui/forms/text-area';
import ABButton, { ButtonCategory } from '@/components/ui/buttons/ABbutton';
import { ContainerBgColor, LabelColor } from '@/constants/enums/themes';
import moment from 'moment';
import { useRouter } from 'next/router';
import { UPSERT_TODO } from '@graphql/operations/tickets/ticketMutation';
import { toast } from 'react-toastify';
import BorderDashed from '@/components/ui/border';
import NoData from '@/components/customs/information/noData';
import _ from 'lodash';
import { PostContextRd } from '@/reducers/posts/postContextRd';
import TodoItemForm from './todoItemForm';

export type TodoType = {
    description: string,
    updatedAt: string
}

type TodDoFormValues = {
    newToDo?: string;
}

type Props = {
    defaultList?: TodoType[]
}

const ToDoForm = ({ defaultList }: Props) => {
    const { query } = useRouter();
    const { searchType, id: ticketId, ...restQuery } = query;
    const [todos, setTodos] = useState<TodoType[]>([])
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)

    const hookFormProp = useForm<TodDoFormValues>({
        //@ts-ignore
        // defaultValues: postDefault ?? defaultVals,
        // resolver: yupResolver(ticketValidationSchema),
    });
    const [upsertTodo] = useMutation(UPSERT_TODO);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
        setValue,
        getValues
    } = hookFormProp;

    useEffect(() => {
        if (defaultList) {

            let dataLoad = _.map(defaultList, function (item) {
                return _.assign({
                    description: item.description,
                    updatedAt: item.updatedAt,
                });
            });

            setTodos(dataLoad)
        }

        return () => {
            setTodos([])
            reset()
        }
    }, [defaultList])


    const onSubmit = (data: TodDoFormValues) => {
        if (data.newToDo) {
            setTodos([...todos,
            ...[{
                description: data.newToDo,
                updatedAt: moment().format()
            }]])

            reset()
        }
    }

    const submitTodo = () => {
        if (confirm('Are you sure you want to save To Do?')) {
            upsertTodo({
                variables: {
                    input: {
                        _id: ticketId, // ticket id
                        toDo: todos
                    }
                },
            })
                .then((resp) => {
                    toast.success("To Do saved successfully")
                    dispatchPostRd({ type: "refetch", modalData: true })
                })
                .catch((error) => {
                    toast.error("To Do failed to save")

                });
        }
    }

    const removeTodo = (description: string) => {
        const newTodo = todos.filter((item: TodoType) => {
            return item.description !== description
        })

        setTodos(newTodo)
    }

    const updateTodo = (data: any) => {

        const newTodo = todos.map((item: TodoType) => {

            if (item.description === data.oldDescription) {
                item.description = data.newDescription
                item.updatedAt = moment().format()
            }

            return item
        })

        setTodos(newTodo)
    }

    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-4 pb-3'>

                    <TextArea
                        // label={'Description *'}
                        {...register('newToDo')}
                        // error={errors.description?.message!}
                        variant="outline"
                        inputClassName='rounded-md'
                        rows={1}
                        className="w-4/5"
                    />
                    <div className=' flex justify-end'>
                        <div className='grid content-center'>
                            <ABButton type={'submit'}>Add</ABButton>
                        </div>
                    </div>

                </div>
            </form>
            <BorderDashed />
            <div className='p-1 pt-3'>
                <div className={`grid grid-cols-1 gap-1`}>
                    {
                        todos.length > 0 ? <>
                            {_.orderBy(todos, "updatedAt", "asc").map((item: TodoType) => (
                                <TodoItemForm item={item} triggerRemove={removeTodo} triggerUpdate={updateTodo} />
                            ))}
                        </> : <NoData />
                    }
                </div>
            </div>
            <div className='grid grid-cols-2'>
                <div className={`italic text-xs grid content-center ${LabelColor.SECONDARY}`}>* Double click item to edit</div>
                <div className="flex justify-end p-2 pr-1">
                    <ABButton category='secondary' onClick={submitTodo}>Save</ABButton>
                </div>
            </div>

            <BorderDashed />


        </div>
    )
}

export default ToDoForm