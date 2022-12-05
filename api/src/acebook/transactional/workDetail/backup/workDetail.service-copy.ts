import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
// import { WorkDetailEnt, WorkDetailEntInput } from './entities/workDetail.entity';
import moment from 'moment';
// import  WorkDetail  from './entities/workDetail.entity';
import WorkDetail from '@models/Transactionals/WorkDetails';
// import { WorkDetailId, UpsertWorkDetailInput } from './dto/workDetail.input';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
// import Ticket from '@models/Transactionals/Tickets';
// import { workCodeGen } from './services/workCodeGenerator';
// import { TicketStatus } from '../ticket/services/enums';
// import _ from 'lodash';
// import { TicketNotifService } from '../ticket/services/ticketNotification';
// import { workObjectFilters } from './services/workObjectFilter';
// import { TicketPaginatorArg } from '../ticket/dto/ticket.args';
const { MongooseFindByReference } = require('mongoose-find-by-reference');
var ObjectId = require('mongoose').Types.ObjectId;
// @Injectable()
// export class WorkDetailService {
//   constructor(
//     private readonly ticketNotifService: TicketNotifService
//   ) { }

//   async upsert(upsertInput: UpsertWorkDetailInput): Promise<WorkDetailEnt> {
//     let savedData;
//     if (upsertInput._id) {
//       let prevSubDep: WorkDetailEnt = await WorkDetail.findOne({ _id: upsertInput._id });


//       let payload: any = upsertObject(upsertInput)

//       savedData = await WorkDetail.findOneAndUpdate(
//         { _id: upsertInput._id },
//         { $set: payload },
//         { new: true },
//       );

//       this.notifyNewSubDept(savedData, prevSubDep)

//       // Please move this as one with the create
//       if (upsertInput.workStatus === "draft") {
//         let ticketDet = await Ticket.findOneAndUpdate(
//           { _id: upsertInput.ticketId },
//           {
//             $set: {
//               status: TicketStatus.WORKING
//             }
//           },
//           { new: true },
//         );
//       }
//     } else {

//       let payload: any = upsertObject(upsertInput)
//       let code = await workCodeGen(upsertInput.ticketId as string)
//       payload.code = code;

//       savedData = new WorkDetail(payload);
//       this.notifyNewSubDept(savedData, savedData, "new")
//       // Please move this
//       let ticketDet = await Ticket.findOneAndUpdate(
//         { _id: upsertInput.ticketId },
//         {
//           $push: {
//             works: savedData._id
//           },
//           $set: {
//             status: TicketStatus.WORKING
//           }
//         },
//         { new: true },
//       );

//       await savedData.save();
//     }

//     let newData = await WorkDetail.populate(savedData, { path: 'ticket', model: 'Ticket' })

//     return newData;
//   }

//   async delete(upsertInput: WorkDetailId): Promise<WorkDetailEnt> {
//     let removedData = await WorkDetail.findOneAndDelete({
//       _id: upsertInput._id,
//     });

//     return removedData;
//   }

//   async archive(upsertInput: UpsertWorkDetailInput): Promise<WorkDetailEnt> {
//     let workDetail = await WorkDetail.findOneAndUpdate(
//       { _id: upsertInput._id },
//       {
//         $set: {
//           isArchived: upsertInput.isArchived
//         }
//       },
//       { new: true },
//     );

//     return workDetail;
//   }

//   async upsertSubmissionDept(upsertInput: UpsertWorkDetailInput): Promise<WorkDetailEnt> {
//     let workDetail: WorkDetailEnt

//     if (upsertInput._id) {
//       let prevSubDep: WorkDetailEnt = await WorkDetail.findOne({ _id: upsertInput._id });
//       let idOnlyOldDepts = _.map(prevSubDep.submissionDepartment, "department")

//       workDetail = await WorkDetail.findOneAndUpdate(
//         { _id: upsertInput._id },
//         {
//           $set: {
//             submissionDepartment: upsertInput.submissionDepartment
//           }
//         },
//         { new: true },
//       );

