import { Module } from '@nestjs/common';
import { AccConfigResolver } from './accConfig.resolvers';
import { AccConfigService } from './accConfig.service';

@Module({
  providers: [AccConfigResolver, AccConfigService]
})
export class AccConfigModule {}

