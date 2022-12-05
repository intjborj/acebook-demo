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
import { accValidationInvestorSchema } from './formvalidations/acc-validation-schema';
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

const InvestorRegForm = ({ id, investorId, defaultValue }: Props) => {
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
        resolver: yupResolver(accValidationInvestorSchema),
    });

    const updateSend = (payload: any) => {
        updateAcc({
            variables: {
                input: {
                    investorDetails: {
                        investorId: payload.investorId
                    },
                    firstName: payload.firstName,
                    middleName: payload.middleName,
                    lastName: payload.lastName,
                    suffix: payload.suffix,
                    username: payload.username,
                    password: payload.password,
                    email: payload.email
                },
            },
        })
            .then((resp) => {
                reset
                if (_.get(resp, "data.investorRegistration._id")) {
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

    const createSend = (payload: any) => {
        upsertAccInv({
            variables: {
                input: {
                    investorDetails: {
                        investorId: payload.investorId,
                        blocks: 1
                    },
                    firstName: payload.firstName,
                    middleName: payload.middleName,
                    lastName: payload.lastName,
                    suffix: payload.suffix,
                    username: payload.username,
                    password: payload.password,
                    email: payload.email,
                    restrictionCode: ["POLL_INVESTOR_VOTE_PAGE"]
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

            if (investorId) {
                updateSend(payload)
            } else {
                createSend(payload)
            }

        }
    }




    const RegForm = () => (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <Input
                    label={'ID No.'}
                    {...register('investorId')}
                    error={t(errors.investorId?.message!)}
                    disabled={defaultValue?.investorId ? true : false}
                    variant="outline"
                    className="mb-5"
                />
            </div>
            <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">
                <div>
                    <Input
                        label={'First Name *'}
                        {...register('firstName')}
                        error={t(errors.firstName?.message!)}
                        disabled={defaultValue?.firstName ? true : false}
                        variant="outline"
                        className="mb-5"
                    />
                </div>
                <div>
                    <Input
                        label={'Middle Name '}
                        {...register('middleName')}
                        error={t(errors.middleName?.message!)}
                        disabled={defaultValue?.middleName ? true : false}
                        variant="outline"
                        className="mb-5"
                    />
                </div>
                <div>
                    <Input
                        label={'Last Name *'}
                        {...register('lastName')}
                        error={t(errors.lastName?.message!)}
                        disabled={defaultValue?.lastName ? true : false}
                        variant="outline"
                        className="mb-5"
                    />
                </div>
                <div>
                    <Input
                        label={'Suffix'}
                        {...register('suffix')}
                        error={t(errors.suffix?.message!)}
                        disabled={defaultValue?.suffix ? true : false}
                        variant="outline"
                        className="mb-5"
                    />
                </div>
            </div>
            <BorderDashed />
            <div className='pt-4'>
                <Input
                    label={'Email'}
                    {...register('email')}
                    error={t(errors.email?.message!)}
                    // disabled={defaultValue?.username ? true : false}
                    variant="outline"
                    className="mb-5"
                />
                <Input
                    label={'Username *'}
                    {...register('username')}
                    error={t(errors.username?.message!)}
                    // disabled={defaultValue?.username ? true : false}
                    variant="outline"
                    className="mb-5"
                />
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
                {investorId ? <> Update Details</> : <>Save Details</>}
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

export default InvestorRegForm