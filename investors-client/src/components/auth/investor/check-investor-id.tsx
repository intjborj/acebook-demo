import AuthLayout from '@/components/layouts/auths/authLayout'
import React, {useState} from 'react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import BorderDashed from '@/components/ui/border';
import Link from 'next/link';import { CHECK_ID_NUMBER, PROCESS_VOTE } from '@graphql/investors/invetorsMutations';
import { useMutation } from '@apollo/client';
import HaveAccountContainer from './components/haveAccountContainer';
import _ from 'lodash';

type Props = {}

type FormValues = {
    idnumber: string;
};

type StateTypes = {
    errorChecker: string | null;
};
const formSchema = yup.object().shape({
    idnumber: yup.string().required('ID number is required'),
});

const InvIdCheckingView = (props: Props) => {
  const [checkID, {loading:checkLoading}] = useMutation(CHECK_ID_NUMBER);
  const [state, setState] = useState<StateTypes>({
    errorChecker : null
  })
  const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(formSchema),
    });

    function onSubmit({ idnumber }: FormValues) {
       

        checkID({
            variables: {
                id: idnumber,
            },
        })
            .then((resp) => {
                // toast.success('Vote sucessfully saved');
                // refecthAcc()
              
                if(_.get(resp, "data.checkSpecInvestor.data._id")){
                    router.push(`/investor/registration/emailverifier/${idnumber}`)
                }else{
                    setState((p)=>({...p, errorChecker: "Could not found ID Number"}))
                }
            })
            .catch((error) => {
                // toast.error('Failed to submit votes');
            });
    }

    return (
        <div>
            <AuthLayout>
                <>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Input
                            label={"ID Number"}
                            {...register('idnumber')}
                            type="text"
                            // type="email"
                            variant="outline"
                            className="mb-4"
                            error={errors?.idnumber?.message!}
                        />
                        {/* <Button className="w-full" loading={loading} disabled={loading}> */}
                        <Button className="w-full" loading={checkLoading} disabled={checkLoading} >
                            Check ID Number
                        </Button>
                       {state.errorChecker && <div className='flex justify-center text-red-600 pt-2'>
                                {state.errorChecker}
                        </div>}
                    </form>
                   <HaveAccountContainer/>
                </>
            </AuthLayout>
        </div>
    )
}

export default InvIdCheckingView