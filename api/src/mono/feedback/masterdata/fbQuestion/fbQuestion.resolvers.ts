import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { FbQuestionService } from './fbQuestion.service';
import { FbQuestionId, UpsertFbQuestionInput } from './dto/fbQuestion.input';
import { FbQuestionPaginator} from './dto/fbQuestion.args';
import { FbQuestionEnt } from './entities/fbQuestion.entity';

@Resolver(() => FbQuestionEnt)
export class FbQuestionResolver {
  constructor(private readonly fbQuestionService: FbQuestionService) {}

  @Mutation(() => FbQuestionEnt)
  async upsertFbQuestion(
    @Args('input') upsertInput: UpsertFbQuestionInput,
  ): Promise<FbQuestionEnt> {

    return this.fbQuestionService.upsert(upsertInput);
  }

  @Mutation(() => FbQuestionEnt)
  async deleteFbQuestion(
    @Args('input') deleteInput: FbQuestionId,
  ): Promise<FbQuestionEnt> {

    return this.fbQuestionService.delete(deleteInput);
  }

  @Query(() => FbQuestionPaginator, { name: 'fbQuestions' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.fbQuestionService.findAll(getArgs);
  }

 

 
}
