import { Module } from '@nestjs/common';
import { TicketTypeResolver } from './ticketType.resolvers';
import { TicketTypeService } from './ticketType.service';

@Module({
  providers: [TicketTypeResolver, TicketTypeService]
})
export class TicketTypeModule {}

