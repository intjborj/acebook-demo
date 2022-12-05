import {gql, useMutation} from '@apollo/client';


export const UPSERT_POST = gql`
mutation UpsertPost($input: UpsertPostInput!) {
    upsertPost(input: $input) {
      _id
    }
  }
`


