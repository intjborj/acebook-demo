import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { ReactionIconDetailService } from './reactionIconDetail.service';
import { ReactionIconDetailId, UpsertReactionIconDetailInput } from './dto/reactionIconDetail.input';
import { ReactionIconDetailPaginator} from './dto/reactionIconDetail.args';
import { ReactionIconDetailEnt } from './entities/reactionIconDetail.entity';

@Resolver(() => ReactionIconDetailEnt)
export class ReactionIconDetailResolver {
  constructor(private readonly reactionIconDetailService: ReactionIconDetailService) {}

  @Mutation(() => ReactionIconDetailEnt)
  async upsertReactionIconDetail(
    @Args('input') upsertInput: UpsertReactionIconDetailInput,
  ): Promise<ReactionIconDetailEnt> {

    return this.reactionIconDetailService.upsert(upsertInput);
  }

  @Mutation(() => ReactionIconDetailEnt)
  async deleteReactionIconDetail(
    @Args('input') deleteInput: ReactionIconDetailId,
  ): Promise<ReactionIconDetailEnt> {

    return this.reactionIconDetailService.delete(deleteInput);
  }

  @Query(() => ReactionIconDetailPaginator, { name: 'reactionIconDetails' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.reactionIconDetailService.findAll(getArgs);
  }

 

 
}
