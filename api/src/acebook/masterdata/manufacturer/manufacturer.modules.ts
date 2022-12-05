import { Module } from '@nestjs/common';
import { ManufacturerResolver } from './manufacturer.resolvers';
import { ManufacturerService } from './manufacturer.service';

@Module({
  providers: [ManufacturerResolver, ManufacturerService]
})
export class ManufacturerModule {}

