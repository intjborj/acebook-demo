import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { CompConfigService } from './compConfig.service';
import { CompConfigId, UpsertCompConfigInput } from './dto/compConfig.input';
import { CompConfigPaginator} from './dto/compConfig.args';
import { CompConfigEnt } from './entities/compConfig.entity';

@Resolver(() => CompConfigEnt)
export class CompConfigResolver {
  constructor(private readonly compConfigService: CompConfigService) {}

  @Mutation(() => CompConfigEnt)
  async upsertCompConfig(
    @Args('input') upsertInput: UpsertCompConfigInput,
  ): Promise<CompConfigEnt> {

    return this.compConfigService.upsert(upsertInput);
  }

  @Mutation(() => CompConfigEnt)
  async deleteCompConfig(
    @Args('input') deleteInput: CompConfigId,
  ): Promise<CompConfigEnt> {

    return this.compConfigService.delete(deleteInput);
  }

  @Query(() => CompConfigPaginator, { name: 'compConfigs' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.compConfigService.findAll(getArgs);
  }

 

 
}
