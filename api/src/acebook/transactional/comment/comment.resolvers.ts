import { Resolver, Query, Mutation, Args,Subscription, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { CommentService } from './comment.service';
import { CommentId, UpsertCommentInput } from './dto/comment.input';
import { CommentPaginator, CommentPaginatorArg, CommentResponse} from './dto/comment.args';
import { CommentEnt } from './entities/comment.entity';
import { PubSub } from 'graphql-subscriptions';
import { COMMENTS_EN } from '@/acebook/constants/qgl_subscriptions/publishers';
import _ from 'lodash'
var ObjectId = require('mongoose').Types.ObjectId;
export const PubSubComments = new PubSub()

@Resolver(() => CommentEnt)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CommentEnt)
  async upsertComment(
    @Args('input') upsertInput: UpsertCommentInput,
  ): Promise<CommentEnt> {

    return this.commentService.upsert(upsertInput);
  }

 @Mutation(() => CommentEnt)
  async archiveComment(
    @Args('input') upsertInput: UpsertCommentInput,
  ): Promise<CommentEnt> {

    return this.commentService.archiveComment(upsertInput);
  }

  @Mutation(() => CommentEnt)
  async deleteComment(
    @Args('input') deleteInput: CommentId,
  ): Promise<CommentEnt> {

    return this.commentService.delete(deleteInput);
  }

  @Query(() => CommentPaginator, { name: 'comments' })
  getTags(@Args() getArgs: CommentPaginatorArg) {
    return this.commentService.findAll(getArgs);
  }

 @Query(() => CommentPaginator, { name: 'commentPreview' })
  getCommentPreview(@Args() getArgs: CommentPaginatorArg) {
    return this.commentService.findPreview(getArgs);
  }

 
  @Subscription(() => CommentEnt, {
    filter: (payload: any, variables: any) => { // payload: returned from mutation , variable: params pass from client subscription query

      let varPostId = new ObjectId(variables.postId)
      let varUserId = new ObjectId(variables.userId)
      
     return payload.subscComment.post.equals(varPostId) ; // compare payload and variable object, if match true else false
    //  return payload.subscComment.post.equals(varPostId) && payload.subscComment.user._id.equals(varUserId); // compare payload and variable object, if match true else false
      }
  })
  subscComment(@Args() getArgs: CommentPaginatorArg) {
    // console.log("notif")
    return PubSubComments.asyncIterator(COMMENTS_EN);
    // return this.pubSub.asyncIterator(NOTIF_COUNT_EN);
  }

 
}
