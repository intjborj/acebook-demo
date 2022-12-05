import {gql, useQuery} from '@apollo/client';


export const GET_ALL_RESTRICTIONS = gql`
query Data {
  restrictions {
    data {
      code
      description
      path
    }
  }
}
`