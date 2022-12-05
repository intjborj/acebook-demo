import { Module } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { TicketNotifService } from './services/ticketNotification';
import { TicketResolver } from './ticket.resolvers';
import { TicketService } from './ticket.service';

@Module({
  providers: [TicketResolver, TicketService, NotificationService, TicketNotifService]
})
export class TicketModule {}

