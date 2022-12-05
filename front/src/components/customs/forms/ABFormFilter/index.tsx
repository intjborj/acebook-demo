// Dependencies
import React from 'react'
import { useForm } from 'react-hook-form';
// Constants
import { PropForm } from '@/types/forms/propHookForm';
import { GENERAL_STATUS, TICKET_TYPE } from '@/constants/options';
import { selectFilterStyles } from '@/components/admin/components/ui/select/filter.styles';
// Global Components
import FilterPackIcon from '@/components/customs/iconPackage/filterPack-icon'
import ABPopoverLayout from '@/components/customs/layouts/ABPopoverLayout'
import ABDateRangePicker from '../Fields/ABDateRangePicker'
import ABButton, { BtnType } from '@/components/ui/buttons/ABbutton';
import SelectInput from '@admin/components/ui/select-input';
import { useTicketType } from '@/hooks/useTicketType';
import DepartmentFilter from './departmentFilter';



type Props = {
    filterAction?: (data: FilterFormType) => void,
    fields?: FilterFields[]
    dateRangeLabel?: string;
}

export enum FilterFields {
    DATE_RANGE = "date_range",
    STATUS = "status",
    TICKET_TYPE = "ticket_type",
    DEPARTMENT = "department"
}

export type FilterFormType = {
    startDate?: string;
    endDate?: string;
    status?: any;
    type?: any;
    department?: any;

}

const ABFormFilter = ({ filterAction, fields, dateRangeLabel }: Props) => {
    const { result: ticketTypes } = useTicketType()

    const defaultValues = {
        startDate: "",
        endDate: "",
        status: "",
        type: "",
        department: "",
    }
    const hookFormProp = useForm<FilterFormType>({
        defaultValues: defaultValues,
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
        setValue,
        getValues
    } = hookFormProp


    const onSubmit = (data: FilterFormType) => {

        if (filterAction) {
            filterAction(data)
        }
    }

    const handleReset = () => {

        if (filterAction) {
            reset()
            filterAction(defaultValues)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ABPopoverLayout
                    hasPopover={true}
                    popoverPosition={'-left-[8.7rem] md:-left-[.5rem]'}
                    button={

                        <FilterPackIcon

                            layoutProps={{
                                hoverSkew: false,
                                hoverShadow: true,
                                colorShadow: (
                                    watch('status') != "" ||
                                    watch('type') != "" ||
                                    watch('startDate') != "" ||
                                    watch('endDate') != "" ||
                                    watch('department') != "" 
                                    
                                    ) ? 'shadow-lg shadow-indigo-500/100' : null
                            }} />

                    }>
                    <>
                        {fields?.includes(FilterFields.DATE_RANGE) && <ABDateRangePicker hookFormProp={hookFormProp as PropForm} label={dateRangeLabel ?? "Dates"} />}
                        {fields?.includes(FilterFields.STATUS) &&
                            <div className='' >
                                <SelectInput

                                    dimension='small'
                                    {...register('status')}
                                    customStyle={selectFilterStyles}
                                    // errors={errors.type?.message!}
                                    placeholder='Status Filters'
                                    control={control}
                                    getOptionLabel={(option: any) => option.name}
                                    // getOptionLabel={(option: any) => {option.firstName+", "+option.lastName}}
                                    getOptionValue={(option: any) => option.code}
                                    options={GENERAL_STATUS}
                                    isLoading={false}
                                    isSearchable={true}
                                    isClearable={true}

                                />
                            </div>
                        }
                        {fields?.includes(FilterFields.TICKET_TYPE) &&
                            <div className='' >
                                <SelectInput

                                    dimension='small'
                                    {...register('type')}
                                    customStyle={selectFilterStyles}
                                    // errors={errors.type?.message!}
                                    placeholder='Ticket Type'
                                    control={control}
                                    getOptionLabel={(option: any) => option.name}
                                    // getOptionLabel={(option: any) => {option.firstName+", "+option.lastName}}
                                    getOptionValue={(option: any) => option.code}
                                    options={ticketTypes}
                                    isLoading={false}
                                    isSearchable={true}
                                    isClearable={true}

                                />
                            </div>
                        }
                        {fields?.includes(FilterFields.DEPARTMENT) &&
                            <DepartmentFilter hookFormProp={hookFormProp} />
                        }
                        <div className='flex justify-end gap-2'>
                            <ABButton onClick={handleReset} >Reset</ABButton>
                            <ABButton type={BtnType.SUBMIT}>Filter</ABButton>
                        </div>
                    </>
                </ABPopoverLayout>
            </form>
        </div>
    )
}

export default ABFormFilter