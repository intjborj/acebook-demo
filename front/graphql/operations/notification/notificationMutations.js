import {gql} from '@apollo/client';


export const UPSERT_NOTIFICATION = gql`
mutation UpsertNotification($input: UpsertNotificationInput!) {
  upsertNotification(input: $input) {
    _id
  }
}
`
