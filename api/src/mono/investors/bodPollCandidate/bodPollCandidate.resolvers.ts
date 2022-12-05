import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { BodPollCandidateService } from './bodPollCandidate.service';
import { BodPollCandidateId, UpsertBodPollCandidateInput } from './dto/bodPollCandidate.input';
import { BodPollCandidatePaginator} from './dto/bodPollCandidate.args';
import { BodPollCandidateEnt } from './entities/bodPollCandidate.entity';

@Resolver(() => BodPollCandidateEnt)
export class BodPollCandidateResolver {
  constructor(private readonly bodPollCandidateService: BodPollCandidateService) {}

  @Mutation(() => BodPollCandidateEnt)
  async upsertBodPollCandidate(
    @Args('input') upsertInput: UpsertBodPollCandidateInput,
  ): Promise<BodPollCandidateEnt> {

    return this.bodPollCandidateService.upsert(upsertInput);
  }

  @Mutation(() => BodPollCandidateEnt)
  async deleteBodPollCandidate(
    @Args('input') deleteInput: BodPollCandidateId,
  ): Promise<BodPollCandidateEnt> {

    return this.bodPollCandidateService.delete(deleteInput);
  }

  @Query(() => BodPollCandidatePaginator, { name: 'bodPollCandidates' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.bodPollCandidateService.findAll(getArgs);
  }


  @Query(() => BodPollCandidatePaginator, { name: 'bodPollreports' })
  getBODPollReports(@Args() getArgs: PaginationArgs) {
    return this.bodPollCandidateService.findAll(getArgs);
  }

 

 
}
