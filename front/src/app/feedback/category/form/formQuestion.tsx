import { FBCatFormValues } from '@/types/feedbacks/feedbackType';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Input from '@admin/components/ui/input';
import Button from '@admin/components/ui/button';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { useMutation } from '@apollo/client';
import { UPSERT_FBCATEGORY } from '@graphql/operations/feedbacks/feedbackMutations';
import { toast } from 'react-toastify';
import { PropForm } from '@/types/forms/propHookForm';
import { useQuery } from '@apollo/client';
import { GET_ALL_FBQUESTION } from '@graphql/operations/feedbacks/feedbackQueries';
import Label from '@admin/components/ui/label';
import SelectInput from '@admin/components/ui/select-input';
import _ from 'lodash';
import { PlusIconCirle } from '@/components/icons/plus-icon-circle';
import { XCircleIcon } from '@/components/icons/xcircle-icon';


type Props = {}

type StateType = {
    slctQuestion?: any;
}

const FormQuestion = ({ register, errors, control, getValues, setValue, watch, itemId }: PropForm) => {

    const [state, setState] = useState<StateType>({ slctQuestion: [] })


    const { data: allFbQs, refetch } = useQuery(GET_ALL_FBQUESTION, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    useEffect(() => {
        register("submQuestions")
        register("submQuestionsTEMP")
    }, [])

    useEffect(() => {
        if (getValues("submQuestionsTEMP") && itemId) {
            let restruct = getValues("submQuestionsTEMP").map((item: any) => {
                let clonePay = _.cloneDeep(item)
                delete clonePay.__typename

                return clonePay
            })

            setState((p) => ({ ...p, slctQuestion: [...restruct] }))
            setValue("submQuestions", restruct)

        }


    }, [watch("submQuestionsTEMP")])


    const processSltData = (data: any) => {
        let searchDup = state.slctQuestion.filter((item: any) => {
            return data.question === item.question
        })

        if (searchDup.length === 0) {
            let clonePay = _.cloneDeep(data)
            delete clonePay.__typename;

            let payload = [...state.slctQuestion, clonePay]
            setState((p) => ({ ...p, slctQuestion: payload }))
            setValue("submQuestions", payload)
        }
    }

    const handleSelect = (data: any) => {
        processSltData(data)
    }

    const handleNew = () => {
        if (getValues("newQuestion")) {
            let payload = {
                question: getValues("newQuestion"),
                _id: null
            }

            processSltData(payload)
        }
    }

    const handleRemove = (data: any) => {

        let searchDup = state.slctQuestion.filter((item: any) => {
            return data.question !== item.question
        })


        setState((p) => ({ ...p, slctQuestion: [...searchDup] }))
        setValue("submQuestions", [...searchDup])

    }



    return (
        <div className="my-5 flex flex-wrap sm:my-8">
            <Description
                title={'Category Questions'}
                details={'Add category questions from here'}
                className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
                <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
                    <Label>{'Search Questions *'}</Label>
                    <SelectInput
                        name="question"
                        {...register('question')}
                        control={control}
                        getOptionLabel={(option: any) => option.question}
                        getOptionValue={(option: any) => option._id}
                        options={
                            _.get(allFbQs, 'fbQuestions.data')
                                ? _.get(allFbQs, 'fbQuestions.data')
                                : []
                        }
                        isLoading={false}
                        onSelectChange={handleSelect}

                    />

                    <div className='flex'>
                        <Input
                            label={'Add new question'}
                            {...register('newQuestion')}
                            variant="outline"
                            className="mb-5 w-[90%]"
                        />
                        <div onClick={handleNew} className=' w-[10%] cursor-pointer pl-2 text-teal-800 A flex justify-center'>
                            {/* <div onClick={handleNew} className=' '>  */}
                            <PlusIconCirle />
                            {/* </div> */}
                        </div>
                    </div>



                    {state.slctQuestion.length > 0 &&
                        <>
                            <Label className='pt-5'>{'Selected Questions'}</Label>


                            {
                                state.slctQuestion.map((item: any, index: number) => (
                                    <div className='p-3 bg-light shadow rounded flex'>
                                        <div className='bg-teal-600 text-zinc-100 w-6 h-5 flex pb-[1.5rem] justify-center rounded-full'>{index + 1}</div>
                                        <div className='pl-2 flex w-full'>
                                            <div className='w-[97%]'> {_.get(item, "question")}</div>
                                            <div className='w-5 cursor-pointer' onClick={() => handleRemove(item)} ><XCircleIcon /></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>

                    }

                </div>
            </Card>
        </div>
    )
}

export default FormQuestion