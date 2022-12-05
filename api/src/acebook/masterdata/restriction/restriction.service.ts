import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { RestrictionEnt } from './entities/restriction.entity';
import moment from 'moment';
// import  Restriction  from './entities/restriction.entity';
import Restriction from '@models/Masterdata/restriction';
import {   RestrictionId, UpsertRestrictionInput } from './dto/restriction.input';
import { PaginationArgs } from '@/common/dto/pagination.args';

@Injectable()
export class RestrictionService {
  async upsert(upsertInput: UpsertRestrictionInput): Promise<RestrictionEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await Restriction.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new Restriction({
        name: upsertInput.code,
        code: upsertInput.code,
        path: upsertInput.path,
        type: upsertInput.type,
        description: upsertInput.description,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: RestrictionId): Promise<RestrictionEnt> {
    let removedData = await Restriction.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const restriction: RestrictionEnt[] = await Restriction.find();
    return {
      data: restriction,
      paginatorInfo: paginate(
        restriction.length,
        page,
        first,
        restriction.length,
      ),
    };
  }
}
