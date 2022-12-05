import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { ReactionIconDetailEnt } from './entities/reactionIconDetail.entity';
import moment from 'moment';
// import  ReactionIconDetail  from './entities/reactionIconDetail.entity';
import ReactionIconDetail from '@models/Documents/ReactionIconDetails';
import {   ReactionIconDetailId, UpsertReactionIconDetailInput } from './dto/reactionIconDetail.input';
import { PaginationArgs } from '@/common/dto/pagination.args';

@Injectable()
export class ReactionIconDetailService {
  async upsert(upsertInput: UpsertReactionIconDetailInput): Promise<ReactionIconDetailEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await ReactionIconDetail.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new ReactionIconDetail({
        name: upsertInput.name,
        path: upsertInput.path,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: ReactionIconDetailId): Promise<ReactionIconDetailEnt> {
    let removedData = await ReactionIconDetail.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const reactionIconDetail: ReactionIconDetailEnt[] = await ReactionIconDetail.find();
    return {
      data: reactionIconDetail,
      paginatorInfo: paginate(
        reactionIconDetail.length,
        page,
        first,
        reactionIconDetail.length,
      ),
    };
  }
}
