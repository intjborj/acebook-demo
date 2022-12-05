import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';
import { PollCandidateEnt, PollCandidateInputEnt } from './pollCandidates.entity';
import { InvestorDetailsInput, UserEntAB } from '@/users/entities/user.entity';
import { BodPollCandidateEnt } from '../../bodPollCandidate/entities/bodPollCandidate.entity';


@ObjectType()
export class PollDetailsCommonEnt extends CoreEntityMg {
  period?: string;
  isCurrentTerm?: boolean;
  votingOpen?: boolean;
}

@InputType('PollDetailsInputType', { isAbstract: true })
@ObjectType()
export class PollDetailsEnt extends PollDetailsCommonEnt {
  userId?: string;
  candidates?: PollCandidateInputEnt[];
}


@ObjectType()
export class PollDetailsEntView extends PollDetailsCommonEnt {
  candidates?: PollCandidateEnt[];
}

@ObjectType()
export class PollResultResp {
  data: PollResultEnt[];
}


@ObjectType()
export class PollResultEnt {
  _id?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  investorDetails? : InvestorDetailsInput;
  candidates?: PollResultCandidates[];
  shares?: number;
  votesAvailable?: number;
}


@ObjectType()
export class PollResultCandidates {
  user?: UserEntAB;
  votes?: VoteUserCount[];
}

@ObjectType()
export class VoteUserCount {
  user?: string;
  count?: number;
}






