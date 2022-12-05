import {gql, useQuery} from '@apollo/client';


export const GET_POSTS = gql`
query Data($first: Int, $page: Int, $departmentId: String, $type: String, $skip: Int, $privacy: Boolean, $user: String, $_id: String, $searchArg: TicketSearchType, $perPage: Int) {
  posts(first: $first, page: $page, departmentId: $departmentId, type: $type, skip: $skip, privacy: $privacy, user: $user, _id: $_id, searchArg: $searchArg, perPage: $perPage) {
    data {
      _id
      created_at
      updated_at
      content
      privacy
      isArchived
      attachments {
        _id
        path
        type
      }
      createdBy {
        _id
        firstName
        lastName
        profilePicture
        departmentOnDuty {
          _id
          name
        }
      }
      createdByDepartment{
        _id
        name
      }
      taggedDepartments {
        _id
        name
      }
      ticket {
        _id
        status
      }
      comments {
        _id
        user {
          _id
          firstName
          lastName
          profilePicture
        }
        created_at
        message
      }
      reactionCount
      userReacted {
        user {
          _id
        }
      }
    }
    paginatorInfo {
      total
      perPage
      lastItem
      firstItem
      count
      currentPage
    }
  }
}
`
// paginatorInfo {
//   currentPage
//   count
//   perPage
// }


export const GET_POST = gql`
query Post($id: String ,$type: String, $user: String) {
  post(_id: $id, type: $type, user: $user) {
    data {
      _id
      created_at
      updated_at
      content
      privacy
      isArchived
      attachments {
        _id
        path
        type
      }
      createdBy {
        _id
        firstName
        lastName
        profilePicture
        departmentOnDuty {
          _id
          name
        }
      }
      createdByDepartment{
        _id
        name
      }
      taggedDepartments {
        _id
        name
      }
      ticket {
        _id
        status
      }
      reactionCount
      userReacted {
        user {
          _id
        }
      }
    }
  }
}
`
export const GET_POST_REACTION = gql`
query Post($id: String ,$type: String, $user: String) {
  post(_id: $id, type: $type, user: $user) {
    data {
      reactions {
        user {
          _id
          firstName
          lastName
        }
        reactionIcon {
          name
        }
      }
    }
  }
}
`