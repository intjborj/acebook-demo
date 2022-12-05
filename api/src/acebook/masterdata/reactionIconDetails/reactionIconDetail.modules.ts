import { Module } from '@nestjs/common';
import { ReactionIconDetailResolver } from './reactionIconDetail.resolvers';
import { ReactionIconDetailService } from './reactionIconDetail.service';

@Module({
  providers: [ReactionIconDetailResolver, ReactionIconDetailService]
})
export class reactionIconDetailModule {}

