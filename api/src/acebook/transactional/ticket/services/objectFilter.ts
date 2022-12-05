import { TicketPaginatorArg, TicketSearchType } from "../dto/ticket.args";
var ObjectId = require('mongoose').Types.ObjectId;

type SearchType = {
  isSearch?: boolean;
  description?: string;
}

export const objectFilters = (args: TicketPaginatorArg) => {

  if (args.searchArg) {
    let filterArr = []


    if (switchType(args)) {
      let switchResult = switchType(args)
      filterArr.push(switchResult)
    }

    if (searchFilterType(args.searchArg)) {
      let searchResult = searchFilterType(args.searchArg)
      filterArr.push(searchResult)
    }

    if (args.searchArg.startDate && args.searchArg.endDate) {
      let dateResult = dateFilterType(args.searchArg)
      filterArr.push(dateResult)
    }

    if (args.searchArg.status) {
      let statusResult = statusFilterType(args.searchArg)
      filterArr.push(statusResult)
    }

    if (args.searchArg.ticketType) {
      let ticketTypeResult = ticketTypeFilter(args.searchArg)
      filterArr.push(ticketTypeResult)
    }

    let payload = {
      $and: filterArr
    }

    // $and: [
    //   switchResult,
    //   searchResult
    // ]

    return payload
  } else {
    return switchType(args)
  }

}





const switchType = (args: TicketPaginatorArg) => {
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
            { assignedPersonnel: { $elemMatch: { 'user': args.userId, receivedAt: { $exists: false } } } },
            { assignedPersonnel: { $elemMatch: { 'user': new ObjectId(args.userId), receivedAt: { $exists: false } } } },
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

    case "MY_DEPARTMENT_SERVICE_TICKETS_PENDING":
      if (args.departmentId) {
        return {
          $and: [
            {
              $or: [
                { serviceDepartment: args.departmentId },
                { serviceDepartment: new ObjectId(args.departmentId) }
              ]
            },
            {status: "pending"}
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

    case "ALL_TICKETS":
      return {}
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

const searchFilterType = (searchArg: TicketSearchType) => {
  var nameRegex = new RegExp(searchArg.description);
  return {
    $or: [
      { description: { $regex: nameRegex, $options: 'i' } },
      { code: { $regex: nameRegex, $options: 'i' } },
      { location: { $regex: nameRegex, $options: 'i' } },
      { subject: { $regex: nameRegex, $options: 'i' } },
    ]
  }
}

const dateFilterType = (searchArg: TicketSearchType) => {
  var nameRegexStartDate = new RegExp(searchArg.startDate);
  var nameRegexEndDate = new RegExp(searchArg.endDate);

  let payload = {
    $or: [
      {
        dateRequested: {
          $gte: searchArg.startDate,
          $lte: searchArg.endDate
        }
      },
      { dateRequested: { $regex: nameRegexStartDate, $options: 'i' } },
      { dateRequested: { $regex: nameRegexEndDate, $options: 'i' } }
    ]
  }

  return payload
}

const statusFilterType = (searchArg: TicketSearchType) => {
  let payload = {
    status: searchArg.status
  }
  return payload
}

const ticketTypeFilter = (searchArg: TicketSearchType) => {
  let payload = {
    "typeId.code": searchArg.ticketType
  }
  return payload
} 