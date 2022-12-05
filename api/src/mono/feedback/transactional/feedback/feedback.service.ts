import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { FeedbackEnt } from './entities/feedback.entity';
import moment from 'moment';
// import  Feedback  from './entities/feedback.entity';
import Feedback from '@models/Feedback/Transactional/Feedback';
import {   FeedbackId, UpsertFeedbackInput } from './dto/feedback.input';
import { PaginationArgs } from '@/common/dto/pagination.args';

@Injectable()
export class FeedbackService {
  async upsert(upsertInput: UpsertFeedbackInput): Promise<FeedbackEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await Feedback.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {

      let payload : any= {
        category: upsertInput.category,
        feedback: upsertInput.feedback,
      }

      if(upsertInput.remarks){
        payload.remarks = upsertInput.remarks
      }

      savedData = new Feedback(payload);
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: FeedbackId): Promise<FeedbackEnt> {
    let removedData = await Feedback.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const feedback: FeedbackEnt[] = await Feedback.find()
    .populate('category')
    .populate({ path: 'feedback.question',  model: 'FBQuestion' })
    ;
    return {
      data: feedback,
      paginatorInfo: paginate(
        feedback.length,
        page,
        first,
        feedback.length,
      ),
    };
  }
}
