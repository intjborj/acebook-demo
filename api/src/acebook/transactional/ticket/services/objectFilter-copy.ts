import { TicketPaginatorArg } from "../dto/ticket.args";
var ObjectId = require('mongoose').Types.ObjectId;

type SearchType ={
  isSearch?: boolean;
}

export const objectFilters = (args: TicketPaginatorArg, search?: SearchType ) => {

  switch (args.type) {
    case "FOR_APPROVAL":
      if (args.userId) {
        return {

          $or: [
            { approvers: { $elemMatch: { 'user': args.userId, 'status': 'pending' } } },
            { approvers: { $elemMatch: { 'user': args.userId, 'status': 'disapproved' } } },
          ]

        }
      }
      break;

    case "APPROVED":
      if (args.userId) {
        return { approvers: { $elemMatch: { 'user': args.userId, 'status': 'approved' } } }
      }
      break;

    case "ALL_APPR_ASSIG":
      if (args.userId) {
        return { approvers: { $elemMatch: { 'user': args.userId } } }
      }
      break;

    case "MY_REQUESTS":
      if (args.userId) {
        return { requestedBy: args.userId }
      }
      break;

    case "DEPARTMENT_TICKETS":
      if (args.departmentId) {
        return { serviceDepartment: args.departmentId }
      }
      break;

    case "MY_ASSIGNED_TICKETS":
      if (args.userId) {
        return {
          $or: [
            { assignedPersonnel: { $elemMatch: { 'user': args.userId } } },
            { assignedPersonnel: { $elemMatch: { 'user': new ObjectId(args.userId) } } }
          ]
        }

      }
      break;

    case "MY_ASSIGNED_TICKETS_NOT_RECEIVED":
      if (args.userId) {
        return {
          $or: [
            // { "assignedPersonnel.receivedAt": { $exists:false } },
            { assignedPersonnel: { $elemMatch: { 'user': args.userId, receivedAt: { $exists:false } } } },
            { assignedPersonnel: { $elemMatch: { 'user': new ObjectId(args.userId) , receivedAt: { $exists:false } } } },
            // { assignedPersonnel: { $elemMatch: { 'user': new ObjectId(args.userId), 'receivedAt': null } } },
          ]
        }

      }
      break;

    case "MY_CREATED_TICKETS":
      if (args.userId) {
        return {
          $or: [
            { createdBy: args.userId },
            { createdBy: new ObjectId(args.userId) }
          ]
        }

      }
      break;

    case "MY_DEPARTMENT_SERVICE_TICKETS":
      if (args.departmentId) {
        return {
          $or: [
            { serviceDepartment: args.departmentId },
            { serviceDepartment: new ObjectId(args.departmentId) }
          ]
        }

      }
      break;

    case "MY_DEPARTMENT_TICKET_REQUEST":
      if (args.departmentId) {
        return {
          $or: [
            { requestingDepartment: args.departmentId },
            { requestingDepartment: new ObjectId(args.departmentId) }
          ]
        }

      }
      break;

    default:
      if (args._id) {
        return { _id: args._id }
      } else {
        return null
        // return {}
      }
      break;


  }

}
