import {gql, useMutation} from '@apollo/client';


export const UPSERT_TICKET = gql`
mutation UpsertTicket($input: UpsertTicketInput!) {
  upsertTicket(input: $input) {
    _id
    subject
    description
  }
}
`

export const UPSERT_TICKET_TYPE = gql`
mutation UpsertTicketType($input: UpsertTicketTypeInput!) {
  upsertTicketType(input: $input) {
    _id
  }
}
`


