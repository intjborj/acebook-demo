import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { TicketService } from './ticket.service';
import { TicketId, UpsertTicketInput } from './dto/ticket.input';
import { ReceivingArg, TicketCounterResp, TicketData, TicketPaginator, TicketPaginatorArg } from './dto/ticket.args';
import { TicketEnt } from './entities/ticket.entity';
import { ticketCodeGen } from './services/ticketCodeGenerator';

@Resolver(() => TicketEnt)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) { }

  @Mutation(() => TicketEnt)
  async upsertTicket(
    @Args('input') upsertInput: UpsertTicketInput,
  ): Promise<TicketEnt> {

    return this.ticketService.upsert(upsertInput);
  }

  @Mutation(() => TicketEnt)
  async upsertTicketAssigs(
    @Args('input') upsertInput: UpsertTicketInput,
  ): Promise<TicketEnt> {

    return this.ticketService.upsertTicketAssigs(upsertInput);
  }

  @Mutation(() => TicketEnt)
  async upsertTicketTodo(
    @Args('input') upsertInput: UpsertTicketInput,
  ): Promise<TicketEnt> {

    return this.ticketService.upsertTicketTodo(upsertInput);
  }

  @Mutation(() => TicketEnt)
  async upsertTicketFeedback(
    @Args('input') upsertInput: UpsertTicketInput,
  ): Promise<TicketEnt> {

    return this.ticketService.upsertTicketFeedback(upsertInput);
  }

  @Mutation(() => TicketEnt)
  async statusModifier(
    @Args('input') upsertInput: UpsertTicketInput,
  ): Promise<TicketEnt> {

    return this.ticketService.statusModifier(upsertInput);
  }

  @Mutation(() => TicketEnt)
  async approverTicket(
    @Args('input') upsertInput: UpsertTicketInput,
  ): Promise<TicketEnt> {
    return this.ticketService.approverTicket(upsertInput);
  }

  @Mutation(() => TicketEnt)
  async deleteTicket(
    @Args('input') deleteInput: TicketId,
  ): Promise<TicketEnt> {

    return this.ticketService.delete(deleteInput);
  }

  @Mutation(() => TicketEnt)
  async receiveTask(
    @Args() receivingInput: ReceivingArg,
  ): Promise<TicketEnt> {

    return this.ticketService.receiveTask(receivingInput);
  }

  @Query(() => TicketPaginator, { name: 'tickets' })
  getTags(@Args() getArgs: TicketPaginatorArg) {

    return this.ticketService.findEnt(getArgs);
  }

  @Query(() => TicketData, { name: 'ticket' })
  getTicket(@Args() getArgs: TicketPaginatorArg) {
    return this.ticketService.findSpecEnt(getArgs);
  }

  @Query(() => TicketData, { name: 'ticketWork' })
  getSpecTicketWork(@Args() getArgs: TicketPaginatorArg) {

    return this.ticketService.ticketSpecWorkMerge(getArgs);
  }

  @Query(() => TicketCounterResp, { name: 'ticketCounts' })
  getTicketCounts(@Args() getArgs: TicketPaginatorArg) {
    return this.ticketService.ticketCounter(getArgs);
  }




}
