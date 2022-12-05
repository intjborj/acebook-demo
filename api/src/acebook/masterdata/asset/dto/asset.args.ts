import { ArgsType, ObjectType, InputType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { AssetEnt, AssetVarUpdateEnt } from '../entities/asset.entity';
import { GenSearchType } from '@/common/dto/search.args';

@ObjectType()
export class AssetPaginator {
  data: AssetEnt[];
  paginatorInfo: PaginatorInfo;
}


@ObjectType()
export class AssetData {
  data: AssetEnt;
}

@InputType('BulkAssetInputType', { isAbstract: true })
@ObjectType()
export class BulkAsset {
  assets: AssetEnt[];
}



@InputType('BulkAssetUpdateInputType', { isAbstract: true })
@ObjectType()
export class BulkAssetVarUp {
  assets: AssetVarUpdateEnt[];
}


@ArgsType()
export class AssSearchArgs {
  text?: string;
}

@ArgsType()
export class AssetPaginatorArg extends PaginationArgs {
  _id?: string;
  searchArg?: GenSearchType
}




// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
