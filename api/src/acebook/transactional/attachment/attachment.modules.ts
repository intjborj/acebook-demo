import { Module } from '@nestjs/common';
import { AttachmentResolver } from './attachment.resolvers';
import { AttachmentService } from './attachment.service';

@Module({
  providers: [AttachmentResolver, AttachmentService]
})
export class AttachmentModule {}

