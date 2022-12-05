import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { CustomTagEnt } from './entities/customTag.entity';
import moment from 'moment';
// import  CustomTag  from './entities/customTag.entity';
import CustomTag from '@models/Masterdata/CustomTag';
import {   CustomTagId, UpsertCustomTagInput } from './dto/customTag.input';
import { PaginationArgs } from '@/common/dto/pagination.args';

@Injectable()
export class CustomTagService {
  async upsert(upsertInput: UpsertCustomTagInput): Promise<CustomTagEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await CustomTag.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new CustomTag({
        name: upsertInput.name,
        description: upsertInput.description,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: CustomTagId): Promise<CustomTagEnt> {
    let removedData = await CustomTag.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const customTag: CustomTagEnt[] = await CustomTag.find();
    return {
      data: customTag,
      paginatorInfo: paginate(
        customTag.length,
        page,
        first,
        customTag.length,
      ),
    };
  }
}
