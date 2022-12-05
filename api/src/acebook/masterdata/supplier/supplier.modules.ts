import { Module } from '@nestjs/common';
import { SupplierResolver } from './supplier.resolvers';
import { SupplierService } from './supplier.service';

@Module({
  providers: [SupplierResolver, SupplierService]
})
export class SupplierModule {}

