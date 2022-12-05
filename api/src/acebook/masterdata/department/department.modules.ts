import { Module } from '@nestjs/common';
import { DepartmentResolver } from './department.resolvers';
import { DepartmentService } from './department.service';

@Module({
  providers: [DepartmentResolver, DepartmentService]
})
export class DepartmentModule {}

