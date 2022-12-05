import { Module } from '@nestjs/common';
import { CompConfigResolver } from './compConfig.resolvers';
import { CompConfigService } from './compConfig.service';

@Module({
  providers: [CompConfigResolver, CompConfigService]
})
export class CompConfigModule {}

