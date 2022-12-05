import {gql, useQuery} from '@apollo/client';


export const GET_POST_COMMENTS = gql`
query Comments($first: Int, $page: Int, $postId: String) {
  comments(first: $first, page: $page, postId: $postId) {
    data {
      _id
      message
       created_at
      user {
        _id
        firstName
        lastName
        profilePicture
      }
      post {
        _id
      }
     
    }
  }
}
`