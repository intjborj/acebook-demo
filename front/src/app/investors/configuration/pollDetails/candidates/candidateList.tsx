
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { useTranslation } from 'next-i18next';
// import { invConfValidationSchema } from './formvalidations/invconf-validation-schema';
import { PropForm } from '@/types/forms/propHookForm';
import SelectInput from '@admin/components/ui/select-input';
import { useQuery } from '@apollo/client';
import { SEARCH_ACCS } from '@graphql/operations/accounts/accountQueries';
import _ from 'lodash'
import React, { useState, useEffect } from "react"
import SelectedCandidates from './selectedCandidates';
import Label from '@admin/components/ui/label';
import { GET_EST_VOTES } from '@graphql/operations/investors/investorsQueries';
type Props = {}
type StateTypes = {
    selectedCandidates?: any;
    selectedCandidatesTemp?: any;
    totalVotesAvailable?: number;
}



const CandidateList = ({ register, errors, control, setValue, getValues, watch }: PropForm) => {
    const { t } = useTranslation();
    const [state, setState] = useState<StateTypes>({
        selectedCandidates: [],
        selectedCandidatesTemp: getValues("candidates"),
        totalVotesAvailable: 0
    })
    const { data: searchedUser, refetch: refectUsSearch } = useQuery(SEARCH_ACCS, {
        variables: {
            name: null
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const { data: totalVotes } = useQuery(GET_EST_VOTES, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    const getUserInputChange = (data: any) => {
        if (data != null || data != undefined || data != " ") {
            setTimeout(function () {
                refectUsSearch({
                    name: data
                })
            }, 500);
        }
    }
    const getUserChange = (data: any) => {

        let checkExist = state.selectedCandidates.filter((item: any) => {
            return item?._id === data?._id
        })


        if (checkExist.length == 0) {

            // let pushData = data
            let pushData = {}
            let checkTemp = state.selectedCandidatesTemp?.filter((item: any) => {
                return item?._id === data?._id
            })

            if (checkTemp && checkTemp.length == 1) {
                pushData = checkTemp[0]
            } else {
                pushData = data
            }


            let payload = [...state.selectedCandidates, pushData];
            setState((p) => ({ ...p, selectedCandidates: payload }))
            setValue("candidates", payload)

        }
    }

    const handleRemove = (data: any) => {

        let result = state.selectedCandidates.filter((item: any) => {
            return data._id != item._id
        })

        setState((p) => ({ ...p, selectedCandidates: result }))
        setValue("candidates", result)

    }
    const handleChangeCandidate = (data: any) => {

        let result = state.selectedCandidates.map((item: any) => {
            let duplicate = _.cloneDeep(item)
            if (item._id === data._id) {
                switch (data.type) {
                    case "vote":
                        duplicate.customVoteCount = data.value == "" || data.value == null || data.value == undefined ? null : data.value
                        break;

                    case "image":
                        duplicate.thumbnail = data.value == "" || data.value == null || data.value == undefined ? null : data.value
                        break;

                    default:
                        break;
                }


            }
            return duplicate
        })

        setState((p) => ({ ...p, selectedCandidates: result }))
        setValue("candidates", result)

    }
    useEffect(() => {
        register("candidates")
        if (getValues("candidates")) {
            setState((p) => ({ ...p, selectedCandidates: getValues("candidates") }))
        }
    }, [])

    useEffect(() => {
        if (totalVotes) {
            setState((p) => ({ ...p, totalVotes: _.get(totalVotes, "getTotalVotes.totalVotes") }))
        }
    }, [totalVotes])

    useEffect(() => {

       
        if (( getValues("candidates") && getValues("candidates").length > 0) && _.get(totalVotes, "getTotalVotes.totalVotes")) {
            let accum = 0

            getValues("candidates").map((item: any) => {
                accum += item?.customVoteCount ? parseInt(item?.customVoteCount) : 0
            })
           
            setState((p)=>({...p, totalVotesAvailable: parseInt(_.get(totalVotes, "getTotalVotes.totalVotes")) - accum}))
        }

    }, [watch('candidates') && totalVotes])

    return (
        <>
            <div className="my-5 flex flex-wrap sm:my-8">
                <Description
                    title={'Candidates'}
                    details={
                        'Modify candidates here'
                    }
                    className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <div className='text-gray-600 bg-slate-300 w-fit rounded p-1 mb-2 px-3'>
                        <span className='text-xs'> Total Votes Available</span> <span className='font-bold'>{state.totalVotesAvailable}</span>
                    </div>
                    <Label>{'Search Candidate'}</Label>
                    <SelectInput
                        name="candidateTemp"
                        {...register('candidateTemp')}
                        errors={errors.requestedBy?.message!}
                        control={control}
                        getOptionLabel={(option: any) => option.firstName + ", " + option.lastName}
                        // getOptionLabel={(option: any) => {option.firstName+", "+option.lastName}}
                        getOptionValue={(option: any) => option._id}
                        options={_.get(searchedUser, "search_accounts.data")}
                        onInputChange={getUserInputChange}
                        isLoading={false}
                        // onChange={getUserChange}
                        onSelectChange={getUserChange}
                    />

                    <SelectedCandidates data={state.selectedCandidates} remove={handleRemove} candidateChange={handleChangeCandidate} />



                </Card>


            </div>
        </>
    )
}

export default CandidateList