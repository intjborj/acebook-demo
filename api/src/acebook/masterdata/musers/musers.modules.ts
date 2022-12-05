import { Module } from '@nestjs/common';
import { MusersResolver } from './musers.resolvers';
import { MuserService } from './musers.service';

@Module({
  providers: [MusersResolver, MuserService]
})
export class MuserModule {}

