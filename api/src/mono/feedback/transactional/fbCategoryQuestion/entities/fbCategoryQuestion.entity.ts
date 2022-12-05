import { FbCategoryEnt, FbCategoryInpt } from '@/mono/feedback/masterdata/fbCategory/entities/fbCategory.entity';
import { FbQuestionEnt } from '@/mono/feedback/masterdata/fbQuestion/entities/fbQuestion.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('QuestionInputType', { isAbstract: true })
@ObjectType()
export class QuestionInpt {
  question: string;
  _id?: string | null;
}

@InputType('CategInputType', { isAbstract: true })
@ObjectType()
export class CategInpt {
  description: string;
  name: string;
}

@InputType('FbCategoryQuestionInputType', { isAbstract: true })
@ObjectType()
export class FbCategoryQuestionInput extends CoreEntityMg {
  category: FbCategoryInpt;
  categoryId?: string  ;
  questions: QuestionInpt[];
}

@InputType('FbCategoryQuestionInputType', { isAbstract: true })
@ObjectType()
export class FbCategoryQuestionEnt extends CoreEntityMg {
  category: FbCategoryEnt;
  questions: FbQuestionEnt[];
}





