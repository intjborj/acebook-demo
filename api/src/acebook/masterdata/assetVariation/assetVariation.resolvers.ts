import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import { AssetVariationService } from './assetVariation.service';
import { AssetVariationId, BulkAssetVarInput, UpsertAssetVariationInput } from './dto/assetVariation.input';
import { AssetVariationData, AssetVariationPaginator, AssetVarPaginatorArg} from './dto/assetVariation.args';
import { AssetVariationEnt } from './entities/assetVariation.entity';

@Resolver(() => AssetVariationEnt)
export class AssetVariationResolver {
  constructor(private readonly assetVariationService: AssetVariationService) {}

  @Mutation(() => AssetVariationEnt)
  async upsertAssetVariation(
    @Args('input') upsertInput: UpsertAssetVariationInput,
  ): Promise<AssetVariationEnt> {

    return this.assetVariationService.upsert(upsertInput);
  }

  @Mutation(() => AssetVariationEnt)
  async archiveAssetVariation(
    @Args('input') upsertInput: UpsertAssetVariationInput,
  ): Promise<AssetVariationEnt> {

    return this.assetVariationService.archive(upsertInput);
  }

  @Mutation(() => AssetVariationEnt)
  async deleteAssetVariation(
    @Args('input') deleteInput: AssetVariationId,
  ): Promise<AssetVariationEnt> {

    return this.assetVariationService.delete(deleteInput);
  }

  @Query(() => AssetVariationPaginator, { name: 'assetVariations' })
  getTags(@Args() getArgs: AssetVarPaginatorArg) {
    return this.assetVariationService.findAll(getArgs);
  }
  
  @Query(() => AssetVariationData, { name: 'assetVariation' })
  getAssetVar(@Args() getArgs: SpecObjectArgs) {
    return this.assetVariationService.findOne(getArgs);
  }


  
  @Mutation(() => Boolean)
  async assetVarBulkInsert(
    @Args('input') upsertInput: BulkAssetVarInput,
  ): Promise<Boolean> {
    return this.assetVariationService.bulkInsert(upsertInput);
  }

 

 
}
