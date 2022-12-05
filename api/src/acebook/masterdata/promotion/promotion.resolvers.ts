import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { PromotionService } from './promotion.service';
import { PromotionId, UpsertPromotionInput } from './dto/promotion.input';
import { PromotionPaginator} from './dto/promotion.args';
import { PromotionEnt, PromotionEntInput } from './entities/promotion.entity';

@Resolver(() => PromotionEnt)
export class PromotionResolver {
  constructor(private readonly promotionService: PromotionService) {}

  @Mutation(() => PromotionPaginator)
  async upsertPromotion(
    @Args('input') upsertInput: UpsertPromotionInput,
  ): Promise<PromotionPaginator> {

    return this.promotionService.upsert(upsertInput);
  }

  @Mutation(() => PromotionEnt)
  async deletePromotion(
    @Args('input') deleteInput: PromotionId,
  ): Promise<PromotionEnt> {

    return this.promotionService.delete(deleteInput);
  }

  @Query(() => PromotionPaginator, { name: 'promotions' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.promotionService.findAll(getArgs);
  }

 

 
}
