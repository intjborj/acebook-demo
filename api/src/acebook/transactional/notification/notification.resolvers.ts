import { Resolver, Query, Mutation, Args, ID, Subscription } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { NotificationService } from './notification.service';
import { NotificationId, UpsertNotificationInput } from './dto/notification.input';
import { NotifArg, NotifCounterResp, NotifCounterSubsc, NotificationPaginator } from './dto/notification.args';
import { NotifCounterEnt, NotificationEnt } from './entities/notification.entity';
import { PubSubEngine } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { NOTIF_COUNT_EN } from '@/acebook/constants/qgl_subscriptions/publishers';
import { PubSub } from 'graphql-subscriptions';
import _ from 'lodash'
export const PubSubNotif = new PubSub()
var ObjectId = require('mongoose').Types.ObjectId;

@Resolver(() => NotificationEnt)
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    // @Inject('PUB_SUB') private pubSub: PubSubEngine
  ) { }
  // @Inject('PUB_SUB') private pubSub: PubSubEngine
  // constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) { }

  @Mutation(() => NotificationEnt)
  async upsertNotification(
    @Args('input') upsertInput: UpsertNotificationInput,
  ): Promise<NotificationEnt> {

    return this.notificationService.upsert(upsertInput);
  }

  @Mutation(() => NotificationEnt)
  async deleteNotification(
    @Args('input') deleteInput: NotificationId,
  ): Promise<NotificationEnt> {

    return this.notificationService.delete(deleteInput);
  }

  @Query(() => NotificationPaginator, { name: 'notifications' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.notificationService.findAll(getArgs);
  }

  @Query(() => NotificationPaginator, { name: 'notifSpec' })
  getByUser(@Args() getArgs: NotifArg) {
    return this.notificationService.findByUser(getArgs);
  }

  @Query(() => NotifCounterResp, { name: 'notificationCount' })
  notifCount(@Args() getArgs: NotifArg) {
    return this.notificationService.notifCounter(getArgs);
  }

  @Subscription(() => NotifCounterSubsc, {
    filter: (payload: any, variables: any) => { // payload: returned from mutation , variable: params pass from client subscription query
      

      let convertedToUserId = _.get(payload, "subscNotifCount.toUserId").map((item: any)=>{
        let toUserId = new ObjectId(item)

        return toUserId.toString()
      })
      
      let userId = new ObjectId(_.get(variables, "userId")) 
      
       
      return _.includes(convertedToUserId, userId.toString()  )  || 
      (
        _.get(payload, "subscNotifCount.departments") && 
      _.includes(_.get(payload, "subscNotifCount.departments"),  _.get(variables, "departmentId") ) 
      ) ; 
      
      // compare payload and variable object, if match true else false
     

    }
  })
  subscNotifCount(@Args() getArgs: NotifArg) {
    // console.log("notif")
    return PubSubNotif.asyncIterator(NOTIF_COUNT_EN);
    // return this.pubSub.asyncIterator(NOTIF_COUNT_EN);
  }




}
