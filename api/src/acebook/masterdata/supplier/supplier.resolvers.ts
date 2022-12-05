import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import { SupplierService } from './supplier.service';
import { BulkSupplier, SupplierId, UpsertSupplierInput } from './dto/supplier.input';
import { AssSupplierData, AssSupplierPaginator, BulkSupplierData } from './dto/supplier.args';
import { SupplierEnt } from './entities/supplier.entity';

@Resolver(() => SupplierEnt)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) { }

  @Mutation(() => SupplierEnt)
  async upsertSupplier(
    @Args('input') upsertInput: UpsertSupplierInput,
  ): Promise<SupplierEnt> {

    return this.supplierService.upsert(upsertInput);
  }

  @Mutation(() => SupplierEnt)
  async deleteSupplier(
    @Args('input') deleteInput: SupplierId,
  ): Promise<SupplierEnt> {

    return this.supplierService.delete(deleteInput);
  }

  @Mutation(() => Boolean)
  async supplierBulkInsert(
    @Args('input') upsertInput: BulkSupplier,
  ): Promise<Boolean> {

    return this.supplierService.bulkInsert(upsertInput);
  }


  @Query(() => AssSupplierPaginator, { name: 'assSuppliers' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.supplierService.findAll(getArgs);
  }

  @Query(() => AssSupplierData, { name: 'assSupplier' })
  getSupplier(@Args() getArgs: SpecObjectArgs) {
    return this.supplierService.findOne(getArgs);
  }




}
