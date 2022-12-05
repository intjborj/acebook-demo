import { Module } from '@nestjs/common';
import { AssetVariationResolver } from './assetVariation.resolvers';
import { AssetVariationService } from './assetVariation.service';

@Module({
  providers: [AssetVariationResolver, AssetVariationService]
})
export class AssetVariationModule {}

