import { TicketPaginatorArg, TicketSearchType } from "../../ticket/dto/ticket.args";

export const workObjectFilters = (args: TicketPaginatorArg) => {

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
    //  let payload = {
    //   $and: [
    //     switchResult,
    //     searchResult
    //   ]
    // }

    return payload
  } else {
    return switchType(args)
  }

}


const switchType = (args: TicketPaginatorArg) => {
  switch (args.type) {
    case "WORKS_RECEIVED":
      if (args.departmentId) {
        return {
          $or: [
            { submissionDepartment: { $elemMatch: { 'department': args.departmentId } } },
            { isArchived: {$ne: true}}
          ]
        }
      }
      break;
    case "WORKS_RECEIVED_TO_REC":
      if (args.departmentId) {
        return {
          $and: [
            { submissionDepartment: { $elemMatch: { 'department': args.departmentId, 'status': null } } },
            { isArchived: {$ne: true}}
            // { "ticket.subject": {$regex: nameRegex, $options: 'i'} } //for 
          ]
        }
      }
      break;
    case "WORKS_RECEIVED_MARKED":
      if (args.departmentId) {
        return {
          $and: [
            { submissionDepartment: { $elemMatch: { 'department': args.departmentId, 'status': 'received' } } },
            { isArchived: {$ne: true}}
          ]
        }
      }
      break;
    default:
      if (args._id) {
        return { _id: args._id }
      } else {
        return {}
      }
      break;
  }
}

const searchFilterType = (searchArg: TicketSearchType) => {
  var nameRegex = new RegExp(searchArg.description);
  return {
    $or: [
      { code: { $regex: nameRegex, $options: 'i' } },
      { "ticket.description": { $regex: nameRegex, $options: 'i' } },
      { "ticket.code": { $regex: nameRegex, $options: 'i' } },
      { "ticket.location": { $regex: nameRegex, $options: 'i' } },
      { "ticket.subject": { $regex: nameRegex, $options: 'i' } },
    ]
  }
}

const dateFilterType = (searchArg: TicketSearchType) => {

  var nameRegexStartDate = new RegExp(searchArg.startDate);
  var nameRegexEndDate = new RegExp(searchArg.endDate);
  let payload = {
    $or: [
      {
        "ticket.dateRequested": {
          $gte: searchArg.startDate,
          $lte: searchArg.endDate
        }
      },
      { "ticket.dateRequested": { $regex: nameRegexStartDate, $options: 'i' } },
      { "ticket.dateRequested": { $regex: nameRegexEndDate, $options: 'i' } }
    ]
  }
  return payload
}

const statusFilterType = (searchArg: TicketSearchType) => {
  let payload = {
    workStatus: searchArg.status
  }
  return payload
} 

const ticketTypeFilter = (searchArg: TicketSearchType) => {
  let payload = {
    "ticket.typeId.code": searchArg.ticketType
  }
  return payload
} 