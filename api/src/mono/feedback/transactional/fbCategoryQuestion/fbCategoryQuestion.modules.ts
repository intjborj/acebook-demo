import { Module } from '@nestjs/common';
import { FbCategoryQuestionResolver } from './fbCategoryQuestion.resolvers';
import { FbCategoryQuestionService } from './fbCategoryQuestion.service';

@Module({
  providers: [FbCategoryQuestionResolver, FbCategoryQuestionService]
})
export class FbCategoryQuestionModule {}

