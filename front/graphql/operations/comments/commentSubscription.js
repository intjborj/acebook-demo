import {gql} from '@apollo/client';


export const SUBS_COMMENT = gql`
subscription SubscComment($userId: String, $postId: String) {
  subscComment(userId: $userId, postId: $postId) {
    _id
    message
    user {
      _id
      username
      firstName
      middleName
      lastName
      profilePicture
    }
    post{
      _id
    }
    created_at
   
  }
}
`
