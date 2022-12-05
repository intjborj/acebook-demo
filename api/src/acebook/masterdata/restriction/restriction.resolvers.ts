import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { RestrictionService } from './restriction.service';
import { RestrictionId, UpsertRestrictionInput } from './dto/restriction.input';
import { RestrictionPaginator} from './dto/restriction.args';
import { RestrictionEnt } from './entities/restriction.entity';

@Resolver(() => RestrictionEnt)
export class RestrictionResolver {
  constructor(private readonly restrictionService: RestrictionService) {}

  @Mutation(() => RestrictionEnt)
  async upsertRestriction(
    @Args('input') upsertInput: UpsertRestrictionInput,
  ): Promise<RestrictionEnt> {

    return this.restrictionService.upsert(upsertInput);
  }

  @Mutation(() => RestrictionEnt)
  async deleteRestriction(
    @Args('input') deleteInput: RestrictionId,
  ): Promise<RestrictionEnt> {

    return this.restrictionService.delete(deleteInput);
  }

  @Query(() => RestrictionPaginator, { name: 'restrictions' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.restrictionService.findAll(getArgs);
  }

 

 
}
