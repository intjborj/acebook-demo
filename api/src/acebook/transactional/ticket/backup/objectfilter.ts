// const objectFilters = (args: TicketPaginatorArg) => {
//     if (args._id) {
//       // SPECIFIC TICKET
//       return { _id: args._id }
  
//     } else if (args.userId && args.type == "FOR_APPROVAL") {
//       // === FOR APPROVAL ===
//       // SPECIFIC APPROVER AND FOR APPROVAL TICKETS (PENDING AND DISAPPROVED)
//       return {
  
//         $or: [
//           { approvers: { $elemMatch: { 'user': args.userId, 'status': 'pending' } } },
//           { approvers: { $elemMatch: { 'user': args.userId, 'status': 'disapproved' } } },
//         ]
  
//       }
  
//     } else if (args.userId && args.type == "APPROVED") {
//       // === APPROVED ===
//       // APPROVED BY SPECIFIC APPROVER
//       return { approvers: { $elemMatch: { 'user': args.userId, 'status': 'approved' } } }
  
//     } else if (args.userId && args.type == "ALL_APPR_ASSIG") {
//       // === ALL APPROVER'S ASSIGNATORY ===
//       // ALL TICKETS ASSIGNED TO APPROVER
//       return { approvers: { $elemMatch: { 'user': args.userId } } }
  
//     } else if (args.userId && args.type == "MY_REQUESTS") {
//       // === MY REQUESTS ===
//       // ALL REQUESTED TICKETS
//       return { requestedBy: args.userId }
  
//     } else if (args.departmentId && args.type == "DEPARTMENT_TICKETS") {
//       // === DEPARTMENT TICKETS ===
//       // ALL TICKETS OF DEPARTMENT
//       return { serviceDepartment: args.departmentId }
  
//     } else {
//       // DEFAULT (ALL)
//       return {}
//     }
// }  