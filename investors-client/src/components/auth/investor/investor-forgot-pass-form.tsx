import AuthLayout from '@/components/layouts/auths/authLayout'
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import BorderDashed from '@/components/ui/border';
import Link from 'next/link'; import { CHECK_ID_NUMBER, CLIENT_UPDATE_INVESTOR, PROCESS_VOTE } from '@graphql/investors/invetorsMutations';
import { useMutation } from '@apollo/client';
import HaveAccountContainer from './components/haveAccountContainer';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { accValidationInvestorSchema, accValidationPasswordSchema } from './formvalidations/acc-validation-schema';
import Card from '@/components/common/card';
import { UPSERT_ACCOUNT } from '@graphql/operations/accounts/accountMutations';
import PasswordInput from '@/components/ui/forms/password-input';

type Props = {
    id?: string;
    investorId?: string;
    defaultValue?: FormValues;
}

type FormValues = {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    username: string;
    password?: string;
    email?: string;
    confPassword?: string;
    investorId?: string;
};

type StateTypes = {
    errorChecker: string | null;
    isSent?: boolean;
};
const formSchema = yup.object().shape({
    idnumber: yup.string().required('ID number is required'),
});

const InvestorFPForm = ({ id, investorId, defaultValue }: Props) => {
    const [updateAcc, { loading: updateLoading }] = useMutation(CLIENT_UPDATE_INVESTOR);
    const [upsertAccInv] = useMutation(UPSERT_ACCOUNT);
    const [state, setState] = useState<StateTypes>({
        errorChecker: null,
        isSent: false
    })

    const { t } = useTranslation();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<FormValues>({
        defaultValues: defaultValue ?? {},
        resolver: yupResolver(accValidationPasswordSchema),
    });

  
    const upsertSend = (payload: any) => {
        upsertAccInv({
            variables: {
                input: {
                    password: payload.password,
                    _id: id
                },
            },
        })
            .then((resp) => {
                if (_.get(resp, "data.registerMU._id")) {
                    reset()
                    setState((p) => ({ ...p, isSent: true }))

                    setTimeout(() => {
                        router.push('/login')
                    }, 2500);

                } else {
                    setState((p) => ({ ...p, isSent: false }))
                }
            })
            .catch((error) => {
                setState((p) => ({ ...p, isSent: false }))
            });
    }

    function onSubmit(payload: FormValues) {

        if (confirm("Are you sure you want to proceed?")) {
            upsertSend(payload)
        }
    }




    const RegForm = () => (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
           
            <div className='pt-4'>
                
                <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <PasswordInput
                            label={'Password'}
                            type="password"
                            {...register('password')}
                            error={t(errors.password?.message!)}
                            variant="outline"
                            className="mb-5"
                        />
                    </div>
                    <div>
                        <PasswordInput
                            type="password"
                            label={'Confirm Password'}
                            {...register('confPassword')}
                            error={t(errors.confPassword?.message!)}
                            variant="outline"
                            className="mb-5"
                        />
                    </div>
                </div>
            </div>
            {/* <Button className="w-full" loading={loading} disabled={loading}> */}
            <Button className="w-full" loading={updateLoading} disabled={updateLoading} >
              Update Password
            </Button>
            {state.errorChecker && <div className='flex justify-center text-red-600 pt-2'>
                {state.errorChecker}
            </div>}
        </form>
    )

    return (
        <div>
            <>
                {
                    state.isSent === true ?
                        <>
                            <div className='bg-gradient-to-r from-teal-500 h-fit to-cyan-600  shadow-lg shadow-cyan-500/50 text-white p-3 rounded-md mb-5'>
                                Account successfully updated. You will be redirected to login shortly ...
                            </div>
                        </>

                        : <></>
                }

                <RegForm />
            </>
        </div>
    )
}

export default InvestorFPForm