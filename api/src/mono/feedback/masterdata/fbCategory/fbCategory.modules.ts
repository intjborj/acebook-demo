import { Module } from '@nestjs/common';
import { FbCategoryResolver } from './fbCategory.resolvers';
import { FbCategoryService } from './fbCategory.service';

@Module({
  providers: [FbCategoryResolver, FbCategoryService]
})
export class FbCategoryModule {}

