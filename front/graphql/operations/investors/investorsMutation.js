import { gql, useMutation } from '@apollo/client';


export const UPDATE_INVESTOR_CONFIG = gql`
mutation UpsertCompConfig($input: UpsertCompConfigInput!) {
  upsertCompConfig(input: $input) {
    _id
  }
}
`


export const UPDATE_POLL_DETAILS = gql`
mutation UpsertPollDetails($input: UpsertPollDetailsInput!) {
  upsertPollDetails(input: $input) {
    _id
  }
}
`


