import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { AssetEnt } from './entities/asset.entity';
import moment from 'moment';
// import  Asset  from './entities/asset.entity';
import Asset from '@models/Masterdata/Asset';
import { AssetId, BulkAssetInput, BulkAssetVarUpdateInput, UpsertAssetInput } from './dto/asset.input';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import { AssetPaginatorArg, AssSearchArgs, BulkAsset } from './dto/asset.args';
import { isEmpty } from 'class-validator';
import { calculateSkip } from '@/services/pagination.service';
var ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class AssetService {
  async upsert(upsertInput: UpsertAssetInput): Promise<AssetEnt> {
    let savedData;
    let handleDeptstrObj = null

    if (upsertInput.handlingDepartment && upsertInput.handlingDepartment.length > 0) {
      handleDeptstrObj = upsertInput.handlingDepartment.map((ob) => {
        let newObj = new ObjectId(ob)
        return newObj
      })
    }

    if (upsertInput._id) {

      if (handleDeptstrObj && handleDeptstrObj.length > 0) {
        upsertInput.handlingDepartment = handleDeptstrObj
      }

      savedData = await Asset.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {

      savedData = new Asset({
        name: upsertInput.name,
        description: upsertInput.description,
        prefix: upsertInput.prefix,
        count: upsertInput.count,
        model: upsertInput.model,
        handlingDepartment: handleDeptstrObj
      });
      await savedData.save();
    }

    return savedData;
  }

  async updateVariations(upsertInput: BulkAssetVarUpdateInput): Promise<Boolean> {
    let savedData;
    if (upsertInput.assets) {

      await upsertInput.assets.map(async (item) => {

        let strObj = item.assetVariation.map((ob) => {
          let newObj = new ObjectId(ob)
          return newObj
        })



        await Asset.findOneAndUpdate(
          { _id: item._id },
          { $set: { assetVariation: strObj } },
          { new: true },
        );
      })


    }
    return true
  }


  async updateAssetBiomed(upsertInput: BulkAssetVarUpdateInput): Promise<Boolean> {
    // let biomedId = new ObjectId("63803b16ac3c830d315ba1cd")

    // await Asset.updateMany(
    //   {},
    //   { $set: { handlingDepartment: [biomedId] } }
    // );
    return true
  }



  async delete(upsertInput: AssetId): Promise<AssetEnt> {
    let removedData = await Asset.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll(payload: AssetPaginatorArg) {

    let filter = {}
    let assCount = 0
    if (payload.searchArg) {
      filter = AssetFilter(payload)
    }
    assCount = await Asset.countDocuments(filter)


    // const asset: AssetEnt[] = await Asset.find(filter, {}, { skip: calculateSkip(payload.page, payload.perPage), limit: payload.perPage })
    //   .sort({ name: 1, })
    //   ;

    const assetRaw: AssetEnt[] = await Asset.aggregate(
      [
        { $match: filter },
        { $sort: { name: 1 } },
        { $skip: calculateSkip(payload.page, payload.perPage) },
        { $limit: payload.perPage },
        {
          $project: {
            name: 1,
            description: 1,
            model: 1,
            prefix: 1,
            count: 1,
            handlingDepartment: 1
            // systemCount: {$size: {
            //   "$filter": {
            //       "input": "$assetVariation",
            //       "as": "assvar",
            //       "cond": { "$ne": [ "$$assvar.isArchived", true] }
            //   }
            // }
            // }
            // systemCount: {$size: "$assetVariation"}
          }
        }
      ])



    const assetPop: AssetEnt[] = await Asset.populate(assetRaw,
      [
        { path: "handlingDepartment", model: "Department" },]

    )

    return {
      data: assetPop,
      paginatorInfo: paginate(
        assCount,
        payload.page,
        payload.perPage,
        assCount,
      ),
    };
  }

  async allAsset(payload: AssetPaginatorArg) {

    const asset: AssetEnt[] = await Asset.find();

    return {
      data: asset,
      paginatorInfo: paginate(
        0,
        payload.page,
        payload.perPage,
        0,
      ),
    };
  }

  async findOne(payload: SpecObjectArgs) {
    const asset: AssetEnt = await Asset.findOne({ _id: payload.id })
      .populate({ path: "assetVariation", populate: { path: "manufacturer", model: "Manufacturer" } })
      .populate({ path: "handlingDepartment", model: "Department" });

    return {
      data: asset,
    };
  }

  async extractAssVar() {
    const asset: AssetEnt[] = await Asset.aggregate([
      {
        $match: {}
      },
      {
        $project: {
          _id: 1,
        }
      },
      {
        $lookup: {
          "from": "assetvariations",
          "localField": "_id",
          "foreignField": "asset",
          "as": "assetVariations"
        }
      },
      { $unwind: { path: "$assetVariations", "preserveNullAndEmptyArrays": true } },
      {
        $group: {
          _id: "$_id",
          assetVariation: { $addToSet: { _id: "$assetVariations._id", } }
        }
      }
    ])

    return {
      data: asset,
    };
  }

  async bulkInsert(upsertInput: BulkAssetInput): Promise<boolean> {

    let result = await Asset.insertMany(upsertInput.assets)

    if (!isEmpty(result)) {
      return true;
    } else {
      return false;
    }


  }

  async searchAll({ text }: AssSearchArgs) {

    var nameRegex = new RegExp(text);
    let asset: AssetEnt[] = []
    if (!isEmpty(text)) {
      asset = await Asset.find({
        $or: [
          { name: { $regex: nameRegex, $options: 'i' } },
          { description: { $regex: nameRegex, $options: 'i' } },
          { model: { $regex: nameRegex, $options: 'i' } },
        ]
      });
    }
    return {
      data: asset,
      paginatorInfo: paginate(
        asset.length,
        1,
        1,
        asset.length,
      ),
    };
  }



}


function AssetFilter({ searchArg }: AssetPaginatorArg) {
  var nameRegex = new RegExp(searchArg.description);
  let filter = {}

  if (searchArg.description) {
    filter = {
      $or: [
        { name: { $regex: nameRegex, $options: 'i' } },
        { description: { $regex: nameRegex, $options: 'i' } },
        { model: { $regex: nameRegex, $options: 'i' } },
      ]
    }
  }
  return filter
}

