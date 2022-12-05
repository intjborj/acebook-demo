import {gql, useQuery} from '@apollo/client';

export const GET_ALL_TICKETS = gql`
query Data($id: String, $type: String, $userId: String, $departmentId: String) {
  tickets(_id: $id,type: $type,userId: $userId,departmentId: $departmentId) {
    data {
      _id
      created_at
      type
      description
      subject
      status
      code
      requestingDepartment {
        name
        _id
      }
    }
  }
}
`

export const GET_SPEC_TICKET = gql`
query Data($id: String) {
  tickets(_id: $id) {
    data {
      _id
      type
      description
      subject
      status
      code
      location
      postOrigin{
        _id
      }
      requestingDepartment {
        name
        _id
      }
      createdBy {
        _id
        firstName
        middleName
        lastName
      }
      requestedBy {
        _id
        firstName
        middleName
        lastName
        profilePicture
      }
      dateRequested
      dateNeeded
      serviceDepartment {
        _id
        name
      }
      approvers {
        status
        updatedAt
        user {
          _id
          firstName
          middleName
          lastName
          departmentOnDuty {
            name
            _id
          }
        }
      }
    }
  }
}
`



export const GET_TICKET_TYPE = gql`
query Data {
  ticketTypes {
    data {
      _id
      name
      code
    }
  }
}
`

export const GET_TICKET_TYPE_SPEC = gql`
query Data($code: String) {
  ticketTypes(code: $code) {
    data {
      name
      code
      approvers {
        firstName
        middleName
        lastName
        _id
        departmentOnDuty {
          name
          _id
        }
      }
    }
  }
}
`

export const GET_TICKET_COUNTS = gql`
query TicketCounts($userId: String, $type: String) {
  ticketCounts(userId: $userId, type: $type) {
    data {
      forApproval
    }
  }
}
`

