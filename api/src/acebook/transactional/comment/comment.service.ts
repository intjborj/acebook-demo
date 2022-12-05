import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { CommentEnt } from './entities/comment.entity';
import moment from 'moment';
// import  Comment  from './entities/comment.entity';
import Comment from '@models/Transactionals/Comments';
import { CommentId, UpsertCommentInput } from './dto/comment.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { CommentPaginatorArg, CommentResponse } from './dto/comment.args';
import { NotificationService } from '../notification/notification.service';
import { PubSubComments } from './comment.resolvers';
import { COMMENTS_EN } from '@/acebook/constants/qgl_subscriptions/publishers';
import Post from '@models/Transactionals/Posts';
import { NotifMessageType } from '@/constants/notifications';
import { commentObjectFilter } from './services/commentObjectFilter';
var ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class CommentService {
  constructor(
    private readonly notificationService: NotificationService,
    // @Inject('PUB_SUB') private pubSub: PubSubEngine
  ) { }


  async upsert(upsertInput: UpsertCommentInput): Promise<CommentEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await Comment.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
     

      // Save comment
      savedData = new Comment({
        message: upsertInput.message,
        user: upsertInput.user,
        post: upsertInput.post,
        comments: upsertInput.comments
      });
    

      // Push on post
      await Post.findOneAndUpdate(
        { _id: upsertInput.post },
        { $push: { comments: savedData._id } },
        { new: true },
      );



      if (upsertInput.user !== upsertInput.postOwner) {
        this.notificationService.notifier({
          type: "comment",
          message: upsertInput.message,
          userId: upsertInput.postOwner,
          fromUserId: upsertInput.user, //the one who commented
          toUserId: upsertInput.postOwner, //the owner of the post
          entId: upsertInput.post,
          notifType: NotifMessageType.POST_COMMENT
        })
      }



      await savedData.save();

      publishComments(await savedData)
      // // let pubPayload = await savedData
      // PubSubComments.publish(COMMENTS_EN,
      //   {
      //     subscComment: "pubPayload"
      //   }
      // );

    }


    return savedData
  }

  async archiveComment(upsertInput: UpsertCommentInput): Promise<CommentEnt> {

    let savedData = await Comment.findOneAndUpdate(
      { _id: upsertInput._id },
      { $set: {isArchived: upsertInput.isArchived} },
      { new: true },
    );

    return savedData
  }

  async delete(upsertInput: CommentId): Promise<CommentEnt> {
    let removedData = await Comment.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  // async findAll({ page, first, postId }: CommentPaginatorArg) {
  async findAll(payload: CommentPaginatorArg) {
    let filter = commentObjectFilter(payload, "view")
    const comment: CommentEnt[] = await Comment.find(filter).populate('user');

    return {
      data: comment,
      paginatorInfo: paginate(
        comment.length,
        payload.page,
        payload.first,
        comment.length,
      ),
    };
  }

  async findPreview(payload: CommentPaginatorArg) {
    let filter = commentObjectFilter(payload, "view")
    const comment: CommentEnt[] = await Comment.find(filter)
    .limit(3)
    .sort({created_at: -1})
    .populate('user');

    return {
      data: comment,
      paginatorInfo: paginate(
        comment.length,
        payload.page,
        payload.first,
        comment.length,
      ),
    };
  }



}

async function publishComments(data: any) {
  let pubPayload = await data

  const comment: CommentEnt = await Comment.findOne({ _id: pubPayload._id }).populate('user');


  PubSubComments.publish(COMMENTS_EN,
    {
      subscComment: comment
    }
  );
}