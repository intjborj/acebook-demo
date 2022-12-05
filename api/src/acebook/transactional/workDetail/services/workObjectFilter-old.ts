import { TicketPaginatorArg } from "../../ticket/dto/ticket.args";

export const workObjectFilters = (args: TicketPaginatorArg) => {
  var nameRegex = new RegExp(args.searchArg.description);
    switch (args.type) {
      case "WORKS_RECEIVED":
        if (args.departmentId) {
          return {
            $or: [
              { submissionDepartment: { $elemMatch: { 'department': args.departmentId } } }
            ]
          }
        } 
        break;
     case "WORKS_RECEIVED_TO_REC":
        if (args.departmentId) {
          return {
            $and: [
              { submissionDepartment: { $elemMatch: { 'department': args.departmentId, 'status': null } } },
           
              // { "ticket.subject": {$regex: nameRegex, $options: 'i'} } //for 
            ]
          }
        } 
        break;
      case "WORKS_RECEIVED_MARKED":
        if (args.departmentId) {
          return {
            $and: [
              { submissionDepartment: { $elemMatch: { 'department': args.departmentId, 'status': 'received' } } }
            ]
          }
        } 
        break;
      default:
        if (args._id) {
          return { _id: args._id }
        }else{
          return {}
        }
        break;
    }
  
  }
  