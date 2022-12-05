import {gql, useMutation} from '@apollo/client';


export const UPSERT_TICKET = gql`
mutation UpsertTicket($input: UpsertTicketInput!) {
  upsertTicket(input: $input) {
    _id
    code
    subject
    description
  }
}
`
export const APPROVE_TICKET = gql`
mutation ApproverTicket($input: UpsertTicketInput!) {
  approverTicket(input: $input) {
    _id
  }
}
`

export const UPSERT_TICKET_TYPE = gql`
mutation UpsertTicketType($input: UpsertTicketTypeInput!) {
  upsertTicketType(input: $input) {
    _id
  }
}
`

export const RECEIVE_TASK = gql`
mutation ReceiveTask($id: String, $userId: String) {
  receiveTask(_id: $id, userId: $userId) {
    _id
  }
}
`


export const UPSERT_WORKDETAIL = gql`
mutation UpsertWorkDetail($input: UpsertWorkDetailInput!) {
  upsertWorkDetail(input: $input) {
    dateTimeFinished
    dateTimeStarted
    updated_at
    _id
    created_at
    workStatus
    findings
    code
    ticket{
      code
    }
  }
}
`


export const ARCHIVE_WORK = gql`
mutation ArchiveWorkDetail($input: UpsertWorkDetailInput!) {
  archiveWorkDetail(input: $input) {
    _id
    isArchived
  }
}
`


export const GET_ARCHIVED = gql`
mutation WorkDetailArchived($id: String) {
  workDetailArchived(id: $id) {
    data {
      _id
      descActualWorkDone
      code
      isArchived
      findings
      workStatus
      dateTimeFinished
      dateTimeStarted
    }
  }
}
`


export const CHANGE_TICKET_STATUS = gql`
mutation StatusModifier($input: UpsertTicketInput!) {
  statusModifier(input: $input) {
    _id
  }
}
`


export const UPSERT_SUBMISSIONDEPT = gql`
mutation UpsertSubmissionDept($input: UpsertWorkDetailInput!) {
  upsertSubmissionDept(input: $input) {
    _id
  }
}
`


export const UPSERT_ASSIGNATORIES = gql`
mutation UpsertTicketAssigs($input: UpsertTicketInput!) {
  upsertTicketAssigs(input: $input) {
    _id
  }
}
`


export const UPSERT_TODO = gql`
mutation UpsertTicketTodo($input: UpsertTicketInput!) {
  upsertTicketTodo(input: $input) {
    _id
  }
}
`



export const UPSERT_TICKET_FEEDBACK = gql`
mutation UpsertTicketFeedback($input: UpsertTicketInput!) {
  upsertTicketFeedback(input: $input) {
    _id
  }
}
`


