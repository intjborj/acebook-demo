import Input from '@admin/components/ui/input';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import SelectInput from '@admin/components/ui/select-input';
import Label from '@admin/components/ui/label';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_DEPTS } from '@/graphql/queries/departments/departmentQueries';
import _ from 'lodash';
import { SEARCH_ACCS } from '@graphql/operations/accounts/accountQueries';
import { GET_TICKET_TYPE_SPEC } from '@graphql/operations/tickets/ticketQueries';
import React, { useEffect, useState } from 'react'
import Assignatories from './assignatories';
import SmallLoader from '@/components/ui/loaders/smallLoader';
import { useUserSearch } from '@/hooks/useUserSearch';

type Props = {
    register?: any;
    errors?: any;
    control?: any;
    createdByOpt?: any;
    watch?: any;
    setValue?: any;
    getValues?: any;


    update?: boolean;
};

type StateType = {
    approverList?: object[];
    approverListTemp?: object[];
    loaded?: boolean;
    loadingAssig?: boolean;
}

const TicketAutorization = ({ register, errors, control, createdByOpt, watch, setValue, getValues, update }: Props) => {
    const { result: userResult, search: searchUser } = useUserSearch()

    const [state, setState] = useState<StateType>({
        approverList: [],
        approverListTemp: [],
        loaded: getValues("approvers_temp") ? false : true,
        loadingAssig: false
    })

    const { data: alldepts, refetch } = useQuery(GET_ALL_DEPTS, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const [getTicketType, { error, data: dataTicketType }] = useLazyQuery(GET_TICKET_TYPE_SPEC, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const getUserChange = (data: any) => {
        setValue("requestedBy", data)
        if (confirm("Do you also want to change the requesting department base on requestor's department?")) {
            setValue("requestingDepartment", _.get(data, "departmentOnDuty"))
        }
    }

    useEffect(() => {
        if (dataTicketType && _.get(dataTicketType, "ticketTypes.data").length > 0 && state.loaded) {
            // console.log("ticd", _.get(dataTicketType, "ticketTypes.data[0].serviceDepartment"))
            setValue("approvers", _.get(dataTicketType, "ticketTypes.data[0].approvers"))
            setValue("serviceDepartment", _.get(dataTicketType, "ticketTypes.data[0].serviceDepartment[0]") ?? '')
            setState((p) => ({ ...p, approverList: _.get(dataTicketType, "ticketTypes.data[0].approvers") }))
        }
    }, [dataTicketType])

    useEffect(() => {
        if (getValues("type") && state.loaded) {
            let typevals = getValues("type")

            getTicketType({
                variables: {
                    type: "specific",
                    code: typevals.code
                }
            })
        }
    }, [watch("type")])

    useEffect(() => {

        if (getValues("approvers_temp")) {
            setState((p) => ({ ...p, loadingAssig: true }))
            setTimeout(() => {
                setValue("approvers", getValues("approvers_temp"))
                setState((p) => ({ ...p, approverList: getValues("approvers_temp"), loaded: true, loadingAssig: false }))
            }, 1500);
        }

    }, [])

    return (
        <div className="my-5 flex flex-wrap sm:my-8">
            <Description
                title={'Ticket Authorization'}
                details={'Add/Check Employee and Department authorization.'}
                className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
                <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <div className="mb-5">
                            <Label>{'Created By *'}</Label>
                            <SelectInput
                                isDisabled={true}
                                name="createdBy"
                                {...register('createdBy')}
                                errors={errors.createdBy?.message!}
                                control={control}
                                getOptionLabel={(option: any) => option.firstName + ", " + option.lastName}
                                // getOptionLabel={(option: any) => {option.firstName+", "+option.lastName}}
                                getOptionValue={(option: any) => option._id}
                                options={createdByOpt}
                                isLoading={false}
                                isSearchable={false}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='mb-5'>
                            <Label>{'Requested By *'}</Label>
                            <SelectInput
                                name="requestedBy"
                                {...register('requestedBy')}
                                errors={errors.requestedBy?.message!}
                                control={control}
                                getOptionLabel={(option: any) => option.firstName + ", " + option.lastName}
                                getOptionValue={(option: any) => option._id}
                                options={userResult}
                                onInputChange={searchUser}
                                isLoading={false}
                                onChange={getUserChange}
                                onSelectChange={getUserChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2 mb-5">
                    <div >
                        <Label>{'Service Department *'}</Label>
                        <SelectInput
                            name="serviceDepartment"
                            {...register('serviceDepartment')}
                            errors={errors.serviceDepartment?.message ? 'Field Invalid' : null}
                            // errors={errors.serviceDepartment?.message!}
                            control={control}
                            getOptionLabel={(option: any) => option.name}
                            getOptionValue={(option: any) => option._id}
                            options={
                                _.get(alldepts, 'departments.data')
                                    ? _.get(alldepts, 'departments.data')
                                    : []
                            }
                            isLoading={false}
                        />
                    </div>
                    <div>
                        <Label>{'Requesting Department *'}</Label>
                        <SelectInput
                            name="requestingDepartment"
                            {...register('requestingDepartment')}
                            errors={errors.requestingDepartment?.message!}
                            control={control}
                            getOptionLabel={(option: any) => option.name}
                            getOptionValue={(option: any) => option._id}
                            options={
                                _.get(alldepts, 'departments.data')
                                    ? _.get(alldepts, 'departments.data')
                                    : []
                            }
                            isLoading={false}
                        />
                    </div>
                </div>

                <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
                    <div>
                        <Input
                            label={'Service Location'}
                            {...register('location')}
                            error={errors.location?.message!}
                            variant="outline"
                            className="mb-5"
                        />
                    </div>
                </div>

                <div className=''>
                    {
                        state.loadingAssig ?
                            <>
                                <div className='flex'>
                                    <SmallLoader />
                                    <span className='pl-3'>Loading assignatories ...</span>
                                </div>
                            </>
                            :
                            <>
                                {
                                    state.approverList && state.approverList?.length > 0 ?
                                        <><Assignatories data={state.approverList} /></> : <></>
                                }
                            </>
                    }
                </div>

            </Card>
        </div>
    )
}

export default TicketAutorization