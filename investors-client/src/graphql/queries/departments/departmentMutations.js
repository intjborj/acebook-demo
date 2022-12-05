import {gql, useMutation} from '@apollo/client';


export const UPSERT_DEPARTMENT = gql`
mutation UpsertDepartment($input: UpsertDepartmentInput!) {
    upsertDepartment(input: $input) {
      name
      _id
    }
  }
`