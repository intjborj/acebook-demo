import React, { useEffect } from "react"
import Input from '@admin/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@admin/components/ui/button';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { gql, useMutation } from '@apollo/client';
// import { invConfValidationSchema } from './formvalidations/invconf-validation-schema';
import { UPDATE_INVESTOR_CONFIG, UPDATE_POLL_DETAILS } from '@graphql/operations/investors/investorsMutation';
import CandidateList from './candidateList';
import BorderDashed from '@/components/ui/border';
import _ from "lodash";
import Checkbox from '@admin/components/ui/checkbox/checkbox';
import { uploadAttachment } from "@/services/uploading";

type FormValues = {
    period?: string;
    candidates?: any;
    candidatesTemp?: any;
    isCurrentTerm?: boolean;
    votingOpen?:boolean;
};

type Props = {
    defaultValues?: any;
}


const CandidateForm = ({ defaultValues }: Props) => {
    const router = useRouter();
    const { query } = useRouter();
    const { searchType, id, ...restQuery } = query;

    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
        watch
    } = useForm<FormValues>({
        //@ts-ignore
        defaultValues: defaultValues ?? {},

        // resolver: yupResolver(invConfValidationSchema),
    });
    const [updateDetails] = useMutation(UPDATE_POLL_DETAILS);

    const onSubmit = (values: FormValues) => {


        let accIds = []
        let updatedAcc

        if (values.candidates) {
            const unqCandidates =  _.uniq(values.candidates)

            accIds = unqCandidates.map((item: any) => {
                let uploadResult
                let fileName

                if (item.thumbnail) {
                    uploadResult = uploadAttachment(item.thumbnail, 'investors');
                    // uploadCheck = (await uploadResult).status == "ok" ? true : false
                    // console.log("uploadCheck", await uploadResult)
                }

                if (item.thumbnail) {
                    fileName = _.get(item, "thumbnail[0].name")
                   
                }

                return {
                    user: item._id,
                    candidateId: item.candidateId ?? null,
                    customVoteCount: item.customVoteCount ? parseInt(item.customVoteCount) : null,
                    thumbnail: fileName
                }
            })

            updatedAcc = accIds
        }



        let payload = {
            _id: id,
            period: values.period,
            candidates: updatedAcc,
            isCurrentTerm: values.isCurrentTerm,
            votingOpen: values.votingOpen
        }

      
        if (confirm('Are you sure you want to update details?')) {
            updateDetails({
                variables: {
                    input: payload,
                },
            })
                .then((resp) => {
                    toast.success(t('Details successfully saved'));
                })
                .catch((error) => {
                    toast.error(t('Failed to save data'));
                });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="my-5 flex flex-wrap sm:my-8">
                    <Description
                        title={'BOD Term period'}
                        details={
                            'Input BOD term period here '
                        }
                        className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
                    />

                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <Input
                            label={'Period'}
                            {...register('period')}
                            error={t(errors.period?.message!)}
                            variant="outline"
                            className="mb-5"
                        />

                        <Checkbox
                            {...register('isCurrentTerm')}
                            // id="is_active"
                            label={t('Is Current Term')}
                            name={'isCurrentTerm'}
                            // disabled={Boolean(false)}
                            // disabled={Boolean(is_external)}
                            className="mb-5"
                        /> 
                        <Checkbox
                            {...register('votingOpen')}
                            // id="is_active"
                            label={t('Voting Open')}
                            name={'votingOpen'}
                            // disabled={Boolean(false)}
                            // disabled={Boolean(is_external)}
                            className="mb-5"
                        />


                    </Card>


                </div>
                <BorderDashed />
                <CandidateList watch={watch} register={register} errors={errors} control={control} setValue={setValue} getValues={getValues} />
                <div className="text-end mb-4 ">
                    <Button loading={false}>Save Details</Button>
                </div>
            </form>
        </>
    );
};



export default CandidateForm;
