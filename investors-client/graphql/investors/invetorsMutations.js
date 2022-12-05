import {gql, useMutation} from '@apollo/client';


export const PROCESS_VOTE = gql`
mutation Voting($input: UpsertPollDetailsInput!) {
  voting(input: $input) {
    _id
  }
}
`
export const CHECK_ID_NUMBER = gql`
mutation CheckSpecInvestor($id: ID!) {
  checkSpecInvestor(id: $id) {
    data {
      _id
      email
    }
  }
}
`
export const SEND_VERIFICATION = gql`
mutation VerifyInvEmail($email: String!, $investorId: String, $id: String) {
  verifyInvEmail(email: $email, investorId: $investorId, id: $id) {
    data {
      response
      accepted
      _id
    }
  }
}
`
export const VERIFY_EMAIL_CODE = gql`
mutation VerifyInvEmailCode($emailCode: String, $id: String, $investorId: String) {
  verifyInvEmailCode(emailCode: $emailCode, id: $id, investorId: $investorId) {
    data {
      response
    }
  }
}
`
export const CLIENT_UPDATE_INVESTOR = gql`
mutation InvestorRegistration($input: RegisterInputMU!) {
  investorRegistration(input: $input) {
    _id
  }
}
`
