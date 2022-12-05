import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolvers';
import { PostService } from './post.service';
import { PubSub } from 'graphql-subscriptions';
import { NotificationService } from '../notification/notification.service';
import { NotificationResolver } from '../notification/notification.resolvers';

@Module({
  providers: [PostResolver, PostService, {
    provide: 'PUB_SUB',
    useValue: new PubSub(),
  }, NotificationService, NotificationResolver]
})
export class PostModule {}

