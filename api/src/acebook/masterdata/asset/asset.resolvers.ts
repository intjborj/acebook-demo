import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import { AssetService } from './asset.service';
import { AssetId, BulkAssetInput, BulkAssetVarUpdateInput, UpsertAssetInput } from './dto/asset.input';
import { AssetData, AssetPaginator, AssetPaginatorArg, AssSearchArgs, BulkAsset } from './dto/asset.args';
import { AssetEnt } from './entities/asset.entity';

@Resolver(() => AssetEnt)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) { }

  @Mutation(() => AssetEnt)
  async upsertAsset(
    @Args('input') upsertInput: UpsertAssetInput,
  ): Promise<AssetEnt> {

    return this.assetService.upsert(upsertInput);
  }

  @Mutation(() => Boolean)
  async updateVariations(
    @Args('input') upsertInput: BulkAssetVarUpdateInput,
  ): Promise<Boolean> {

    return this.assetService.updateVariations(upsertInput);
  }

  @Mutation(() => Boolean)
  async updateAssetBiomed(
    @Args('input') upsertInput: BulkAssetVarUpdateInput,
  ): Promise<Boolean> {

    return this.assetService.updateAssetBiomed(upsertInput);
  }

  @Mutation(() => AssetEnt)
  async deleteAsset(
    @Args('input') deleteInput: AssetId,
  ): Promise<AssetEnt> {

    return this.assetService.delete(deleteInput);
  }

  @Query(() => AssetPaginator, { name: 'assets' })
  getTags(@Args() getArgs: AssetPaginatorArg) {
    return this.assetService.findAll(getArgs);
  }

  @Query(() => AssetPaginator, { name: 'allAssets' })
  getAllAssets(@Args() getArgs: AssetPaginatorArg) {
    return this.assetService.allAsset(getArgs);
  }


  @Query(() => AssetData, { name: 'asset' })
  getAsset(@Args() getArgs: SpecObjectArgs) {
    return this.assetService.findOne(getArgs);
  }


  @Query(() => AssetPaginator, { name: 'search_asset' })
  getSearch(@Args() getArgs: AssSearchArgs) {
    return this.assetService.searchAll(getArgs);
  }

  @Query(() => AssetPaginator, { name: 'extract_ass_var' })
  extractAssVar(@Args() getArgs: AssSearchArgs) {
    return this.assetService.extractAssVar();
  }


  @Mutation(() => Boolean)
  async assetBulkInsert(
    @Args('input') upsertInput: BulkAssetInput,
  ): Promise<Boolean> {
    return this.assetService.bulkInsert(upsertInput);
  }




}
