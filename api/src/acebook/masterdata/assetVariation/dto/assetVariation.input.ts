import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { AssetVariationEnt, AssetVariationInputEnt } from '../entities/assetVariation.entity';
import { BulkAssetVar } from './assetVariation.args';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionav' });
@InputType()
export class UpsertAssetVariationInput extends PickType(AssetVariationInputEnt, [
  'serialNo',
  'propertyCode',
  'model',
  'asset',
  'manufacturer',
  'isArchived',
  'cost',
  'condition',
  'ipms',
  'description',
  'deployedDate',
  'supplier',
  '_id'
]) { permission: Permission = Permission.CUSTOMER; }

@InputType()
export class AssetVariationId extends PickType(AssetVariationEnt, [
  '_id'
]) { permission: Permission = Permission.CUSTOMER; }


@InputType()
export class BulkAssetVarInput extends PickType(BulkAssetVar, [
  'assetVariations'
]) { permission: Permission = Permission.CUSTOMER; }
