import {gql, useQuery} from '@apollo/client';

export const GET_ALL_TICKETS = gql`
query Data($type: String, $userId: String, $departmentId: String, $searchArg: TicketSearchType, $perPage: Int, $page: Int) {
  tickets(type: $type,userId: $userId,departmentId: $departmentId,searchArg: $searchArg,perPage: $perPage,page: $page) {
      data {
      _id
      created_at
      type
      description
      subject
      status
      code
      dateRequested
      dateNeeded
      requestingDepartment {
        name
        _id
      }
      serviceDepartment {
        _id
        name
      }
      requestedBy {
        _id
        firstName
        lastName
      }
      typeId {
        _id
        code
        name
      }
    }
    paginatorInfo {
      total
      perPage
      lastItem
      firstItem
      count
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
      assignedPersonnel {
        receivedAt
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
      works {
        _id
        dateTimeStarted
        dateTimeFinished
        findings
        code
        workStatus
        isArchived
      }
      attachments {
        type
        path
      }
      typeId {
        _id
        code
        name
      }
      asset {
        _id
        name
        model
        description
      }
    }
  }
}
`

export const GET_ASSET_VARIATION_FR_TICKT = gql`
query Data($id: String) {
  tickets(_id: $id) {
    data {
      _id
      asset {
        _id
        name
        model
        description
        assetVariation {
          _id
          propertyCode
          model
        }
      }
    }
  }
}
`
export const GET_SPEC_TICKET_AGG = gql`
query Ticket($id: String) {
  ticket(_id: $id) {
   data {
      _id
      type
      description
      subject
      status
      code
      location
      remarks
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
      assignedPersonnel {
        receivedAt
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
      toDo {
        description
        updatedAt
      }
      works {
        _id
        dateTimeStarted
        dateTimeFinished
        findings
        code
        workStatus
        isArchived
      }
      attachments {
        type
        path
      }
      typeId {
        _id
        code
        name
      }
      asset {
        _id
        name
        description
      }
      clientFeedback {
        message
        reactionIcon {
          name
        }
      }
    }
    ticketTypeData {
      code
      addWorkWOAssignedP
      addWorkWOApprovers
      _id
    }
  }
}
`



export const GET_TICKET_TYPE = gql`
query Data($type: String) {
  ticketTypes(type: $type) {
    data {
      _id
      name
      code
    }
  }
}
`

export const GET_TICKET_TYPE_SPEC = gql`
query Data($code: String, $type: String) {
  ticketTypes(code: $code, type: $type) {
    data {
      name
      code
      addWorkWOApprovers
      addWorkWOAssignedP
      isDisabled
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
      assignments {
        firstName
        middleName
        lastName
        _id
        departmentOnDuty {
          name
          _id
        }
      }
      submissionDepartment{
        name
        _id
      }
      serviceDepartment{
        name
        _id
      }
    }
  }
}
`

export const GET_TICKET_COUNTS = gql`
query Data($departmentId: String, $userId: String) {
  ticketCounts(departmentId: $departmentId, userId: $userId) {
    data {
      myApproved {
        new
        all
      }
      myAssigned {
        new
        all
      }
      myCreatedTickets {
        all
        new
      }
      deptServTickets {
        new
        all
      }
      deptTicketRequest {
        new
        all
      }
      markedReceivedWorks {
        new
        all
      }
      allTickets {
        new
        all
      }
      forApproval
      worksReceived
      moreCount
    }
  }
}
`

export const SEARCH_INVESTORS = gql`
query SpecificInvestor($name: String) {
  search_investors(name: $name) {
    data {
      _id
      created_at
      updated_at
      suffix
      username
      firstName
      middleName
      lastName
      position
      isActive
      isApprover
      contact
      email
      token
      restrictionCode
      investorDetails{
        isEmployee
        blocks
        investorId
      }
      nameExtension
    }
  }
}
`

export const GET_WORKDETAIL = gql`
query WorkDetail($id: String) {
  workDetail(id: $id) {
    data {
      findings
      dateTimeStarted
      dateTimeFinished
      descActualWorkDone
      workStatus
      code
      workCategory
      ticket {
        _id
        type
        status
        code
      }
      attachments {
        type
        path
      }
      _id
      workStatus
      submissionDepartment {
        department {
          _id
          name
        }
        updatedAt
        status
      }
      performedBy {
        _id
        firstName
        middleName
        lastName
      }
      assetVariation {
        _id
        serialNo
        propertyCode
        model
      }
    }
  }
}
`

export const GET_SPECTICKET_SPECWORK = gql`
query TicketWork($id: String, $workId: String) {
  ticketWork(_id: $id, workId: $workId) {
    data {
      code
      description
      type
      dateNeeded
      dateRequested
      subject
      
      works {
        _id
        workStatus
        findings
        descActualWorkDone
        code
        created_at
        updated_at
        dateTimeStarted
        dateTimeFinished
        isArchived
        archiveRemarks
        workCategory
        attachments {
          type
          path
        }
        submissionDepartment {
          department {
            _id
            name
          }
          updatedAt
          status
        }
        performedBy {
          _id
          firstName
          middleName
          lastName
        }
        assetVariation {
          _id
          model
          propertyCode
          serialNo
        }
      }
      requestedBy {
        firstName
        middleName
        lastName
      }
      serviceDepartment {
        name
        _id
      }
      requestingDepartment {
        name
        _id
      }
      asset {
        _id
        name
        description
      }
    }
  }
}
`

export const GET_WORKREPORT = gql`
query Data($type: String, $department: String, $searchArg: TicketSearchType, $page: Int, $perPage: Int) {
  workDetailReports(type: $type, departmentId: $department, searchArg: $searchArg, page: $page, perPage: $perPage) {
    data {
      _id
      code
      created_at
      ticket {
        _id
        subject
        dateRequested
        requestedBy {
          firstName
          lastName
        }
        serviceDepartment {
          name
          _id
        }
        requestingDepartment {
          _id
          name
        }
        type
        typeId {
          _id
          code
          name
        }
      }
      workStatus
    }
    paginatorInfo {
      total
      perPage
      lastItem
      firstItem
      count
    }
  }
}
`

