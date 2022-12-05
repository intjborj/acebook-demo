import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { FbQuestionEnt } from './entities/fbQuestion.entity';
import moment from 'moment';
// import  FbQuestion  from './entities/fbQuestion.entity';
import FbQuestion from '@models/Feedback/Masterdata/Question';
import { FbQuestionId, UpsertFbQuestionInput } from './dto/fbQuestion.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { UpsertFbCategoryQuestionInput } from '../../transactional/fbCategoryQuestion/dto/fbCategoryQuestion.input';
import { QuestionInpt } from '../../transactional/fbCategoryQuestion/entities/fbCategoryQuestion.entity';
var ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class FbQuestionService {
  async upsert(upsertInput: UpsertFbQuestionInput): Promise<FbQuestionEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await FbQuestion.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new FbQuestion({
        question: upsertInput.question,
        description: upsertInput.description,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: FbQuestionId): Promise<FbQuestionEnt> {
    let removedData = await FbQuestion.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const fbQuestion: FbQuestionEnt[] = await FbQuestion.find();
    return {
      data: fbQuestion,
      paginatorInfo: paginate(
        fbQuestion.length,
        page,
        first,
        fbQuestion.length,
      ),
    };
  }
}


export async function saveQuestion(upsertInput: UpsertFbCategoryQuestionInput) {

  let ques = []
  if (upsertInput.questions) {
    upsertInput.questions.map(async (item: QuestionInpt) => {
      if (item._id) {
        ques.push(new ObjectId(item._id))
      } else {
        let savedDataQs = new FbQuestion({
          question: item.question,
          description: '',
        });
        ques.push(savedDataQs._id)
        await savedDataQs.save();
      }
    })
  }

  return ques


}
