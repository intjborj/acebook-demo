import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';
import { AssetVariationEnt } from '../../assetVariation/entities/assetVariation.entity';
import { DepartmentEnt } from '../../department/entities/department.entity';

@InputType('AssetCommonType', { isAbstract: true })
@ObjectType()
export class AssetCommonEnt extends CoreEntityMg {
  name?: string;
  description?: string;
  model?: string;
  migrationId?: string;
  prefix?: string;
  count?: number;
  systemCount?: number;
}

@InputType('AssetEntType', { isAbstract: true })
@ObjectType()
export class AssetEnt extends AssetCommonEnt {
  assetVariation?: AssetVariationEnt[];
  handlingDepartment?: DepartmentEnt[];
}

@InputType('AssetInputType', { isAbstract: true })
@ObjectType()
export class AssetInputEnt extends AssetCommonEnt {
  handlingDepartment?: string[];
}

// @InputType('AssetInputType', { isAbstract: true })
// @ObjectType()
// export class AssetEnt extends CoreEntityMg {
//   name?: string;
//   description?: string;
//   model?: string;
//   migrationId?: string;
//   prefix?: string;
//   count?: number;
//   systemCount?: number;
//   assetVariation?: AssetVariationEnt[];
// }

@InputType('AssetVarUpdateInputType', { isAbstract: true })
@ObjectType()
export class AssetVarUpdateEnt extends CoreEntityMg {
  _id: string;
  assetVariation?: string[];
}


