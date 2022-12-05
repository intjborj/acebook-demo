import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntityMg } from '@/common/entities/core.entity';
import { FbQuestionEnt } from '../masterdata/fbQuestion/entities/fbQuestion.entity';


@ObjectType()
export class FeedbackQAEnt extends CoreEntityMg {
  question: FbQuestionEnt;
  answer: string;
}


@InputType('FeedbackQAInputType', { isAbstract: true })
@ObjectType()
export class FeedbackQAInput extends CoreEntityMg {
  question: string;
  answer: string;
}


