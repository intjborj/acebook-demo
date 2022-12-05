import { useQuery , useLazyQuery} from '@apollo/client';
import { GET_DEPTS } from '@graphql/operations/departments/departmentQueries';
import _ from 'lodash';
import { useEffect } from 'react';

type Props = {
   type?: string,
   id?: string
}

export const useFetchDepartment = ({type, id}: Props) => {

    const [getDepartment, { loading, error, data: specData }] = useLazyQuery(GET_DEPTS);

    useEffect(() => {
      if(type == "specific" && id){
        getDepartment({ variables: { id: id } })
      }
    }, [type && id])
    


    return {
        result: type == "specific"  ? (_.get(specData, "department.data") ?? {}) : [],
        // loading: loading
    }
}   