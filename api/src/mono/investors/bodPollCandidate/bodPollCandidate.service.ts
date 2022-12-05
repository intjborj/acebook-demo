import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { BodPollCandidateEnt } from './entities/bodPollCandidate.entity';
import moment from 'moment';
// import  BodPollCandidate  from './entities/bodPollCandidate.entity';
import BodPollCandidate from '@models/investor/transactional/BodPollCandidate';
import {   BodPollCandidateId, UpsertBodPollCandidateInput } from './dto/bodPollCandidate.input';
import { PaginationArgs } from '@/common/dto/pagination.args';

@Injectable()
export class BodPollCandidateService {
  async upsert(upsertInput: UpsertBodPollCandidateInput): Promise<BodPollCandidateEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await BodPollCandidate.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new BodPollCandidate({
        name: upsertInput.name,
        description: upsertInput.description,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: BodPollCandidateId): Promise<BodPollCandidateEnt> {
    let removedData = await BodPollCandidate.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const bodPollCandidate: BodPollCandidateEnt[] = await BodPollCandidate.find();
    return {
      data: bodPollCandidate,
      paginatorInfo: paginate(
        bodPollCandidate.length,
        page,
        first,
        bodPollCandidate.length,
      ),
    };
  }
}
