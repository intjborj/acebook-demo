import { Module } from '@nestjs/common';
import { RestrictionResolver } from './restriction.resolvers';
import { RestrictionService } from './restriction.service';

@Module({
  providers: [RestrictionResolver, RestrictionService]
})
export class RestrictionModule {}

