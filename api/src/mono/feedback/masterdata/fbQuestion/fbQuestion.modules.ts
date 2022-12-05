import { Module } from '@nestjs/common';
import { FbQuestionResolver } from './fbQuestion.resolvers';
import { FbQuestionService } from './fbQuestion.service';

@Module({
  providers: [FbQuestionResolver, FbQuestionService]
})
export class FbQuestionModule {}

