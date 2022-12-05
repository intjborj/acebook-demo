import Ticket from '@models/Transactionals/Tickets';
import TicketType from '@models/Masterdata/TicketType';
import { UpsertTicketInput } from '@/acebook/transactional/ticket/dto/ticket.input';
import Post from '@models/Transactionals/Posts';
import { PostEnt, PostInput } from '@/acebook/transactional/post/entities/post.entity';
import { NotifMessageType } from '@/constants/notifications';
import { TicketTypeEnt } from '@/acebook/transactional/ticketType/entities/ticketType.entity';
import { Injectable } from '@nestjs/common';
import { NotificationService } from '@/acebook/transactional/notification/notification.service';
import _ from 'lodash'
import { NotifTags } from '../../notification/services/enums';
import { FrontPaths } from '@/acebook/constants/enums';
import { UpsertWorkDetailInput } from '../../workDetail/dto/workDetail.input';
import { WorkDetailEnt } from '../../workDetail/entities/workDetail.entity';

@Injectable()
export class TicketNotifService {
    constructor(
        private readonly notificationService: NotificationService
    ) { }

    async createTicketPostNotif(upsertInput: UpsertTicketInput, savedData: any) {
        let post: PostInput = await Post.findOne({ _id: upsertInput.postOrigin })
        // let ticketType: TicketTypeEnt = await TicketType.findOne({ code: upsertInput.type })

        this.notificationService.notifier({
            message: upsertInput.subject,
            fromUserId: upsertInput.createdBy, //the one who commented
            toUserId: post.createdBy, //the owner of the post
            entId: savedData._id,
            userId: post.createdBy,
            path: FrontPaths.TICKET_VIEW,
            messageType: NotifMessageType.POST_CREATE_TICKET,
            tags: [NotifTags.TICKET, NotifTags.POST_TO_TICKET],
            ticketTypes: [upsertInput.type],
            code: savedData.code
        })
    }


    async ticketNotifApprovers(upsertInput: UpsertTicketInput, savedData: any) {
        let ticketType: TicketTypeEnt = await TicketType.findOne({ code: upsertInput.type })
        let aproverIds = _.map(upsertInput.approvers, 'user')
        

        if (savedData?._id) {
            this.notificationService.notifier({
                message: `(${ticketType.name}) - ${upsertInput.subject}`,
                fromUserId: upsertInput.requestedBy,
                toUserIdS: aproverIds,
                entId: savedData._id,
                path: FrontPaths.TICKET_VIEW,
                messageType: NotifMessageType.NOTIFY_TICKET_APPROVERS_APPROVAL,
                tags: [NotifTags.TICKET_APPROVAL, NotifTags.TICKET,],
                ticketTypes: [upsertInput.type],
                code: savedData.code
            })
        }
    }

    async ticketNotifApprovedStatus(savedData: UpsertTicketInput) {
        let ticketType: TicketTypeEnt = await TicketType.findOne({ code: savedData.type })



        // Notify ticket requestor
        this.notificationService.notifier({
            message: `(${ticketType.name}) - ${savedData.subject}`,
            toUserId: savedData.requestedBy,
            entId: savedData._id as string,
            path: FrontPaths.TICKET_VIEW,
            messageType: NotifMessageType.NOTIFY_TICKET_REQUESTOR_APPROVED,
            tags: [NotifTags.APPROVED, NotifTags.TICKET],
            ticketTypes: [savedData.type],
            code: savedData.code
        })

        // Notify ticket assigned personnels
        if (savedData.assignedPersonnel.length > 0) {
            let allAssigned: string[] = _.map(savedData.assignedPersonnel, "user")


            this.notificationService.notifier({
                message: `(${ticketType.name}) - ${savedData.subject}`,
                toUserIdS: allAssigned,
                entId: savedData._id as string,
                path: FrontPaths.TICKET_VIEW,
                messageType: NotifMessageType.NOTIFY_TICKET_ASSIGN_PERSON,
                tags: [NotifTags.TASK, NotifTags.TO_RECEIVE, NotifTags.TICKET],
                ticketTypes: [savedData.type],
                code: savedData.code
            })
        }
    }

    async ticketNotifAssignedPersonnel(savedData: UpsertTicketInput, personnel: any) {
        let ticketType: TicketTypeEnt = await TicketType.findOne({ code: savedData.type })
        this.notificationService.notifier({
            message: `(${ticketType.name}) - ${savedData.subject}`,
            toUserIdS: personnel,
            entId: savedData._id as string,
            path: FrontPaths.TICKET_VIEW,
            messageType: NotifMessageType.NOTIFY_TICKET_ASSIGN_PERSON,
            tags: [NotifTags.TASK, NotifTags.TO_RECEIVE, NotifTags.TICKET],
            ticketTypes: [savedData.type],
            code: savedData.code
        })
    }

