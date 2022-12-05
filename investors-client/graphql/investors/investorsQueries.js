import {gql, useQuery} from '@apollo/client';


export const GET_CURRENT_TERM = gql`
query PollCurrentTerm {
    pollCurrentTerm {
      data {
        _id
        period
        votingOpen
        candidates {
          user {
            _id
            firstName
            lastName
            middleName
            suffix
            nameExtension
          }
          thumbnail
          _id
        }
      }
    }
  }
`

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


export const GET_POLL_RESULTS = gql`
query Data($id: String) {
  voteResult(_id: $id) {
    data {
      _id
      user {
        _id
        firstName
        middleName
        lastName
        nameExtension
        suffix
      }
      totalVotes
      thumbnail
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
export const QUERY_GET_SPEC_INVESTOR = gql`
query SpecificInvestor($id: ID!) {
  specificInvestor(id: $id) {
    data {
      _id
      email
      firstName
      lastName
      middleName
      suffix
      username
    }
  }
}
`
export const POLL_REPORT = gql`
query Data($type: String, $id: String) {
  PollReport(type: $type, id: $id) {
    data {
      _id
      lastName
      firstName
      middleName
      shares
      votesAvailable
      investorDetails {
        investorId
        blocks
      }
      candidates {
        user {
          firstName
          middleName
          lastName
        }
        votes {
          user
          count
        }
      }
    }
  }
}
`
