import {gql, useQuery} from '@apollo/client';


export const GET_ALL_NOTIFS = gql`
query Data {
  notifications {
    data {
      created_at
      message
      viewDate
      path
    }
  }
}
`

// export const GET_NOTIFS_COUNT = gql`
// query Data($userId: String) {
//   notificationCount(userId: $userId) {
//     data {
//       notViewed
//     }
//   }
// }
// `
// export const GET_NOTIFS_SPEC = gql`
// query Data($userId: String) {
//   notifSpec(userId: $userId) {
//     data {
//       created_at
//       viewDate
//       message
//       _id
//       path
//     }
//   }
// }
// `

export const GET_NOTIFS_COUNT = gql`
query NotificationCount($departmentId: String, $userId: String) {
  notificationCount(departmentId: $departmentId, userId: $userId) {
    data {
      notViewed
    }
    user {
      configurations {
        notification {
          isEnabled
          ringtone
        }
      }
    }
  }
}
`
export const GET_NOTIFS_SPEC = gql`
query Data($userId: String, $departmentId: String) {
  notifSpec(userId: $userId, departmentId: $departmentId) {
    data {
      created_at
      views {
        user {
          _id
        }
        viewDate
      }
      message
      _id
      path
      tags {
        name
        code
      }
      ticketTypes {
        name
        code
      }
    }
  }
}
`