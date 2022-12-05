import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { PostEnt } from './entities/post.entity';
import moment from 'moment';
// import  Post  from './entities/post.entity';
import Post from '@models/Transactionals/Posts';
import ReactionIconDetails from '@models/Documents/ReactionIconDetails';
import { PostArchive, PostId, PostReactions, UpsertPostInput } from './dto/post.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { PostPaginatorArg } from './dto/post.args';
import { AttachmentService, saveMultiAttachments } from '../attachment/attachment.service';
import { UpsertAttachmentInput } from '../attachment/dto/attachment.input';
import { Console } from 'console';
import { NotificationService } from '../notification/notification.service';
import { PubSubNotif } from '../notification/notification.resolvers';
import { NOTIF_COUNT_EN } from '@/acebook/constants/qgl_subscriptions/publishers';
import { CommentEnt } from '../comment/entities/comment.entity';
import Comment from '@models/Transactionals/Comments';
import { postObjectFilters } from './services/postObjectFilter';
import { calculateSkip } from '@/services/pagination.service';

var ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class PostService {


  constructor(private readonly notificationService: NotificationService) { }

  async upsert(upsertInput: UpsertPostInput): Promise<PostEnt> {
    let savedData;
    if (upsertInput._id) {

      let prevData = await Post.findOne({ _id: upsertInput._id })
      

      savedData =  updatePost(upsertInput)

      let convertTagDepts = []
      if (upsertInput.taggedDepartments && upsertInput.taggedDepartments.length > 0) {
        convertTagDepts = upsertInput.taggedDepartments.map((ob) => {
          let newObj = new ObjectId(ob)
          return newObj
        })
      }
   
      if (JSON.stringify(prevData?.taggedDepartments) != JSON.stringify(convertTagDepts)) {
     
        this.notificationService.notifier({
          type: "department",
          departments: upsertInput.taggedDepartments,
          message: upsertInput.content,
          userId: upsertInput.createdBy,
          fromUserId: upsertInput.createdBy,
          entId: upsertInput._id as string
        })
      }

    } else {
      savedData = createPost(upsertInput)
      let awSaved = await savedData

      this.notificationService.notifier({
        type: "department",
        departments: upsertInput.taggedDepartments,
        message: upsertInput.content,
        userId: upsertInput.createdBy,
        fromUserId: upsertInput.createdBy,
        entId: awSaved._id
      })
      // user: udataAw.firstName+' '+ udataAw.lastName
      // notifDepartment({departments: upsertInput.taggedDepartments})


    }
    return savedData;
  }

  async delete(upsertInput: PostId): Promise<PostEnt> {
    let removedData = await Post.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async archivePost(upsertInput: PostArchive): Promise<PostEnt> {
    let savedData = await Post.findOneAndUpdate(
      { _id: upsertInput._id },
      { $set: { isArchived: upsertInput.isArchived } },
      { new: true },
    );

    return savedData;
  }

  async reactPost(upsertInput: PostReactions): Promise<PostEnt> {

    let reactIconId = new ObjectId(upsertInput.reactions.reactionIcon)

    if (upsertInput.reactions.reactionName) {
      let iconDet = await ReactionIconDetails.findOne({ name: upsertInput.reactions.reactionName })
      reactIconId = iconDet?._id

    }


    let payload = {
      user: new ObjectId(upsertInput.reactions.user),
      reactionIcon: reactIconId
    }

    let savedData = await Post.findOneAndUpdate(
      { _id: upsertInput._id },
      { $push: { reactions: payload } },
      { new: true },
    );

    return savedData;
  }

  async removeReactPost(upsertInput: PostReactions): Promise<PostEnt> {
    let savedData = await Post.findOneAndUpdate(
      { _id: upsertInput._id },
      { $pull: { reactions: { user: new ObjectId(upsertInput.reactions.user) } } },
      { multi: true },
    );

    return savedData;
  }


  async findAll(payload: PostPaginatorArg) {
    let filters = postObjectFilters(payload as PostPaginatorArg);
    let post: PostEnt[] = [];
    let counter: number = 0;
    let limit = payload.perPage ?? 3;
    let curPage = payload.skip / limit;

    if (filters) {
      counter = await Post.countDocuments(filters);


      post = await Post.aggregate(
        [
          { $match: filters },
          { $sort: { created_at: -1 } },
          { $skip: calculateSkip(payload.page, payload.perPage) },
          { $limit: payload.perPage },
          {
            $project: {
              content: 1,
              created_at: 1,
              updated_at: 1,
              privacy: 1,
              isArchived: 1,
              attachments: 1,
              comments: 1,
              reactions: 1,
              sharedPost: 1,
              createdBy: 1,
              createdByDepartment: 1,
              taggedDepartments: 1,
              taggedUsers: 1,
              customTags: 1,
              ticket: 1,
              reactionCount: { $size: "$reactions" },
              userReacted: {
                $filter: {
                  input: "$reactions",
                  as: "reaction",
                  cond: { $eq: ["$$reaction.user", new ObjectId(payload.user)] },
                  // in: {
                  //   user: '$$reaction.user',
                  //   reactionIcon: '$$reaction.reactionIcon',
                  // }
                }
              }
            }
          },


        ]);


      post = await Post.populate(post,
        [{ path: "createdByDepartment", model: "Department" },
        { path: "taggedDepartments", model: "Department" },
        { path: "attachments", model: "Attachment" },
        { path: "ticket", model: "Ticket" },
        { path: 'createdBy', model: 'MUser', populate: { path: 'departmentOnDuty', model: 'Department' } },
        {
          path: 'comments', model: 'Comment',
          options: { limit: 3, sort: { created_at: -1 } },
          populate: { path: 'user', model: 'MUser' },
          match: { isArchived: { $ne: true } }
        },
        { path: 'reactions.user', model: 'MUser' },
          //  { path: 'reactions.reactionIcon', model: 'ReactionIconDetails' },
        ]
      );




      // post = await Post.find(filters, {}, { skip: calculateSkip(payload.page, payload.perPage), limit: payload.perPage })
      //   .populate('createdByDepartment')
      //   .populate('taggedDepartments')
      //   .populate('attachments')
      //   .populate('ticket')
      //   .populate({ path: 'createdBy', populate: { path: 'departmentOnDuty', model: 'Department' } })
      //   .populate({
      //     path: 'comments', model: 'Comment',
      //     options: { limit: 3, sort: { created_at: -1 } },
      //     populate: { path: 'user', model: 'MUser' }
      //   })
      //   .sort({ created_at: -1, })
      //   ;
    }



    return {
      data: post,
      // paginatorInfo: {
      //   count: counter,
      //   currentPage: curPage,
      //   perPage: limit
      // }
      paginatorInfo: paginate(
        counter,
        payload.page,
        payload.perPage,
        counter,
      ),
    };
  }


  async findOne(payload: PostPaginatorArg) {

    let filters = postObjectFilters(payload as PostPaginatorArg);
    let post: PostEnt[] = [];

    // const post = await Post.findOne(filters)
    //   .populate({ path: 'createdBy', populate: { path: 'departmentOnDuty', model: 'Department' } })
    //   .populate('createdByDepartment')
    //   .populate('taggedDepartments')
    //   .populate('attachments')
    //   .populate('ticket');

    if (filters) {

      post = await Post.aggregate(
        [
          { $match: { _id: new ObjectId(payload._id) } },
          { $limit: 1 },
          {
            $project: {
              content: 1,
              created_at: 1,
              updated_at: 1,
              privacy: 1,
              isArchived: 1,
              attachments: 1,
              comments: 1,
              reactions: 1,
              sharedPost: 1,
              createdBy: 1,
              createdByDepartment: 1,
              taggedDepartments: 1,
              taggedUsers: 1,
              customTags: 1,
              ticket: 1,
              reactionCount: { $size: "$reactions" },
              userReacted: {
                $filter: {
                  input: "$reactions",
                  as: "reaction",
                  cond: { $eq: ["$$reaction.user", new ObjectId(payload.user)] },
                  // in: {
                  //   user: '$$reaction.user',
                  //   reactionIcon: '$$reaction.reactionIcon',
                  // }
                }
              }
            }
          },


        ]);

      post = await Post.populate(post,
        [{ path: "createdByDepartment", model: "Department" },
        { path: "taggedDepartments", model: "Department" },
        { path: "attachments", model: "Attachment" },
        { path: "ticket", model: "Ticket" },
        { path: 'createdBy', model: 'MUser', populate: { path: 'departmentOnDuty', model: 'Department' } },
        {
          path: 'comments', model: 'Comment',
          options: { limit: 3, sort: { created_at: -1 } },
          populate: { path: 'user', model: 'MUser' }
        },
        { path: 'reactions.user', model: 'MUser' },
        { path: 'reactions.reactionIcon', model: 'ReactionIconDetails' },
          //  { path: 'reactions.reactionIcon', model: 'ReactionIconDetails' },
        ]
      );

    }


    return {
      // data: post,
      data: post[0],
    }

  }

}




async function createPost(upsertInput: UpsertPostInput) {
  let savedData;
  let allAttachments = []
  if (upsertInput.attachments) {
    allAttachments = saveMultiAttachments({
      attachments: upsertInput.attachments,
      user: upsertInput.createdBy
    })
  }

  savedData = new Post({
    content: upsertInput.content,
    privacy: upsertInput.privacy,
    createdBy: upsertInput.createdBy,
    createdByDepartment: upsertInput.createdByDepartment,
    taggedDepartments: upsertInput.taggedDepartments,
    attachments: allAttachments
  });
  await savedData.save();

  return savedData
}


async function updatePost(upsertInput: UpsertPostInput) {

  let savedData
  let allAttachments = []

  // REMOVE THE EXISTING ATTACHMENT FIRST

  if (upsertInput.attachments) {
    allAttachments = saveMultiAttachments({
      attachments: upsertInput.attachments,
      user: upsertInput.createdBy
    })
  }

  let payload = {
    content: upsertInput.content,
    privacy: upsertInput.privacy,
    taggedDepartments: upsertInput.taggedDepartments,
    attachments: allAttachments
  }

  savedData = await Post.findOneAndUpdate(
    { _id: upsertInput._id },
    { $set: payload },
    { new: true },
  );

  await savedData.save();

  return savedData
}
