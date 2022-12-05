import {gql} from '@apollo/client';


export const SUBS_NOTIFICATION_COUNT = gql`
subscription Data($userId: String, $departmentId: String) {
    subscNotifCount(userId: $userId, departmentId: $departmentId) {
        notViewed
    }
  }
`
