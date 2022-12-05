import {gql, useQuery} from '@apollo/client';


export const GET_INVESTOR_CONFIG = gql`
query Data {
  compConfigs {
    data {
      investor {
        sharesPerBlock
        votesPerShare
      }
    }
  }
}
`

export const GET_POLL_DETAILS_LIST = gql`
query PollDetails {
  pollDetails {
    data {
      _id
      period
      isCurrentTerm
    }
  }
}
`

export const GET_SPEC_POLL_DETAILS = gql`
query PollDetails($id: String) {
  pollDetails(_id: $id) {
    data {
      _id
      period
      candidates {
        thumbnail
        customVoteCount
        user {
          _id
          firstName
          lastName
          middleName
        }
        _id
      }
      isCurrentTerm
      votingOpen
    }
  }
}
`

export const GET_EST_VOTES = gql`
query GetTotalVotes {
  getTotalVotes {
    totalVotes
  }
}
`