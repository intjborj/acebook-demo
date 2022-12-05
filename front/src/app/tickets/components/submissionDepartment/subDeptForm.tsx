import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_DEPTS } from '@/graphql/queries/departments/departmentQueries';
import SelectInput from '@admin/components/ui/select-input';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { DepartmentGenType } from '@/types/departments/departmentTypes';
import Label from '@admin/components/ui/label';
import ABButton, { BtnType } from '@/components/ui/buttons/ABbutton';
import { UPSERT_SUBMISSIONDEPT } from '@graphql/operations/tickets/ticketMutation';
import { toast } from 'react-toastify';
import { PostContextRd, PostContextType } from '@/reducers/posts/postContextRd';

type Props = {
  workId?: string;
  defaults?: any
}
type FormType = {
  submissionDepartment: DepartmentGenType[];
}

const SubDeptForm = ({ workId,  defaults }: Props) => {

  const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
  const { data: alldepts, refetch } = useQuery(GET_ALL_DEPTS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm<FormType>({
    //@ts-ignore
    defaultValues: defaults ?? {},

  });

  const [upsertSubDep] = useMutation(UPSERT_SUBMISSIONDEPT);

  const processChange = (subDept: any) => {
    upsertSubDep({
      variables: {
        input: {
          _id: workId, // ticket id
          submissionDepartment: subDept
        }
      },
    })
      .then((resp) => {
        dispatchPostRd({ type: "refetch", modalData: true })
        toast.success("Submission department updated successfully")

      })
      .catch((error) => {
        toast.error("Submission department failed to update")

      });
  }



  const onSubmit = (data: FormType) => {
   

    if (confirm("Are you sure you want to change assigned personnel?")) {
      // DEPSRTMENT
      let recon = data.submissionDepartment.map((item: any) => {
        return {
          department: item._id,
          status: null,
          updatedAt: null
        }
        // let oldP = oldPersonnel.filter((olditem: any) => {
        //     return olditem._id === item._id
        // })

        // if (oldP.length > 0) {
        //     return {
        //         user: oldP[0]._id,
        //         receivedAt: oldP[0].receivedAt
        //     }
        // } else {
        //     return {
        //         user: item._id,
        //         receivedAt: item.receivedAt
        //     }
        // }

        // return {
        //   user: item._id,
        //   receivedAt: item.receivedAt
        // }

      })
     
      processChange(recon)
    }

  }



  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>{'Submission Department'}</Label>
        <SelectInput
          {...register('submissionDepartment')}
          // errors={errors.department?.message!}
          control={control}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option._id}
          options={
            _.get(alldepts, 'departments.data')
              ? _.get(alldepts, 'departments.data')
              : []
          }
          placeholder=""
          isSearchable={true}
          isLoading={false}
          isMulti={true}
        />

        <div className='flex justify-center pt-2'>
          <ABButton type={BtnType.SUBMIT}  >Save</ABButton>
        </div>
      </form>
    </div>
  )
}

export default SubDeptForm