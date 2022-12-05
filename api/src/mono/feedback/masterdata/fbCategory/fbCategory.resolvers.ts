import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { FbCategoryService } from './fbCategory.service';
import { FbCategoryId, UpsertFbCategoryInput } from './dto/fbCategory.input';
import { FbCategoryPaginator} from './dto/fbCategory.args';
import { FbCategoryEnt } from './entities/fbCategory.entity';

@Resolver(() => FbCategoryEnt)
export class FbCategoryResolver {
  constructor(private readonly fbCategoryService: FbCategoryService) {}

  @Mutation(() => FbCategoryEnt)
  async upsertFbCategory(
    @Args('input') upsertInput: UpsertFbCategoryInput,
  ): Promise<FbCategoryEnt> {

    return this.fbCategoryService.upsert(upsertInput);
  }

  @Mutation(() => FbCategoryEnt)
  async deleteFbCategory(
    @Args('input') deleteInput: FbCategoryId,
  ): Promise<FbCategoryEnt> {

    return this.fbCategoryService.delete(deleteInput);
  }

  @Query(() => FbCategoryPaginator, { name: 'fbCategorys' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.fbCategoryService.findAll(getArgs);
  }

 

 
}
