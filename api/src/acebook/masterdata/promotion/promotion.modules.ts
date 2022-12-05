import { Module } from '@nestjs/common';
import { PromotionResolver } from './promotion.resolvers';
import { PromotionService } from './promotion.service';

@Module({
  providers: [PromotionResolver, PromotionService]
})
export class PromotionModule {}

