import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { PostService } from './post.service';
import { PostArchive, PostId, PostReactions, UpsertPostInput } from './dto/post.input';
import { PostData, PostPaginator, PostPaginatorArg } from './dto/post.args';
import { PostEnt } from './entities/post.entity';

import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import { NOTIF_COUNT_EN } from '@/acebook/constants/qgl_subscriptions/publishers';
import { PubSub } from 'graphql-subscriptions';
import { PubSubNotif } from '../notification/notification.resolvers';
import { NotifCounterEntSubs } from '../notification/entities/notification.entity';
// const pubsub = new PubSub()

@Resolver(() => PostEnt)
export class PostResolver {
  constructor(private readonly postService: PostService,
    // @Inject('PUB_SUB') private pubSub: PubSubEngine
  ) { }

  @Mutation(() => PostEnt)
  async upsertPost(
    @Args('input') upsertInput: UpsertPostInput,
  ): Promise<PostEnt> {
    let result = this.postService.upsert(upsertInput);

    // PubSubNotif.publish(NOTIF_COUNT_EN,
    //   {
    //     subscNotifCount: {
    //       notViewed: 500
    //     }
    //   }
    // );


    return result;
  }

  @Mutation(() => PostEnt)
  async archivePost(
    @Args('input') upsertInput: PostArchive,
  ): Promise<PostEnt> {
    let result = this.postService.archivePost(upsertInput);
    return result;
  }

  @Mutation(() => PostEnt)
  async reactPost(
    @Args('input') upsertInput: PostReactions,
  ): Promise<PostEnt> {
    let result = this.postService.reactPost(upsertInput);
    return result;
  }
  
  @Mutation(() => PostEnt)
  async removeReactPost(
    @Args('input') upsertInput: PostReactions,
  ): Promise<PostEnt> {
    let result = this.postService.removeReactPost(upsertInput);
    return result;
  }

  @Mutation(() => PostEnt)
  async deletePost(
    @Args('input') deleteInput: PostId,
  ): Promise<PostEnt> {

    return this.postService.delete(deleteInput);
  }

  // @Query(() => PostPaginator, { name: 'posts' })
  @Query(() => PostPaginator, { name: 'posts' })
  getTags(@Args() getArgs: PostPaginatorArg) {
    return this.postService.findAll(getArgs);
  }

  @Query(() => PostData, { name: 'post' })
  getSpecPost(@Args() getArgs: PostPaginatorArg) {
    return this.postService.findOne(getArgs);
  }




}