//       let idOnlyNewDepts = _.map(workDetail.submissionDepartment, "department")
//       let newPer = idOnlyNewDepts.filter((item: any) => {
//         return !idOnlyOldDepts.includes(item)
//       })

//       let ticket = await Ticket.findOne({ _id: workDetail.ticket })


//       if (newPer.length > 0) {
//         this.ticketNotifService.ticketNotifWorkSubmissionDept(ticket, workDetail, newPer)
//       }

//     }


//     return workDetail;
//   }

//   async notifyNewSubDept(workDetail: any, prevSubDep: WorkDetailEnt, type?: string) {

//     let idOnlyOldDepts = _.map(prevSubDep.submissionDepartment, "department")

//     let idOnlyNewDepts = _.map(workDetail.submissionDepartment, "department")
//     let newPer = idOnlyNewDepts.filter((item: any) => {
//       return !idOnlyOldDepts.includes(item)
//     })

//     let ticket = await Ticket.findOne({ _id: workDetail.ticket })

//     if (type === "new") {
//       if (idOnlyOldDepts.length > 0) {
//         this.ticketNotifService.ticketNotifWorkSubmissionDept(ticket, workDetail, idOnlyOldDepts)
//       }
//     } else {
//       if (newPer.length > 0) {
//         this.ticketNotifService.ticketNotifWorkSubmissionDept(ticket, workDetail, newPer)
//       }
//     }






//   }

//   async findAll({ page, first }: PaginationArgs) {
//     const workDetail: WorkDetailEnt[] = await WorkDetail.find();
//     return {
//       data: workDetail,
//       paginatorInfo: paginate(
//         workDetail.length,
//         page,
//         first,
//         workDetail.length,
//       ),
//     };
//   }

//   async findOne({ id }: SpecObjectArgs) {
//     const workDetail: WorkDetailEnt = await WorkDetail.findOne({ _id: id })
//       .populate("ticket")
//       .populate({ path: "submissionDepartment.department", model: "Department" })
//       ;
//     return {
//       data: workDetail
//     };
//   }

//   async workReport({ departmentId, type, searchArg }: TicketPaginatorArg) {
//   // async workReport({ department, type }: SpecObjectArgs) {
//     let filtersWorks = workObjectFilters({ departmentId: departmentId, type: type , searchArg: searchArg});
//     let payload
//     console.log(filtersWorks)

//     payload = await WorkDetail.aggregate(
//       [
//         { $match: filtersWorks },
//         // ,{
//         //   $match: {
//         //     $or: [
//         //       { submissionDepartment: { $elemMatch: { 'department': department } } }
//         //     ]
//         //   }

//         // },
//         {
//           $project: {
//             code: 1,
//             created_at: 1,
//             ticket: 1,
//             workStatus: 1
//           }
//         }])
       

//    var nameRegex = new RegExp(searchArg.description);

//     payload = await WorkDetail.populate(payload, [{
//       path: 'ticket', model: 'Ticket',
//       // match:{ subject: {$regex: nameRegex, $options: 'i'} },
//       populate: [
//         { path: 'requestedBy', model: 'MUser' },
//         { path: 'serviceDepartment', model: 'Department' },
//         { path: 'requestingDepartment', model: 'Department' },
//       ],

//     }])




//     return {
//       data: payload
//     };
//   }


//   async getArchived({ id }: SpecObjectArgs) {
//     const workDetail: WorkDetailEnt[] = await WorkDetail.find({ ticket: new ObjectId(id), isArchived: true });
//     return {
//       data: workDetail
//     };
//   }



// }


// function upsertObject(upsertInput: UpsertWorkDetailInput) {

//   return {
//     dateTimeStarted: upsertInput.dateTimeStarted,
//     dateTimeFinished: upsertInput.dateTimeFinished,
//     workStatus: upsertInput.workStatus,
//     findings: upsertInput.findings,
//     ticket: upsertInput.ticketId,
//     descActualWorkDone: upsertInput.descActualWorkDone,
//     attachments: upsertInput.attachments,
//     submissionDepartment: upsertInput.submissionDepartment
//   }


// }