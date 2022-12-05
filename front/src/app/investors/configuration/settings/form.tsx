import Input from '@admin/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@admin/components/ui/button';
import TextArea from '@admin/components/ui/text-area';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { getLayout } from '@/components/layouts/layout';
import { NextPageWithLayout } from '@/types';
import { gql, useMutation } from '@apollo/client';
import { UPSERT_DEPARTMENT } from '@graphql/operations/departments/departmentMutations'
import { invConfValidationSchema } from './formvalidations/invconf-validation-schema';
import { UPDATE_INVESTOR_CONFIG } from '@graphql/operations/investors/investorsMutation';

type FormValues = {
    sharesPerBlock: number;
    votesPerShare: number;
};

type Props = {
    defaultValues?: any;
}


const InvestorConfForm = ({ defaultValues }: Props) => {
    const router = useRouter();
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        //@ts-ignore
        defaultValues: defaultValues,

        resolver: yupResolver(invConfValidationSchema),
    });
    const [updateConfig] = useMutation(UPDATE_INVESTOR_CONFIG);


    const onSubmit = (values: any) => {
      
        const input = {
            investor: {
                sharesPerBlock: parseFloat(values.sharesPerBlock),
                votesPerShare: parseFloat(values.votesPerShare)
            }
        };
        if (confirm('Are you sure you want to add configuration?')) {
            updateConfig({
                variables: {
                    input: input,
                },
            })
                .then((resp) => {
                    toast.success(t('Configuration successfully saved'));
                })
                .catch((error) => { console.log(error) });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="my-5 flex flex-wrap sm:my-8">
                    <Description
                        title={'Investor Settings'}
                        details={
                            'Configure investor detials here'
                        }
                        className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
                    />

                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <Input
                            label={'Shares Per Block'}
                            {...register('sharesPerBlock')}
                            error={t(errors.sharesPerBlock?.message!)}
                            variant="outline"
                            className="mb-5"
                            type='number'
                        />
                        <Input
                            label={'Votes per Share'}
                            {...register('votesPerShare')}
                            error={t(errors.votesPerShare?.message!)}
                            variant="outline"
                            className="mb-5"
                            type='number'
                        />

                        <div className="text-end mb-4">
                            <Button loading={false}>Save Details</Button>
                        </div>
                    </Card>
                </div>
            </form>
        </>
    );
};



export default InvestorConfForm;
