import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('PollCandidatesInputType', { isAbstract: true })
@ObjectType()
export class PollCandidateInputEnt {
  _id?: string;
  user?: string;
  votes?: PollVoteInputEnt;
  isWinner?: boolean;
  customVoteCount?: number;
  candidateId?: string;
  thumbnail?: string;
}


@InputType('PollVotesInputType', { isAbstract: true })
@ObjectType()
export class PollVoteInputEnt {
  user?: string;
  count?: number
}




@ObjectType()
export class PollCandidateEnt  extends CoreEntityMg{
  user?: UserEntAB;
  votes?: PollVoteEnt;
  isWinner?: boolean;
  customVoteCount?: number;
  thumbnail?: string;
}



@ObjectType()
export class PollVoteEnt {
  user: string;
  count?: number
}
