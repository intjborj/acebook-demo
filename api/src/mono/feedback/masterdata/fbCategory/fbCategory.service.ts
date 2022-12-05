import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { FbCategoryEnt } from './entities/fbCategory.entity';
import moment from 'moment';
// import  FbCategory  from './entities/fbCategory.entity';
import FbCategory from '@models/Feedback/Masterdata/Category';
import {   FbCategoryId, UpsertFbCategoryInput } from './dto/fbCategory.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { UpsertFbCategoryQuestionInput } from '../../transactional/fbCategoryQuestion/dto/fbCategoryQuestion.input';
var ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class FbCategoryService {
  async upsert(upsertInput: UpsertFbCategoryInput): Promise<FbCategoryEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await FbCategory.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new FbCategory({
        name: upsertInput.name,
        description: upsertInput.description,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: FbCategoryId): Promise<FbCategoryEnt> {
    let removedData = await FbCategory.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const fbCategory: FbCategoryEnt[] = await FbCategory.find();
    return {
      data: fbCategory,
      paginatorInfo: paginate(
        fbCategory.length,
        page,
        first,
        fbCategory.length,
      ),
    };
  }
}



export async function saveCategory(upsertInput: UpsertFbCategoryQuestionInput){

  let cat = null
     
      if (upsertInput.categoryId) {

        let savedDataCat =  await FbCategory.findOneAndUpdate(
          { _id: upsertInput.categoryId },
          {
            $set: {
              name: upsertInput.category.name,
              description: upsertInput.category.description,
              color: upsertInput.category.color,
              icon: upsertInput.category.icon
            }
          },
          { new: true },
        );
        await savedDataCat.save();
        cat = new ObjectId(upsertInput.categoryId) 


      } else {
        let savedDataCat = new FbCategory({
          name: upsertInput.category.name,
          description: upsertInput.category.description,
          color: upsertInput.category.color,
          icon: upsertInput.category.icon
        });
        await savedDataCat.save();

        cat = savedDataCat._id
      }

      return cat

}



