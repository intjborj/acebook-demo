import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { FeedbackService } from './feedback.service';
import { FeedbackId, UpsertFeedbackInput } from './dto/feedback.input';
import { FeedbackPaginator} from './dto/feedback.args';
import { FeedbackEnt } from './entities/feedback.entity';

@Resolver(() => FeedbackEnt)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Mutation(() => FeedbackEnt)
  async upsertFeedback(
    @Args('input') upsertInput: UpsertFeedbackInput,
  ): Promise<FeedbackEnt> {

    return this.feedbackService.upsert(upsertInput);
  }

  @Mutation(() => FeedbackEnt)
  async deleteFeedback(
    @Args('input') deleteInput: FeedbackId,
  ): Promise<FeedbackEnt> {

    return this.feedbackService.delete(deleteInput);
  }

  @Query(() => FeedbackPaginator, { name: 'feedbacks' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.feedbackService.findAll(getArgs);
  }

 

 
}
