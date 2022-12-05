import { Module } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { TicketNotifService } from '../ticket/services/ticketNotification';
import { WorkDetailResolver } from './workDetail.resolvers';
import { WorkDetailService } from './workDetail.service';

@Module({
  providers: [WorkDetailResolver, WorkDetailService, NotificationService, TicketNotifService]
})
export class WorkDetailModule {}

