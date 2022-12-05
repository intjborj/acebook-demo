import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import { ManufacturerService } from './manufacturer.service';
import { BulkManucturer, ManufacturerId, UpsertManufacturerInput } from './dto/manufacturer.input';
import { AssManufacturerData, AssManufacturerPaginator, BulkManufacturerData } from './dto/manufacturer.args';
import { ManufacturerEnt } from './entities/manufacturer.entity';

@Resolver(() => ManufacturerEnt)
export class ManufacturerResolver {
  constructor(private readonly manufacturerService: ManufacturerService) { }

  @Mutation(() => ManufacturerEnt)
  async upsertManufacturer(
    @Args('input') upsertInput: UpsertManufacturerInput,
  ): Promise<ManufacturerEnt> {

    return this.manufacturerService.upsert(upsertInput);
  }

  @Mutation(() => ManufacturerEnt)
  async deleteManufacturer(
    @Args('input') deleteInput: ManufacturerId,
  ): Promise<ManufacturerEnt> {

    return this.manufacturerService.delete(deleteInput);
  }

  @Mutation(() => Boolean)
  async manufacturerBulkInsert(
    @Args('input') upsertInput: BulkManucturer,
  ): Promise<Boolean> {

    return this.manufacturerService.bulkInsert(upsertInput);
  }


  @Query(() => AssManufacturerPaginator, { name: 'assManufacturers' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.manufacturerService.findAll(getArgs);
  }

  @Query(() => AssManufacturerData, { name: 'assManufacturer' })
  getManufacturer(@Args() getArgs: SpecObjectArgs) {
    return this.manufacturerService.findOne(getArgs);
  }




}
