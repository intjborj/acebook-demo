import { FbCategoryEnt } from '@/mono/feedback/masterdata/fbCategory/entities/fbCategory.entity';
import { FeedbackQAEnt, FeedbackQAInput } from '@/mono/feedback/referenceType/feedbackQA.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';


@ObjectType()
export class FeedbackEnt extends CoreEntityMg {
 remarks?: string;
 category: FbCategoryEnt;
 feedback: FeedbackQAEnt[]
}

@InputType('FeedbackInputType', { isAbstract: true })
@ObjectType()
export class FeedbackInput extends CoreEntityMg {
 remarks?: string;
 category: string;
 feedback: FeedbackQAInput[]
}
