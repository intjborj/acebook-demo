import { Module } from '@nestjs/common';
import { CustomTagResolver } from './customTag.resolvers';
import { CustomTagService } from './customTag.service';

@Module({
  providers: [CustomTagResolver, CustomTagService]
})
export class CustomTagModule {}

