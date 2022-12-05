import {gql, useQuery} from '@apollo/client';


export const GET_POSTS = gql`
query Data($first: Int, $page: Int, $departmentId: String, $type: String, $skip: Int, $privacy: Boolean, $user: String, $_id: String) {
  posts(first: $first, page: $page, departmentId: $departmentId, type: $type, skip: $skip, privacy: $privacy, user: $user, _id: $_id) {
    data {
      _id
      created_at
      updated_at
      content
      privacy
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
    }
    paginatorInfo {
      currentPage
      count
      perPage
    }
  }
}
`
