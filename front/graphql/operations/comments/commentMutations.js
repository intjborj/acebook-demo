import {gql, useMutation} from '@apollo/client';


export const UPSERT_COMMENT = gql`
mutation UpsertComment($input: UpsertCommentInput!) {
  upsertComment(input: $input) {
    _id
  }
}
`

export const ARCHIVE_COMMENT = gql`
mutation ArchiveComment($input: UpsertCommentInput!) {
  archiveComment(input: $input) {
    _id
  }
}
`





