import { ArgsType, ObjectType, InputType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { AssetVariationEnt, AssetVariationInputEnt } from '../entities/assetVariation.entity';
import { GenSearchType } from '@/common/dto/search.args';
import { AssetEnt } from '../../asset/entities/asset.entity';

@ObjectType()
export class AssetVariationPaginator {
  data: AssetVariationEnt[];
  assetData: AssetEnt;
  paginatorInfo: PaginatorInfo;
}

@ObjectType()
export class AssetVariationData {
  data: AssetVariationEnt;
}

@InputType('BulkAssetVarInputType', { isAbstract: true })
@ObjectType()
export class BulkAssetVar {
  assetVariations: AssetVariationInputEnt[];
}


@ArgsType()
export class AssetVarPaginatorArg extends PaginationArgs {
  _id?: string;
  asset?: string;
  searchArg?: GenSearchType
}





// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
