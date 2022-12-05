import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { TicketTypeService } from './ticketType.service';
import { TicketTypeId, UpsertTicketTypeInput } from './dto/ticketType.input';
import { TicketTypePaginator, TicketTypePaginatorArg} from './dto/ticketType.args';
import { TicketTypeEnt } from './entities/ticketType.entity';

@Resolver(() => TicketTypeEnt)
export class TicketTypeResolver {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  @Mutation(() => TicketTypeEnt)
  async upsertTicketType(
    @Args('input') upsertInput: UpsertTicketTypeInput,
  ): Promise<TicketTypeEnt> {

    return this.ticketTypeService.upsert(upsertInput);
  }

  @Mutation(() => TicketTypeEnt)
  async deleteTicketType(
    @Args('input') deleteInput: TicketTypeId,
  ): Promise<TicketTypeEnt> {

    return this.ticketTypeService.delete(deleteInput);
  }

  @Query(() => TicketTypePaginator, { name: 'ticketTypes' })
  getTags(@Args() getArgs: TicketTypePaginatorArg) {
    return this.ticketTypeService.findAll(getArgs);
  }

 

 
}
