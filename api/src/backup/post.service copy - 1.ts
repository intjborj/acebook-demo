// import { Injectable } from '@nestjs/common';
// import { paginate } from '@/common/pagination/paginate';
// import { PostEnt } from './entities/post.entity';
// import moment from 'moment';
// // import  Post  from './entities/post.entity';
// import Post from '@models/Transactionals/Posts';
// import { PostId, UpsertPostInput } from './dto/post.input';
// import { PaginationArgs } from '@/common/dto/pagination.args';
// import { PostPaginatorArg } from './dto/post.args';
// import { AttachmentService, saveMultiAttachments } from '../attachment/attachment.service';
// import { UpsertAttachmentInput } from '../attachment/dto/attachment.input';
// import { Console } from 'console';
// import { NotificationService } from '../notification/notification.service';
// import { PubSubNotif } from '../notification/notification.resolvers';
// import { NOTIF_COUNT_EN } from '@/acebook/constants/qgl_subscriptions/publishers';
// import { CommentEnt } from '../comment/entities/comment.entity';
// import Comment from '@models/Transactionals/Comments';

// const objectFilters = (args: PostPaginatorArg) => {

//   if (args.departmentId && args.type == 'tags') {
//     return { taggedDepartments: args.departmentId }
//   }

//   if (args.departmentId && args.type == 'posts') {
//     return { createdByDepartment: args.departmentId }
//   }

//   if (args.privacy) {
//     // return {$or:[
//     //   {createdBy: args.user},
//     //   {privacy: 'OnlyMe'}
//     // ]

//     // }
//     let samp = {
//       $or: [
//         { createdByDepartment: args.departmentId },
//         { taggedDepartments: args.departmentId },
//         { createdBy: args.user },
//         { taggedUsers: args.user },
//         { privacy: 'Public' }
//       ]
//     }
//     return samp
//   }

//   if (args._id) {
//     return { _id: args._id }
//   }
//   return {}

// }


// @Injectable()
// export class PostService {


//   constructor(private readonly notificationService: NotificationService) { }

//   async upsert(upsertInput: UpsertPostInput): Promise<PostEnt> {
//     let savedData;
//     if (upsertInput._id) {
//       savedData = updatePost(upsertInput)
//     } else {
//       savedData = createPost(upsertInput)
//       let awSaved = await savedData

//       this.notificationService.notifier({
//         type: "department",
//         departments: upsertInput.taggedDepartments,
//         message: upsertInput.content,
//         userId: upsertInput.createdBy,
//         fromUserId: upsertInput.createdBy,
//         entId: awSaved._id
//       })
//       // user: udataAw.firstName+' '+ udataAw.lastName
//       // notifDepartment({departments: upsertInput.taggedDepartments})


//     }
//     return savedData;
//   }

//   async delete(upsertInput: PostId): Promise<PostEnt> {
//     let removedData = await Post.findOneAndDelete({
//       _id: upsertInput._id,
//     });

//     return removedData;
//   }


//   async findAll(payload: PostPaginatorArg) {
//     let filters = objectFilters(payload as PostPaginatorArg);

//     const counter = await Post.countDocuments(filters);
//     let limit = 3;

//     const post: PostEnt[] = await Post.find(filters)
//       .sort({ created_at: 'desc' })
//       .limit(limit)
//       .skip(payload.skip)
//       .populate({ path: 'createdBy', populate: { path: 'departmentOnDuty', model: 'Department' } })
//       .populate('createdByDepartment')
//       .populate('taggedDepartments')
//       .populate('attachments')
//       .populate({
//         path: 'comments', model: 'Comment',
//         options: { limit: 3, sort: { created_at: -1 } },
//         populate: { path: 'user', model: 'MUser' }
//       })
//       .populate('ticket');

//     let curPage = payload.skip / limit;

//     return {
//       data: post,
//       paginatorInfo: {
//         count: counter,
//         currentPage: curPage,
//         perPage: limit
//       }

//       // paginate(
//       //   post.length,
//       //   curPage,
//       //   limit,
//       //   counter,
//       // ),
//       //  paginatorInfo: paginate(
//       //   post.length,
//       //   page,
//       //   first,
//       //   post.length,
//       // ),
//     };
//   }


//   async findOne(payload: PostPaginatorArg) {
//     let filters = objectFilters(payload as PostPaginatorArg);
//     const post = await Post.findOne(filters)
//       .populate({ path: 'createdBy', populate: { path: 'departmentOnDuty', model: 'Department' } })
//       .populate('createdByDepartment')
//       .populate('taggedDepartments')
//       .populate('attachments')
//       .populate('ticket');

//     return {
//       data: post,
//     }

//   }

// }




// async function createPost(upsertInput: UpsertPostInput) {
//   let savedData;
//   let allAttachments = []
//   if (upsertInput.attachments) {
//     allAttachments = saveMultiAttachments({
//       attachments: upsertInput.attachments,
//       user: upsertInput.createdBy
//     })
//   }

//   savedData = new Post({
//     content: upsertInput.content,
//     privacy: upsertInput.privacy,
//     createdBy: upsertInput.createdBy,
//     createdByDepartment: upsertInput.createdByDepartment,
//     taggedDepartments: upsertInput.taggedDepartments,
//     attachments: allAttachments
//   });
//   await savedData.save();

//   return savedData
// }


// async function updatePost(upsertInput: UpsertPostInput) {

//   let savedData
//   let allAttachments = []

//   // REMOVE THE EXISTING ATTACHMENT FIRST

//   if (upsertInput.attachments) {
//     allAttachments = saveMultiAttachments({
//       attachments: upsertInput.attachments,
//       user: upsertInput.createdBy
//     })
//   }

//   let payload = {
//     content: upsertInput.content,
//     privacy: upsertInput.privacy,
//     taggedDepartments: upsertInput.taggedDepartments,
//     attachments: allAttachments
//   }

//   savedData = await Post.findOneAndUpdate(
//     { _id: upsertInput._id },
//     { $set: payload },
//     { new: true },
//   );

//   await savedData.save();

//   return savedData
// }
