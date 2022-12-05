import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { CustomTagService } from './customTag.service';
import { CustomTagId, UpsertCustomTagInput } from './dto/customTag.input';
import { CustomTagPaginator} from './dto/customTag.args';
import { CustomTagEnt } from './entities/customTag.entity';

@Resolver(() => CustomTagEnt)
export class CustomTagResolver {
  constructor(private readonly customTagService: CustomTagService) {}

  @Mutation(() => CustomTagEnt)
  async upsertCustomTag(
    @Args('input') upsertInput: UpsertCustomTagInput,
  ): Promise<CustomTagEnt> {

    return this.customTagService.upsert(upsertInput);
  }

  @Mutation(() => CustomTagEnt)
  async deleteCustomTag(
    @Args('input') deleteInput: CustomTagId,
  ): Promise<CustomTagEnt> {

    return this.customTagService.delete(deleteInput);
  }

  @Query(() => CustomTagPaginator, { name: 'customTags' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.customTagService.findAll(getArgs);
  }

 

 
}
