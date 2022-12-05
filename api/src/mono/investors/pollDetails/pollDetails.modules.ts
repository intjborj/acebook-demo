import { Module } from '@nestjs/common';
import { PollDetailsResolver } from './pollDetails.resolvers';
import { PollDetailsService } from './pollDetails.service';

@Module({
  providers: [PollDetailsResolver, PollDetailsService]
})
export class PollDetailsModule {}

