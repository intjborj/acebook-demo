import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { WorkDetailEnt, WorkDetailEntInput } from './entities/workDetail.entity';
import moment from 'moment';
// import  WorkDetail  from './entities/workDetail.entity';
import WorkDetail from '@models/Transactionals/WorkDetails';
import { WorkDetailId, UpsertWorkDetailInput } from './dto/workDetail.input';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import Ticket from '@models/Transactionals/Tickets';
import { workCodeGen } from './services/workCodeGenerator';
import { TicketStatus } from '../ticket/services/enums';
import _ from 'lodash';
import { TicketNotifService } from '../ticket/services/ticketNotification';
import { workObjectFilters } from './services/workObjectFilter';
import { TicketPaginatorArg } from '../ticket/dto/ticket.args';
import { calculateSkip } from '@/services/pagination.service';
const { MongooseFindByReference } = require('mongoose-find-by-reference');
var ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class WorkDetailService {
  constructor(
    private readonly ticketNotifService: TicketNotifService
  ) { }

  async upsert(upsertInput: UpsertWorkDetailInput): Promise<WorkDetailEnt> {
    let savedData;
    if (upsertInput._id) {
      let prevSubDep: WorkDetailEnt = await WorkDetail.findOne({ _id: upsertInput._id });


      let payload: any = upsertObject(upsertInput)

      savedData = await WorkDetail.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: payload },
        { new: true },
      );

      this.notifyNewSubDept(savedData, prevSubDep)

      // Please move this as one with the create
      if (upsertInput.workStatus === "draft") {
        let ticketDet = await Ticket.findOneAndUpdate(
          { _id: upsertInput.ticketId },
          {
            $set: {
              status: TicketStatus.WORKING
            }
          },
          { new: true },
        );
      }
    } else {

      let payload: any = upsertObject(upsertInput)
      let code = await workCodeGen(upsertInput.ticketId as string)
      payload.code = code;

      savedData = new WorkDetail(payload);
      this.notifyNewSubDept(savedData, savedData, "new")
      // Please move this
      let ticketDet = await Ticket.findOneAndUpdate(
        { _id: upsertInput.ticketId },
        {
          $push: {
            works: savedData._id
          },
          $set: {
            status: TicketStatus.WORKING
          }
        },
        { new: true },
      );

      await savedData.save();
    }

    let newData = await WorkDetail.populate(savedData, { path: 'ticket', model: 'Ticket' })

    return newData;
  }

  async delete(upsertInput: WorkDetailId): Promise<WorkDetailEnt> {
    let removedData = await WorkDetail.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async archive(upsertInput: UpsertWorkDetailInput): Promise<WorkDetailEnt> {
    let workDetail = await WorkDetail.findOneAndUpdate(
      { _id: upsertInput._id },
      {
        $set: {
          isArchived: upsertInput.isArchived,
          archiveRemarks: upsertInput.archiveRemarks
        }
      },
      { new: true },
    );

    return workDetail;
  }

  async upsertSubmissionDept(upsertInput: UpsertWorkDetailInput): Promise<WorkDetailEnt> {
    let workDetail: WorkDetailEnt

    if (upsertInput._id) {
      let prevSubDep: WorkDetailEnt = await WorkDetail.findOne({ _id: upsertInput._id });
      let idOnlyOldDepts = _.map(prevSubDep.submissionDepartment, "department")

      workDetail = await WorkDetail.findOneAndUpdate(
        { _id: upsertInput._id },
        {
          $set: {
            submissionDepartment: upsertInput.submissionDepartment
          }
        },
        { new: true },
      );

      let idOnlyNewDepts = _.map(workDetail.submissionDepartment, "department")
      let newPer = idOnlyNewDepts.filter((item: any) => {
        return !idOnlyOldDepts.includes(item)
      })

      let ticket = await Ticket.findOne({ _id: workDetail.ticket })


      if (newPer.length > 0) {
        this.ticketNotifService.ticketNotifWorkSubmissionDept(ticket, workDetail, newPer)
      }

    }


    return workDetail;
  }

  async notifyNewSubDept(workDetail: any, prevSubDep: WorkDetailEnt, type?: string) {

    let idOnlyOldDepts = _.map(prevSubDep.submissionDepartment, "department")

    let idOnlyNewDepts = _.map(workDetail.submissionDepartment, "department")
    let newPer = idOnlyNewDepts.filter((item: any) => {
      return !idOnlyOldDepts.includes(item)
    })

    let ticket = await Ticket.findOne({ _id: workDetail.ticket })

    if (type === "new") {
      if (idOnlyOldDepts.length > 0) {
        this.ticketNotifService.ticketNotifWorkSubmissionDept(ticket, workDetail, idOnlyOldDepts)
      }
    } else {
      if (newPer.length > 0) {
        this.ticketNotifService.ticketNotifWorkSubmissionDept(ticket, workDetail, newPer)
      }
    }






  }

  async findAll({ page, first }: PaginationArgs) {
    const workDetail: WorkDetailEnt[] = await WorkDetail.find();
    return {
      data: workDetail,
      paginatorInfo: paginate(
        workDetail.length,
        page,
        first,
        workDetail.length,
      ),
    };
  }

  async findOne({ id }: SpecObjectArgs) {
    const workDetail: WorkDetailEnt = await WorkDetail.findOne({ _id: id })
      .populate("ticket")
      .populate("performedBy")
      .populate("assetVariation")
      .populate({ path: "submissionDepartment.department", model: "Department" })
      ;
    return {
      data: workDetail
    };
  }

  async workReport(args: TicketPaginatorArg) {
   
    let filtersWorks = workObjectFilters({ departmentId: args.departmentId, type: args.type, searchArg: args.searchArg });
    let payload
    let workCount

    if (filtersWorks) {
      workCount = await WorkDetail.find(filtersWorks) //count() wont work if nested
      payload = await WorkDetail.find(filtersWorks, {}, { skip: calculateSkip(args.page, args.perPage), limit: args.perPage })
        .populate({
          path: "ticket", populate: [
            { path: 'typeId', model: 'TicketType' },
            { path: 'requestedBy', model: 'MUser' },
            { path: 'serviceDepartment', model: 'Department' },
            { path: 'requestingDepartment', model: 'Department' },
          ]
        })
        .sort({ created_at: -1, });
    }
  

    return {
      data: payload,
      paginatorInfo: paginate(
        workCount.length,
        args.page,
        args.perPage,
        workCount.length,
      ),
    };
  }


  async getArchived({ id }: SpecObjectArgs) {
    const workDetail: WorkDetailEnt[] = await WorkDetail.find({ ticket: new ObjectId(id), isArchived: true });
    return {
      data: workDetail
    };
  }



}


function upsertObject(upsertInput: UpsertWorkDetailInput) {

  return {
    dateTimeStarted: upsertInput.dateTimeStarted,
    dateTimeFinished: upsertInput.dateTimeFinished,
    workStatus: upsertInput.workStatus,
    findings: upsertInput.findings,
    ticket: upsertInput.ticketId,
    descActualWorkDone: upsertInput.descActualWorkDone,
    attachments: upsertInput.attachments,
    submissionDepartment: upsertInput.submissionDepartment,
    performedBy: upsertInput.performedBy,
    assetVariation: upsertInput.assetVariation,
    workCategory: upsertInput.workCategory,
  }


}