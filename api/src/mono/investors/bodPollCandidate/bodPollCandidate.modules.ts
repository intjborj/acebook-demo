import { Module } from '@nestjs/common';
import { BodPollCandidateResolver } from './bodPollCandidate.resolvers';
import { BodPollCandidateService } from './bodPollCandidate.service';

@Module({
  providers: [BodPollCandidateResolver, BodPollCandidateService]
})
export class BodPollCandidateModule {}

