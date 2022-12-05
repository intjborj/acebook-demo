import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';
import { AssetEnt } from '../../asset/entities/asset.entity';
import { ManufacturerEnt } from '../../manufacturer/entities/manufacturer.entity';
import { SupplierEnt } from '../../supplier/entities/supplier.entity';

@InputType('AssetVariationCommonType', { isAbstract: true })
@ObjectType()
export class AssetVariationCommon extends CoreEntityMg {
  serialNo?: string;
  propertyCode?: string;
  model?: string;
  migrationId?: string;
  manufacturerMID?: string;
  supplierMID?: string;
  departmentMID?: string;
  locationMID?: string;
  inpsectedByMID?: string;
  typeMID?: string;
  cost?: number;
  condition?: string;
  ipms?: string;
  description?: string;
  deployedDate?: string;
  isArchived?: boolean;
}

@InputType('AssetVariationDataType', { isAbstract: true })
@ObjectType()
export class AssetVariationEnt extends AssetVariationCommon {
  asset?: AssetEnt;
  manufacturer?: ManufacturerEnt;
  supplier?: SupplierEnt
}

@InputType('AssetVariationInputType', { isAbstract: true })
@ObjectType()
export class AssetVariationInputEnt extends AssetVariationCommon {
  asset?: string;
  manufacturer?: string;
  supplier?: string;
 
}
