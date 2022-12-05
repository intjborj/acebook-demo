import {gql, useMutation} from '@apollo/client';


export const UPSERT_COMMENT = gql`
mutation UpsertComment($input: UpsertCommentInput!) {
  upsertComment(input: $input) {
    _id
  }
}
`





