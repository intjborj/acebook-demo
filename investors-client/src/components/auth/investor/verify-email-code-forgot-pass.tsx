import AuthLayout from '@/components/layouts/auths/authLayout'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import BorderDashed from '@/components/ui/border';
import Link from 'next/link'; import { CHECK_ID_NUMBER, PROCESS_VOTE, SEND_VERIFICATION, VERIFY_EMAIL_CODE } from '@graphql/investors/invetorsMutations';
import { useMutation, useQuery } from '@apollo/client';
import HaveAccountContainer from './components/haveAccountContainer';
import _ from 'lodash';
import { QUERY_GET_SPEC_INVESTOR } from '@graphql/investors/investorsQueries';
import InvestorRegForm from './investor-registration-form';
import { ArrowPrev } from '@/components/icons';
import InvestorFPForm from './investor-forgot-pass-form';


type Props = {
    id?: string;
    investorId?: string;
    regData?: any;
    saveEmail?: string;
    codeSent?: boolean;
    verifyEmail?: any;
}
type FormValues = {
    sentCode: string;

};
type StateTypes = {
    errorChecker: string | null;
    email?: string | null;
    codeSent?: boolean;
    codeMatch?: boolean;
    regValue?: any;
};

const formSchema = yup.object().shape({
    // email: yup.string().required('ID number is required'),
});
const VerifyEmailCodeFP = ({ id, investorId, regData, saveEmail,codeSent, verifyEmail }: Props) => {
    const [sendVerif, { loading: sendVerfLoading }] = useMutation(VERIFY_EMAIL_CODE);
   
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(formSchema),
    });

    const [state, setState] = useState<StateTypes>({
        errorChecker: null,
        codeMatch: false,
        regValue: {}
    })

    useEffect(() => {

        if (regData) {
            let payload = {
                firstName: _.get(regData, "firstName"),
                middleName: _.get(regData, "middleName"),
                lastName: _.get(regData, "lastName"),
                suffix: _.get(regData, "suffix"),
                email: saveEmail,
                investorId: investorId
                // username: _.get(regData, "username")
            }
            setState((p) => ({ ...p, regValue: payload }))
        }

    }, [regData])


    function onSubmit({ sentCode }: FormValues) {

        let errorMessage = "Code does not match"
        let successMessage = "Code match"

        sendVerif({
            variables: {
                investorId: investorId,
                emailCode: sentCode,
                id: id
            },
        })
            .then((resp) => {
             
                if (_.get(resp, "data.verifyInvEmailCode.data.response") === "failed") {
                    setState((p) => ({ ...p, errorChecker: errorMessage, codeMatch: false }))
                } else if (_.get(resp, "data.verifyInvEmailCode.data.response") === "success") {
                    setState((p) => ({ ...p, errorChecker: successMessage, codeMatch: true }))
                }

            })
            .catch((error) => {
                setState((p) => ({ ...p, errorChecker: errorMessage, codeMatch: false }))
            });

    }


    const VerifyCode = () => (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
                label={"Code sent on your email"}
                {...register('sentCode')}
                type="text"
                // type="email"
                variant="outline"
                className="mb-4"
                error={errors?.sentCode?.message!}
            />
            {state.errorChecker && <div className={`flex justify-center ${state.codeMatch ? 'text-green-600' : 'text-red-600'} pb-2`}>
                {state.errorChecker}
            </div>}
            {/* <Button className="w-full" > */}
            <Button className="w-full" loading={sendVerfLoading} disabled={sendVerfLoading} >
                Verify Sent Code
            </Button>

            {codeSent == true ? <div className='pt-3 flex justify-center'>
                <div onClick={() => { verifyEmail ? verifyEmail(true) : {} }} className=' text-xs text-white p-2 bg-slate-400 w-fit rounded cursor-pointer flex'>
                    <ArrowPrev />
                    <span className='grid content-center'> Check provided email</span>
                </div>
            </div> : <></>}
        </form>
    )


    return (
        <div>
            {state.codeMatch === true ? <InvestorFPForm defaultValue={state.regValue} id={id} investorId={investorId as string} /> : <VerifyCode />}
        </div>
    )
}

export default VerifyEmailCodeFP