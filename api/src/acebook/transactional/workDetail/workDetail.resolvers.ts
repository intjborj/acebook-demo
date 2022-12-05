import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import { WorkDetailService } from './workDetail.service';
import { WorkDetailId, UpsertWorkDetailInput } from './dto/workDetail.input';
import { GetWorkDetail, WorkDetailPaginator } from './dto/workDetail.args';
import { WorkDetailEnt, WorkDetailEntInput } from './entities/workDetail.entity';
import { workCodeGen } from './services/workCodeGenerator';
import { TicketPaginatorArg } from '../ticket/dto/ticket.args';

@Resolver(() => WorkDetailEnt)
export class WorkDetailResolver {
  constructor(private readonly workDetailService: WorkDetailService) { }

  @Mutation(() => WorkDetailEnt)
  async upsertWorkDetail(
    @Args('input') upsertInput: UpsertWorkDetailInput,
  ): Promise<WorkDetailEnt> {

    return this.workDetailService.upsert(upsertInput);
  }

  @Mutation(() => WorkDetailEnt)
  async upsertSubmissionDept(
    @Args('input') upsertInput: UpsertWorkDetailInput,
  ): Promise<WorkDetailEnt> {

    return this.workDetailService.upsertSubmissionDept(upsertInput);
  }

  @Mutation(() => WorkDetailEnt)
  async deleteWorkDetail(
    @Args('input') deleteInput: WorkDetailId,
  ): Promise<WorkDetailEnt> {

    return this.workDetailService.delete(deleteInput);
  }
  @Mutation(() => WorkDetailEnt)
  async archiveWorkDetail(
    @Args('input') upsertInput: UpsertWorkDetailInput,
  ): Promise<WorkDetailEnt> {

    return this.workDetailService.archive(upsertInput);
  }

  @Query(() => WorkDetailPaginator, { name: 'workDetails' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.workDetailService.findAll(getArgs);
  }

  @Query(() => WorkDetailPaginator, { name: 'workDetailReports' })
  getWorkReports(@Args() getArgs: TicketPaginatorArg) {
  // getWorkReports(@Args() getArgs: SpecObjectArgs) {
    return this.workDetailService.workReport(getArgs);
  }


  @Query(() => GetWorkDetail, { name: 'workDetail' })
  getWorkDet(@Args() getArgs: SpecObjectArgs) {
    return this.workDetailService.findOne(getArgs);
  }

  @Mutation(() => WorkDetailPaginator, { name: 'workDetailArchived' })
  getWorkDetArchived(@Args() getArgs: SpecObjectArgs) {
    return this.workDetailService.getArchived(getArgs);
  }




}
