import { Module } from '@nestjs/common';
import { FeedbackResolver } from './feedback.resolvers';
import { FeedbackService } from './feedback.service';

@Module({
  providers: [FeedbackResolver, FeedbackService]
})
export class FeedbackModule {}

