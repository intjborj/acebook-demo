import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { AssetVariationEnt } from './entities/assetVariation.entity';
import moment from 'moment';
// import  AssetVariation  from './entities/assetVariation.entity';
import AssetVariation from '@models/Masterdata/AssetVariation';
import { AssetVariationId, BulkAssetVarInput, UpsertAssetVariationInput } from './dto/assetVariation.input';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import Asset from '@models/Masterdata/Asset';
import { AssetVarPaginatorArg } from './dto/assetVariation.args';
import { calculateSkip } from '@/services/pagination.service';
import { isEmpty } from 'class-validator';
var ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class AssetVariationService {
  async upsert(upsertInput: UpsertAssetVariationInput): Promise<AssetVariationEnt> {
    let savedData;

    if (upsertInput._id) {
      savedData = await AssetVariation.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {

      savedData = new AssetVariation({
        serialNo: upsertInput.serialNo,
        propertyCode: upsertInput.propertyCode,
        model: upsertInput.model,
        asset: upsertInput.asset,
        cost: upsertInput.cost,
        condition: upsertInput.condition,
        ipms: upsertInput.ipms,
        description: upsertInput.description,
        deployedDate: upsertInput.deployedDate,
        supplier: upsertInput.supplier,
        manufacturer: upsertInput.manufacturer,
      });

      await savedData.save();

      await Asset.findOneAndUpdate(
        { _id: upsertInput.asset },
        { $push: { assetVariation: savedData._id } },
        { new: true },
      );

    }

    return savedData;
  }

  async delete(upsertInput: AssetVariationId): Promise<AssetVariationEnt> {
    let removedData = await AssetVariation.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async archive(upsertInput: UpsertAssetVariationInput): Promise<AssetVariationEnt> {
    let savedData = await AssetVariation.findOneAndUpdate(
      { _id: upsertInput._id },
      { $set: { isArchived: upsertInput.isArchived } },
      { new: true },
    );

    return savedData;
  }

  async findAll(payload: AssetVarPaginatorArg) {

    let filter = {}
    let assVarCount = 0
    if (payload.searchArg) {
      filter = AssetVarFilter(payload)
    }

    filter = {
      $and: [
        filter,
        { asset: new ObjectId(payload.asset) },
        { isArchived: { $ne: true } }
      ]
    }

    assVarCount = await AssetVariation.countDocuments(filter)
    const assetData = await Asset.findOne({ _id: new ObjectId(payload.asset) })

    const assetVariation: AssetVariationEnt[] = await AssetVariation.find(filter, {}, { skip: calculateSkip(payload.page, payload.perPage), limit: payload.perPage })
      .populate({ path: "manufacturer", model: "Manufacturer" })
      .populate({ path: "supplier", model: "Supplier" })
      .sort({ model: 1, })
      ;


    return {
      data: assetVariation,
      assetData: assetData,
      paginatorInfo: paginate(
        assVarCount,
        payload.page,
        payload.perPage,
        assVarCount,
      ),
    };
  }


  async bulkInsert(upsertInput: BulkAssetVarInput): Promise<boolean> {

    let result = await AssetVariation.insertMany(upsertInput.assetVariations)

    if (!isEmpty(result)) {
      return true;
    } else {
      return false;
    }


  }

  async findOne(payload: SpecObjectArgs) {
    const assetVariation: AssetVariationEnt = await AssetVariation.findOne({ _id: payload.id })
      .populate("manufacturer")
      .populate("supplier")
      .populate("asset");
    return {
      data: assetVariation
    };
  }
}


function AssetVarFilter({ searchArg }: AssetVarPaginatorArg) {
  var nameRegex = new RegExp(searchArg.description);
  let filter = {}

  if (searchArg.description) {
    filter = {
      $and: [
        {
          $or: [
            { serialNo: { $regex: nameRegex, $options: 'i' } },
            { propertyCode: { $regex: nameRegex, $options: 'i' } },
            { model: { $regex: nameRegex, $options: 'i' } },
          ]
        },
        { isArchived: { $ne: true } }
      ]
    }
  }
  return filter
}
