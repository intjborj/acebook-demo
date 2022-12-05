import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { AssetEnt, AssetInputEnt } from '../entities/asset.entity';
import { BulkAsset, BulkAssetVarUp } from './asset.args';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionass' });
@InputType()
export class UpsertAssetInput extends PickType(AssetInputEnt, [
  'name',
  'description',
  'count',
  'prefix',
  'model',
  'handlingDepartment',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class AssetId extends PickType(AssetEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}


@InputType()
export class BulkAssetInput extends PickType(BulkAsset, [
  'assets'
]){permission: Permission = Permission.CUSTOMER;}


@InputType()
export class BulkAssetVarUpdateInput extends PickType(BulkAssetVarUp, [
  'assets'
]){permission: Permission = Permission.CUSTOMER;}