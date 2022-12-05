import AuthLayout from '@/components/layouts/auths/authLayout'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import BorderDashed from '@/components/ui/border';
import Link from 'next/link'; import { CHECK_ID_NUMBER, PROCESS_VOTE, SEND_VERIFICATION } from '@graphql/investors/invetorsMutations';
import { useMutation, useQuery } from '@apollo/client';
import HaveAccountContainer from './components/haveAccountContainer';
import _ from 'lodash';
import { QUERY_GET_SPEC_INVESTOR } from '@graphql/investors/investorsQueries';
import VerifyEmailCode from './verify-email-code';
import { ArrowPrev } from '@/components/icons';

type Props = {
    idNumber?: string | undefined;
}

type FormValues = {
    email: string;

};

type StateTypes = {
    errorChecker: string | null;
    email?: string | null;
    codeSent?: boolean;
    saveEmail?: string;
};

const formSchema = yup.object().shape({
    // email: yup.string().required('ID number is required'),
});

const InvEmailCheckingView = ({ idNumber }: Props) => {
    const [sendVerif, { loading: sendVerfLoading }] = useMutation(SEND_VERIFICATION);
    const [state, setState] = useState<StateTypes>({
        errorChecker: null,
        email: null,
        codeSent: false
    })

    const { data: specInv, loading: specInvLoading } = useQuery(QUERY_GET_SPEC_INVESTOR, {
        variables: {
            id: idNumber
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    useEffect(() => {
        if (specInv) {
            setState((p) => ({ ...p, email: _.get(specInv, "specificInvestor.data.email") }))
        }
    }, [specInv])


    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(formSchema),
    });

    function onSubmit({ email }: FormValues) {

        let sendEmail = state.email ?? email


        sendVerif({
            variables: {
                investorId: idNumber,
                email: sendEmail,
                id: _.get(specInv, "specificInvestor.data._id")
            },
        })
            .then((resp) => {

                if (_.get(resp, "data.verifyInvEmail.data.accepted").length >= 1) {
                    setState((p) => ({ ...p, codeSent: true, saveEmail: sendEmail }))
                }

            })
            .catch((error) => {

                setState((p) => ({ ...p, codeSent: false }))
            });
    }

    const obscureEmail = (email: string) => {
        const [name, domain] = email.split('@');
        return `${name[0]}${new Array(name.length - 2).join('*')}${name[name.length - 2]}${name[name.length - 1]}@${domain}`;
    };

    const EmailForm = () => (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {specInvLoading ? <></> :
                <>
                    {

                        state.email ?
                            <>
                                <div className='pb-2 flex'>
                                    Send verification code to {obscureEmail(state.email)}
                                </div>
                            </> :
                            <Input
                                label={"Verify Email"}
                                {...register('email')}
                                type="text"
                                // type="email"
                                variant="outline"
                                className="mb-4"
                                error={errors?.email?.message!}
                            />
                    }
                </>
            }
            {/* <Button className="w-full" loading={loading} disabled={loading}> */}
            <Button className="w-full" loading={sendVerfLoading} disabled={sendVerfLoading} >
                Send Verfication Code
            </Button>
            {state.errorChecker && <div className='flex justify-center text-red-600 pt-2'>
                {state.errorChecker}
            </div>}
        </form>
    )



    return (
        <div>
            <AuthLayout>
                <>
                    {
                        _.get(specInv, "specificInvestor.data._id") ?
                            <>
                                {state.codeSent == true ?
                                    <VerifyEmailCode
                                        regData={_.get(specInv, "specificInvestor.data")}
                                        id={_.get(specInv, "specificInvestor.data._id")}
                                        investorId={idNumber}
                                        codeSent={state.codeSent}
                                        verifyEmail={()=>{setState((p) => ({ ...p, codeSent: false }))}}
                                        saveEmail={state.saveEmail}
                                    /> 
                                    : <EmailForm />}




                                <HaveAccountContainer />
                            </>
                            : <></>
                    }
                </>
            </AuthLayout>
        </div>
    )
}

export default InvEmailCheckingView