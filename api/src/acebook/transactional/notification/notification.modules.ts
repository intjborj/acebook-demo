import { Module } from '@nestjs/common';
import { NotificationResolver, PubSubNotif } from './notification.resolvers';
import { NotificationService } from './notification.service';
import { PubSub } from 'graphql-subscriptions';
// import { SmSNotifService } from './services/smsNotifService';
// import {HttpService } from '@nestjs/common';
@Module({
  // imports: [PubSubNotif],
  providers: [NotificationResolver, NotificationService, {
    provide: 'PUB_SUB',
    useValue: PubSubNotif,
    // useValue: new PubSub(),
  }
  ]
})
export class NotificationModule { }

