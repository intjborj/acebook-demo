import {gql, useMutation} from '@apollo/client';


export const GET_REALTIME_RESULTS = gql`
subscription SubscBodPollResult($id: String) {
  subscBodPollResult(_id: $id) {
    data {
      _id
      thumbnail
      totalVotes
      user {
        _id
      }
    }
  }
}
`

export const GET_REALTIME_POLL_DETS = gql`
subscription Data {
  subscPollDetails {
    data {
      isCurrentTerm
      votingOpen
    }
  }
}
`
