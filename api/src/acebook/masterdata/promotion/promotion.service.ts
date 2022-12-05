import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { PromotionEnt } from './entities/promotion.entity';
import moment from 'moment';
// import  Promotion  from './entities/promotion.entity';
import Promotion from '@models/Masterdata/Promotion';
import {   PromotionId, UpsertPromotionInput } from './dto/promotion.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { PromotionPaginator } from './dto/promotion.args';

@Injectable()
export class PromotionService {
  async upsert(upsertInput: UpsertPromotionInput): Promise<PromotionPaginator> {
    let savedData : PromotionEnt[];
    if (upsertInput._id) {
      savedData = await Promotion.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      // savedData = new Promotion({
      //   path: upsertInput.path,
      // });
      // await savedData.save();
      savedData = await Promotion.insertMany(upsertInput.paths)
    }

    return {
      data:savedData,
      
    };
  }

  async delete(upsertInput: PromotionId): Promise<PromotionEnt> {
    let removedData = await Promotion.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const promotion: PromotionEnt[] = await Promotion.find();
    return {
      data: promotion,
      paginatorInfo: paginate(
        promotion.length,
        page,
        first,
        promotion.length,
      ),
    };
  }
}
