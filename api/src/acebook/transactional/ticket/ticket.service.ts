import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { TicketEnt, TicketStatusType } from './entities/ticket.entity';
import moment from 'moment';
// import  Ticket  from './entities/ticket.entity';
import Ticket from '@models/Transactionals/Tickets';
import TicketType from '@models/Masterdata/TicketType';
import { TicketId, UpsertTicketInput } from './dto/ticket.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import Post from '@models/Transactionals/Posts';
import { ReceivingArg, TicketPaginatorArg } from './dto/ticket.args';
import { objectFilters } from './services/objectFilter';
import { NotificationService } from '../notification/notification.service';
import { PostEnt, PostInput } from '../post/entities/post.entity';
import { NotifMessageType } from '@/constants/notifications';
import { TicketTypeEnt } from '../ticketType/entities/ticketType.entity';
import { TicketNotifService } from './services/ticketNotification';
import _ from 'lodash'
import { ticketCodeGen } from './services/ticketCodeGenerator';
import { AssignedPersonnelEnt, AssignedPersonnelEntInput } from '@/acebook/referenceType/assignedPersonnel.entity';
import { TicketStatus } from './services/enums';
import { workCodeGen } from '../workDetail/services/workCodeGenerator';
import { workObjectFilters } from '../workDetail/services/workObjectFilter';
import WorkDetail from '@models/Transactionals/WorkDetails';
import { calculateSkip } from '@/services/pagination.service';
import { isEmpty } from 'class-validator';
// import { ticketNotification } from './services/ticketNotification';

var ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class TicketService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly ticketNotifService: TicketNotifService
  ) { }


  async upsert(upsertInput: UpsertTicketInput): Promise<TicketEnt> {
    let savedData;

    if (upsertInput._id) {

      savedData = this.updateTicket(upsertInput)

    } else {

      savedData = this.createTicket(upsertInput)

    }

    return savedData;
  }

  async upsertTicketTodo(upsertInput: UpsertTicketInput): Promise<TicketEnt> {
    let savedData;

    savedData = await Ticket.findOneAndUpdate(
      { _id: upsertInput._id },
      {
        $set: {
          toDo: upsertInput.toDo
        }
      },
      { new: true },
    );


    return savedData
  }


  async upsertTicketFeedback(upsertInput: UpsertTicketInput): Promise<TicketEnt> {
    let savedData;

    savedData = await Ticket.findOneAndUpdate(
      { _id: upsertInput._id },
      {
        $set: {
          clientFeedback: upsertInput.clientFeedback
        }
      },
      { new: true },
    );


    return savedData
  }

  async upsertTicketAssigs(upsertInput: UpsertTicketInput): Promise<TicketEnt> {
    let savedData;


    if (upsertInput._id) {
      let prevAssigneds = await Ticket.findOne({ _id: upsertInput._id });

      let idOnlyOld = _.map(prevAssigneds.assignedPersonnel, "user")

      let newPer = upsertInput.assignedPersonnel.filter((item: any) => {
        return !idOnlyOld.includes(item.user)
      })

      savedData = await Ticket.findOneAndUpdate(
        { _id: upsertInput._id },
        {
          $set: {
            assignedPersonnel: upsertInput.assignedPersonnel
          }
        },
        { new: true },
      );


      let toNotify = []
      if (newPer.length > 0) {
        toNotify = _.map(newPer, "user")
        this.ticketNotifService.ticketNotifAssignedPersonnel(savedData, toNotify)
      }


    }
    return savedData
  }

  async approverTicket(upsertInput: UpsertTicketInput): Promise<TicketEnt> {
    let savedData;
    if (upsertInput._id) {
      let prevData = await Ticket.findOne({ _id: upsertInput._id })

      savedData = await Ticket.findOneAndUpdate(
        { _id: upsertInput._id },
        {
          $set: {
            approvers: upsertInput.approvers,
            status: upsertInput.status
          }
        },
        { new: true },
      );

      if (savedData.status === "approved") {
        this.ticketNotifService.ticketNotifApprovedStatus(savedData)
      }

      if (savedData.status === "disapproved") {
        this.ticketNotifService.ticketNotifDisapprovedStatus(savedData)
      }

      if (savedData.status === "pending" && prevData.status === "approved") {
        this.ticketNotifService.ticketNotifApprovedtoPendingStatus(savedData)
      }

      if (savedData.status === "pending" && prevData.status === "disapproved") {
        this.ticketNotifService.ticketNotifDisapprovedtoPendingStatus(savedData)
      }


    }

    return savedData;
  }


  async receiveTask(upsertInput: ReceivingArg): Promise<TicketEnt> {
    let savedData;
    let newStatus;
    if (upsertInput._id) {
      let getTicket: UpsertTicketInput = await Ticket.findOne({ _id: upsertInput._id })

      let restruct = getTicket.assignedPersonnel.map((item: any) => {
        let cloned = _.cloneDeep(item)
        let itemUId = item.user
        let itemUidString = itemUId.toString()
        if (itemUidString === upsertInput.userId) {
          cloned.receivedAt = moment().format()
        }
        return cloned
      })

      if (getTicket.status === TicketStatus.APPROVED) {
        newStatus = TicketStatus.TASK_RECEIVED
      } else {
        newStatus = getTicket.status
      }

      savedData = await Ticket.findOneAndUpdate(
        { _id: upsertInput._id },
        {
          $set: {
            assignedPersonnel: restruct,
            status: newStatus
          }
        },
        { new: true },
      );

      if (savedData.status === "task_received") {
        this.ticketNotifService.ticketNotifTaskReceived(savedData)
      }

    }
    return savedData
  }


  async delete(upsertInput: TicketId): Promise<TicketEnt> {
    let removedData = await Ticket.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findEnt(payload: TicketPaginatorArg) {
    let ticket: TicketEnt[] = []
    let ticketCount: number = 0
    let ticketType: TicketTypeEnt

    let filters = objectFilters(payload as TicketPaginatorArg);

    if (filters) {
      ticketCount = await Ticket.find(filters).count()
      ticket = await Ticket.find(filters, {}, { skip: calculateSkip(payload.page, payload.perPage), limit: payload.perPage })
        // ticket = await Ticket.find(filters, {}, { skip: ((payload.page -1) *  payload.perPage), limit: payload.perPage })
        .populate('requestingDepartment')
        .populate('serviceDepartment')
        .populate('createdBy')
        .populate('requestedBy')
        .populate('postOrigin')
        .populate('works')
        .populate('typeId')
        .populate({ path: 'asset', populate: { path: "assetVariation", model: "AssetVariation", match: { isArchived: { $ne: true } } } })

        // .populate({path: 'type', model:'TiketType', select: 'code'})
        .populate({ path: 'approvers.user', model: 'MUser', populate: { path: 'departmentOnDuty', model: 'Department' } })
        .populate({ path: 'assignedPersonnel.user', model: 'MUser', populate: { path: 'departmentOnDuty', model: 'Department' } })
        .sort({ created_at: -1, })
        ;

      // ticketType = await TicketType.findOne({code: }).count()
    }



    return {
      data: ticket,
      paginatorInfo: paginate(
        ticketCount,
        payload.page,
        payload.perPage,
        ticketCount,
      ),
    };
  }

  async findSpecEnt(payload: TicketPaginatorArg) {
    // let filters = objectFilters(payload as TicketPaginatorArg);

    let specTicket: TicketEnt = await Ticket.aggregate(
      [
        {
          $match:
          {
            _id: new ObjectId(payload._id)
          }
        },
        {
          $project: {
            _id: 1,
            code: 1,
            remarks: 1,
            attachments: 1,
            description: 1,
            type: 1,
            typeId: 1,
            dateNeeded: 1,
            dateRequested: 1,
            subject: 1,
            serviceDepartment: 1,
            requestedBy: 1,
            requestingDepartment: 1,
            createdBy: 1,
            asset: 1,
            approvers: {
              $map: {
                input: "$approvers",
                as: "approver",
                in: {
                  status: '$$approver.status',
                  updatedAt: '$$approver.updatedAt',
                  user: '$$approver.user'
                }
              }
            },
            toDo: {
              $map: {
                input: "$toDo",
                as: "do",
                in: {
                  description: '$$do.description',
                  updatedAt: '$$do.updatedAt'
                }
              }
            },
            assignedPersonnel: {
              $map: {
                input: "$assignedPersonnel",
                as: "ap",
                in: {
                  user: '$$ap.user',
                  receivedAt: '$$ap.receivedAt'
                }
              }
            },
            location: 1,
            postOrigin: 1,
            status: 1,
            clientFeedback: 1
          }
        },
        {
          $lookup: {
            from: 'workdetails',
            let: { ticketId: "$_id" },
            pipeline: [
              {
                $match: {
                  $and: [
                    { ticket: new ObjectId(payload._id) },
                    { isArchived: { $ne: true } },
                    // { isArchived: { $exists: true, $not: { $size: 0 } } },
                  ]
                }
              },
              {
                $project: {
                  _id: 1,
                  dateTimeStarted: 1,
                  dateTimeFinished: 1,
                  findings: 1,
                  workStatus: 1,
                  code: 1,
                  isArchived: 1,
                }
              }
            ],
            as: 'works'
          }
        }
      ])



    const ticket: TicketEnt = await Ticket.populate(specTicket,
      [
        { path: "requestingDepartment", model: "Department" },
        { path: "serviceDepartment", model: "Department" },
        { path: "createdBy", model: "MUser" },
        { path: "requestedBy", model: "MUser" },
        { path: "typeId", model: "TicketType" },
        { path: "postOrigin", model: "Post" },
        { path: "asset", model: "Asset" },
        { path: 'approvers.user', model: 'MUser', populate: { path: 'departmentOnDuty', model: 'Department' } },
        { path: 'assignedPersonnel.user', model: 'MUser', populate: { path: 'departmentOnDuty', model: 'Department' } }
      ]

    )

    let ticketTypeData: TicketTypeEnt
    if (ticket[0]?.type) {
      ticketTypeData = await TicketType.findOne({ code: ticket[0].type })
    }

    return {
      data: ticket[0],
      ticketTypeData: ticketTypeData
    };
  }


  async ticketCounter(payload: TicketPaginatorArg) {
    let filtersFA = objectFilters({ userId: payload.userId, type: "FOR_APPROVAL" });
    let filtersWorks = workObjectFilters({ departmentId: payload.departmentId, type: "WORKS_RECEIVED_TO_REC" });

    const ticketFA: TicketEnt[] = await Ticket.find(filtersFA).count()
    const workWR = await WorkDetail.find(filtersWorks).count() // FOR VERIFICATION
    const myApproved = await Ticket.find(objectFilters({ userId: payload.userId, type: "APPROVED" })).count()
    const myAssigned = await Ticket.find(objectFilters({ userId: payload.userId, type: "MY_ASSIGNED_TICKETS" })).count()
    const myAssignedNotRec = await Ticket.find(objectFilters({ userId: payload.userId, type: "MY_ASSIGNED_TICKETS_NOT_RECEIVED" })).count()
    const myCreated = await Ticket.find(objectFilters({ userId: payload.userId, type: "MY_CREATED_TICKETS" })).count()
    const deptServTickets = await Ticket.find(objectFilters({ departmentId: payload.departmentId, type: "MY_DEPARTMENT_SERVICE_TICKETS" })).count()
    const deptServTicketsPending = await Ticket.find(objectFilters({ departmentId: payload.departmentId, type: "MY_DEPARTMENT_SERVICE_TICKETS_PENDING" })).count()
    const deptTicketRequest = await Ticket.find(objectFilters({ departmentId: payload.departmentId, type: "MY_DEPARTMENT_TICKET_REQUEST" })).count()
    const allTickets = await Ticket.find(objectFilters({ type: "ALL_TICKETS" })).count()
    const markedReceivedWorks = await WorkDetail.find(workObjectFilters({ departmentId: payload.departmentId, type: "WORKS_RECEIVED_MARKED" })).count()
    // const workWRE: TicketEnt[] = await WorkDetail.find(filtersWorks) // FOR VERIFICATION

    let totalMore = (!isEmpty(myAssignedNotRec) ? myAssignedNotRec : 0) + (!isEmpty(deptServTicketsPending) ? deptServTicketsPending : 0)


    return {
      data: {
        forApproval: ticketFA,
        worksReceived: workWR,
        myApproved: {
          all: myApproved
        },
        myAssigned: {
          new: myAssignedNotRec,
          all: myAssigned
        },
        myCreatedTickets: {
          all: myCreated
        },
        deptServTickets: {
          all: deptServTickets,
          new: deptServTicketsPending
        },
        deptTicketRequest: {
          all: deptTicketRequest
        },
        markedReceivedWorks: {
          all: markedReceivedWorks
        },
        allTickets: {
          all: allTickets
        },
        moreCount: totalMore //sum all NEW
      }
    }
  }

  async ticketSpecWorkMerge(payload: TicketPaginatorArg) {

    let convTicket = new ObjectId(payload._id)
    let convWork = new ObjectId(payload.workId)

    let ticket: TicketEnt = await Ticket.aggregate(
      [
        {
          $match:
          {
            _id: convTicket
          }
        },
        {
          $project: {
            remarks: 1,
            code: 1,
            asset: 1,
            description: 1,
            type: 1,
            dateNeeded: 1,
            dateRequested: 1,
            subject: 1,
            serviceDepartment: 1,
            requestedBy: 1,
            requestingDepartment: 1,
            works: {
              $filter: {
                input: "$works",
                as: "work",
                cond: { $eq: ["$$work", new ObjectId(convWork)] }
              }
            },

          }
        }])


    let popTicket = await Ticket.populate(ticket, [
      // { path: 'works', model: 'WorkDetail' },
      {
        path: 'works', model: 'WorkDetail', populate: [
          { path: 'submissionDepartment.department', model: 'Department' },
          { path: 'performedBy', model: 'MUser' },
          { path: 'assetVariation', model: 'AssetVariation' },
        ]
      },
      { path: 'serviceDepartment', model: 'Department' },
      { path: 'requestedBy', model: 'MUser' },
      { path: 'requestingDepartment', model: 'Department' },
      { path: 'asset', model: 'Asset' },
    ])

    let ticketType = {}
    if (popTicket.length > 0) {
      ticketType = await TicketType.findOne({ code: popTicket[0].type })
    }

    return {
      data: popTicket[0],
      ticketTypeData: ticketType
    }
  }


  async createTicket(upsertInput: UpsertTicketInput) {



    let savedData;
    let genCode = await ticketCodeGen(upsertInput.type)

    let assignedPersonnel = await TicketType.findOne({ code: upsertInput.type })

    if (assignedPersonnel.assignments.length > 0) {
      let assignedPRestr: AssignedPersonnelEntInput[] = assignedPersonnel.assignments.map((item: any) => {
        return {
          user: item,
        }
      })

      upsertInput.assignedPersonnel = assignedPRestr
    }


    // Ticket code 
    upsertInput.code = genCode

    // Ticket assigned personnel

    savedData = new Ticket(upsertInput);
    await savedData.save();

    if (upsertInput.postOrigin) { // IF CREATED FROM POST

      if (upsertInput.status === TicketStatusType.PENDING) {
        this.ticketNotifService.createTicketPostNotif(upsertInput, savedData)
      }



      await Post.findOneAndUpdate(
        { _id: upsertInput.postOrigin },
        { $set: { ticket: savedData._id } },
        { new: true },
      )
    }

    if (upsertInput.approvers.length > 0 && upsertInput.status === TicketStatusType.PENDING) {
      this.ticketNotifService.ticketNotifApprovers(upsertInput, savedData)
    }

    return await savedData
  }


  async updateTicket(upsertInput: UpsertTicketInput) {


    let savedData;
    let prevTicket: TicketEnt = await Ticket.findOne({ _id: upsertInput._id })



    // if (prevTicket.status === TicketStatusType.DRAFT || prevTicket.status === TicketStatusType.DISAPPROVE) {
    savedData = await Ticket.findOneAndUpdate(
      { _id: upsertInput._id },
      { $set: upsertInput },
      { new: true },
    );
    // }

    if (isEmpty(upsertInput.isOverride) || !upsertInput.isOverride) {
      if (prevTicket.status === TicketStatusType.DRAFT && upsertInput.status === TicketStatusType.PENDING) {
        if (upsertInput.postOrigin) { // IF CREATED FROM POST
          this.ticketNotifService.createTicketPostNotif(upsertInput, savedData)
        }
      }


      if (upsertInput.approvers.length > 0 && upsertInput.status === TicketStatusType.PENDING) {
        this.ticketNotifService.ticketNotifApprovers(upsertInput, savedData)
      }

    }

    return await savedData

  }

  async changeTicketStatus(upsertInput: UpsertTicketInput) {
    let newData = await this.statusModifier(upsertInput)

    return newData
  }

  async statusModifier(upsertInput: UpsertTicketInput) {
    let ticketDet = await Ticket.findOneAndUpdate(
      { _id: upsertInput._id },
      {
        $set: {
          status: upsertInput.status,
          remarks: upsertInput.remarks,
        }
      },
      { new: true },
    );

    if (['success', 'failed', 'closed'].includes(ticketDet.status)) {
      this.ticketNotifService.ticketNotifFinalStatusChange(ticketDet)
    }


    return ticketDet
  }




}

