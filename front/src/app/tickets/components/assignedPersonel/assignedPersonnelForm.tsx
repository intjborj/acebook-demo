
import { WorkFormValues } from '@/types/workDetails/workTypes';
import React, { useState } from 'react'
import SelectInput from '@admin/components/ui/select-input';
import Label from '@admin/components/ui/label';
import { useQuery } from '@apollo/client';
import { SEARCH_ACCS } from '@graphql/operations/accounts/accountQueries';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import BorderDashed from '@/components/ui/border';
import ABButton, { BtnType } from '@/components/ui/buttons/ABbutton';
import { CHANGE_TICKET_STATUS, GET_ARCHIVED, UPSERT_ASSIGNATORIES } from '@graphql/operations/tickets/ticketMutation';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { PostContextRd, PostContextType } from '@/reducers/posts/postContextRd';


type Props = {
    ticketData?: any;
    workData?: WorkFormValues;
    defaults?: any;
    ticketId?: string;
}

type AssigForm = {
    assignedPersonnel: object[];
}

const AssignedPersonnelForm = ({ defaults, ticketId }: Props) => {
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
    const [oldPersonnel, setOldPersonnel] = useState<any>(defaults?.assignedPersonnel)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
        setValue,
        getValues
    } = useForm<AssigForm>({
        //@ts-ignore
        defaultValues: defaults ?? {},
        // resolver: yupResolver(ticketValidationSchema),
    });
    const [upsertAssigs] = useMutation(UPSERT_ASSIGNATORIES);

    const processChange = (assignedPersonnel: any) => {
        upsertAssigs({
            variables: {
                input: {
                    _id: ticketId, // ticket id
                    assignedPersonnel: assignedPersonnel
                }
            },
        })
            .then((resp) => {
                dispatchPostRd({ type: "refetch", modalData: true })
                toast.success("Personnel updated successfully")

            })
            .catch((error) => {
                toast.error("Personnel failed to update")

            });
    }


    const { data: searchedUser, refetch: refectUsSearch } = useQuery(SEARCH_ACCS, {
        variables: {
            name: null
        },
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


    const onSubmit = (data: AssigForm) => {
      
        if (confirm("Are you sure you want to change assigned personnel?")) {
            let recon = data.assignedPersonnel.map((item: any) => {
                let oldP = oldPersonnel.filter((olditem: any) => {
                    return olditem._id === item._id
                })

                if (oldP.length > 0) {
                    return {
                        user: oldP[0]._id,
                        receivedAt: oldP[0].receivedAt
                    }
                } else {
                    return {
                        user: item._id,
                        receivedAt: item.receivedAt
                    }
                }

            })

            processChange(recon)
        }

    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label>{'Assigned Personnel *'}</Label>
                <SelectInput
                    {...register('assignedPersonnel')}
                    // errors={errors.assignedPersonnel?.message!}
                    control={control}
                    getOptionLabel={(option: any) => option?.firstName + ", " + option?.lastName}
                    // getOptionLabel={(option: any) => {option.firstName+", "+option.lastName}}
                    getOptionValue={(option: any) => option?._id}
                    options={_.get(searchedUser, "search_accounts.data")}
                    onInputChange={getUserInputChange}
                    isLoading={false}
                    // onChange={{}}
                    // onSelectChange={{}}
                    // onChange={getUserChange}
                    // onSelectChange={getUserChange}
                    isMulti={true}
                    isSearchable={true}
                    placeholder={"Assigned Personnel"}
                />

                <div className='flex justify-center pt-2'>
                    <ABButton type={BtnType.SUBMIT}  >Save</ABButton>
                </div>
            </form>
        </div>
    )
}

export default AssignedPersonnelForm