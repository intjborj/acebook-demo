import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { FbCategoryQuestionService } from './fbCategoryQuestion.service';
import { FbCategoryQuestionId, UpsertFbCategoryQuestionInput } from './dto/fbCategoryQuestion.input';
import { FbCategoryQuestionPaginator, FCQPaginatorArg} from './dto/fbCategoryQuestion.args';
import { FbCategoryQuestionEnt } from './entities/fbCategoryQuestion.entity';

@Resolver(() => FbCategoryQuestionEnt)
export class FbCategoryQuestionResolver {
  constructor(private readonly fbCategoryQuestionService: FbCategoryQuestionService) {}

  @Mutation(() => FbCategoryQuestionEnt)
  async upsertFbCategoryQuestion(
    @Args('input') upsertInput: UpsertFbCategoryQuestionInput,
  ): Promise<FbCategoryQuestionEnt> {

    return this.fbCategoryQuestionService.upsert(upsertInput);
  }

  @Mutation(() => FbCategoryQuestionEnt)
  async deleteFbCategoryQuestion(
    @Args('input') deleteInput: FbCategoryQuestionId,
  ): Promise<FbCategoryQuestionEnt> {

    return this.fbCategoryQuestionService.delete(deleteInput);
  }

  @Query(() => FbCategoryQuestionPaginator, { name: 'fbCategoryQuestions' })
  getTags(@Args() getArgs: FCQPaginatorArg) {
    return this.fbCategoryQuestionService.findAll(getArgs);
  }

 

 
}
