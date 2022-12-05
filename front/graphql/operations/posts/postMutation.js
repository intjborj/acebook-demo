import {gql, useMutation} from '@apollo/client';


export const UPSERT_POST = gql`
mutation UpsertPost($input: UpsertPostInput!) {
    upsertPost(input: $input) {
      _id
    }
  }
`


export const ARCHIVE_POST = gql`
mutation ArchivePost($input: PostArchive!) {
  archivePost(input: $input) {
    _id
  }
}
`


export const REACT_POST = gql`
mutation ReactPost($input: PostReactions!) {
  reactPost(input: $input) {
    _id
  }
}
`

export const REMOVE_REACT_POST = gql`
mutation RemoveReactPost($input: PostReactions!) {
  removeReactPost(input: $input) {
    _id
  }
}
`

