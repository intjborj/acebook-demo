import { Resolver, Query, Mutation, Args, ID, Subscription } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { PollDetailsService } from './pollDetails.service';
import { PollDetailsId, UpsertPollDetailsInput } from './dto/pollDetails.input';
import { PollDetailsPaginator, PollPaginatorArg, TotalVotes, VoteResultArg, VoteResultReturn } from './dto/pollDetails.args';
import { PollDetailsEnt, PollResultResp } from './entities/pollDetails.entity';
import { PubSub } from 'graphql-subscriptions';
import { BOD_POLL_DETAILS_EN, BOD_POLL_RESULT_EN } from '@/acebook/constants/qgl_subscriptions/publishers';
import { AccountPaginator, GetAccArgs } from '@/users/dto/get-users.args';
export const PubSubInvPollResult = new PubSub()
export const PubSubPollDetails = new PubSub()

@Resolver(() => PollDetailsEnt)
export class PollDetailsResolver {
  constructor(private readonly pollDetailsService: PollDetailsService) { }

  @Mutation(() => PollDetailsEnt)
  async upsertPollDetails(
    @Args('input') upsertInput: UpsertPollDetailsInput,
  ): Promise<PollDetailsEnt> {

    return this.pollDetailsService.upsert(upsertInput);
  }

  @Subscription(() => PollDetailsPaginator)
  subscPollDetails(@Args() getArgs: PollPaginatorArg) {
    return PubSubPollDetails.asyncIterator(BOD_POLL_DETAILS_EN);
  }



  @Mutation(() => PollDetailsEnt)
  async voting(
    @Args('input') upsertInput: UpsertPollDetailsInput,
  ): Promise<PollDetailsEnt> {

    return this.pollDetailsService.voting(upsertInput);
  }

  @Mutation(() => PollDetailsEnt)
  async deletePollDetails(
    @Args('input') deleteInput: PollDetailsId,
  ): Promise<PollDetailsEnt> {

    return this.pollDetailsService.delete(deleteInput);
  }

  @Query(() => PollDetailsPaginator, { name: 'pollDetails' })
  getTags(@Args() getArgs: PollPaginatorArg) {
    return this.pollDetailsService.findAll(getArgs);
  }

  @Query(() => VoteResultReturn, { name: 'voteResult' })
  getVoteResult(@Args() getArgs: VoteResultArg) {
    return this.pollDetailsService.viewVoteResults(getArgs);
  }

  @Query(() => PollDetailsPaginator, { name: 'pollCurrentTerm' })
  getCurrentTerm(@Args() getArgs: PollPaginatorArg) {
    return this.pollDetailsService.findCurrent(getArgs);
  }

  @Query(() => TotalVotes, { name: 'getTotalVotes' })
  getTotalVotes(@Args() getArgs: PollPaginatorArg) {
    return this.pollDetailsService.getTotalVotes(getArgs);
  }

  @Subscription(() => VoteResultReturn)
  subscBodPollResult(@Args() getArgs: VoteResultArg) {
    return PubSubInvPollResult.asyncIterator(BOD_POLL_RESULT_EN);
  }

  @Query(() => PollResultResp, { name: 'PollReport' })
  getPollReport(@Args() getArgs: GetAccArgs) {
    return this.pollDetailsService.getVoteReport(getArgs);
  }


}