    async ticketNotifWorkSubmissionDept(savedData: UpsertTicketInput, work: WorkDetailEnt, departments: any) {

        let ticketType: TicketTypeEnt = await TicketType.findOne({ code: savedData.type })
        this.notificationService.notifier({
            message: `(${ticketType.name}) - ${savedData.subject}`,
            departments: departments,
            entId: work._id as string,
            path: FrontPaths.TICKET_WORK_VIEW,
            pathSuffix: `?mn=${savedData._id}`,
            messageType: NotifMessageType.NOTIFY_TICKET_WORK_SUBMISSION_DEPARTMENT,
            tags: [NotifTags.WORK, NotifTags.SUBMISSION],
            ticketTypes: [savedData.type],
            code: work.code
        })
    }


    async ticketNotifFinalStatusChange(savedData: UpsertTicketInput) {

        this.notificationService.notifier({
            message: `${savedData.status.toUpperCase()}`,
            toUserId: savedData.requestedBy,
            entId: savedData._id as string,
            path: FrontPaths.TICKET_VIEW,
            messageType: NotifMessageType.NOTIFY_TICKET_REQUESTOR_FINAL_STATUS_CHANGED,
            tags: [NotifTags.STATUS_CHANGED, NotifTags.TICKET],
            ticketTypes: [savedData.type],
            code: savedData.code
        })
    }


    async ticketNotifDisapprovedStatus(savedData: any) {
        let ticketType: TicketTypeEnt = await TicketType.findOne({ code: savedData.type })




        this.notificationService.notifier({
            message: `(${ticketType.name}) - ${savedData.subject}`,
            toUserId: savedData.requestedBy,
            entId: savedData._id,
            path: FrontPaths.TICKET_VIEW,
            messageType: NotifMessageType.NOTIFY_TICKET_REQUESTOR_DISAPPROVED,
            tags: [NotifTags.DISAPPROVED, NotifTags.TICKET],
            ticketTypes: [savedData.type],
            code: savedData.code
        })
    }

    async ticketNotifTaskReceived(savedData: any) {

        this.notificationService.notifier({
            toUserId: savedData.requestedBy,
            entId: savedData._id,
            path: FrontPaths.TICKET_VIEW,
            messageType: NotifMessageType.NOTIFY_TICKET_REQUESTOR_TASK_RECEIVED,
            tags: [NotifTags.RECEIVED, NotifTags.TASK, NotifTags.TICKET],
            ticketTypes: [savedData.type],
            code: savedData.code
        })
    }

    async ticketNotifApprovedtoPendingStatus(savedData: any) {
        let ticketType: TicketTypeEnt = await TicketType.findOne({ code: savedData.type })

        this.notificationService.notifier({
            message: `(${ticketType.name}) - ${savedData.subject}`,
            toUserId: savedData.requestedBy,
            entId: savedData._id,
            path: FrontPaths.TICKET_VIEW,
            messageType: NotifMessageType.NOTIFY_TICKET_REQUESTOR_APP_TO_PENDING,
            tags: [NotifTags.STATUS_CHANGED, NotifTags.TICKET],
            ticketTypes: [savedData.type],
            code: savedData.code
        })
    }

    async ticketNotifDisapprovedtoPendingStatus(savedData: any) {
        let ticketType: TicketTypeEnt = await TicketType.findOne({ code: savedData.type })

        this.notificationService.notifier({
            message: `(${ticketType.name}) - ${savedData.subject}`,
            toUserId: savedData.requestedBy,
            entId: savedData._id,
            path: FrontPaths.TICKET_VIEW,
            messageType: NotifMessageType.NOTIFY_TICKET_REQUESTOR_DISAPP_TO_PENDING,
            tags: [NotifTags.STATUS_CHANGED, NotifTags.TICKET],
            ticketTypes: [savedData.type],
            code: savedData.code
        })
    }


}

// export async function ticketNotification(upsertInput: UpsertTicketInput, savedData: any) {
//     let post: PostInput = await Post.findOne({ _id: upsertInput.postOrigin })
//     let ticketType: TicketTypeEnt = await TicketType.findOne({ code: upsertInput.type })

//     this.notificationService.notifier({
//         message: upsertInput.subject,
//         fromUserId: upsertInput.createdBy, //the one who commented
//         toUserId: post.createdBy, //the owner of the post
//         entId: savedData._id,
//         userId: post.createdBy,
//         path: '/tickets/view',
//         messageType: NotifMessageType.POST_CREATE_TICKET,
//         tags: [ticketType.name]
//     })
// }