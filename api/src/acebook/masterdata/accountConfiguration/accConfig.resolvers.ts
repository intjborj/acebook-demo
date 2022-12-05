import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { AccConfigService } from './accConfig.service';
import { AccConfigId, UpdateAccConfigInput } from './dto/accConfig.input';
import { AccConfigPaginator} from './dto/accConfig.args';
import { AccConfigEnt } from './entities/accConfig.entity';

@Resolver(() => AccConfigEnt)
export class AccConfigResolver {
  constructor(private readonly accConfigService: AccConfigService) {}

  @Mutation(() => AccConfigEnt)
  async updateAccConfig(
    @Args('input') upsertInput: UpdateAccConfigInput,
  ): Promise<AccConfigEnt> {

    return this.accConfigService.upAccConfig(upsertInput);
  }

 

 
}
