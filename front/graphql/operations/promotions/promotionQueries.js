import {gql, useQuery} from '@apollo/client';


export const GET_PROMOTIONS = gql`
query Query {
  promotions {
    data {
      path
      _id
      type
    }
  }
}
`
