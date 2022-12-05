import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';


import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { SettingsModule } from './settings/settings.module';
import { CouponsModule } from './coupons/coupons.module';
import { CategoriesModule } from './categories/categories.module';
import { AttributesModule } from './attributes/attributes.module';
import { AddressesModule } from './template/addresses/addresses.module';
import { ShopsModule } from './shops/shops.module';
import { TypesModule } from './types/types.module';
import { TagsModule } from './tags/tags.module';
import { UploadsModule } from './uploads/uploads.module';
// import { CommonModule } from './common/common.module';
import { WithdrawsModule } from './withdraws/withdraws.module';
import { TaxesModule } from './taxes/taxes.module';
import { ShippingsModule } from './shippings/shippings.module';
import { AnalyticsModule } from './template/analytics/analytics.module';
import { ImportsModule } from './imports/imports.module';
import { WalletsModule } from './wallets/wallets.module';
import { RefundsModule } from './refunds/refunds.module';
import { AuthorsModule } from './authors/authors.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
// import { MuserModule } from './acebook/musers/musers.modules';
import { DepartmentModule } from './acebook/masterdata/department/department.modules';
import { CustomTagModule } from './acebook/masterdata/customTag/customTag.modules';
import { CommentModule } from './acebook/transactional/comment/comment.modules';
import { AttachmentModule } from './acebook/transactional/attachment/attachment.modules';
import { PostModule } from './acebook/transactional/post/post.modules';
import { TicketModule } from './acebook/transactional/ticket/ticket.modules';
import { TicketTypeModule } from './acebook/transactional/ticketType/ticketType.modules';
import { FbCategoryModule } from './mono/feedback/masterdata/fbCategory/fbCategory.modules';
import { FbQuestionModule } from './mono/feedback/masterdata/fbQuestion/fbQuestion.modules';
import { FbCategoryQuestionModule } from './mono/feedback/transactional/fbCategoryQuestion/fbCategoryQuestion.modules';
import { FeedbackModule } from './mono/feedback/transactional/feedback/feedback.modules';
import { NotificationModule } from './acebook/transactional/notification/notification.modules';
import { PingPongResolvers } from './pingpong/ping-pong.resolvers';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    SettingsModule,
    CouponsModule,
    CategoriesModule,
    AttributesModule,
    AddressesModule,
    ShopsModule,
    TypesModule,
    TagsModule,
    UploadsModule,
    // CommonModule,
    WithdrawsModule,
    TaxesModule,
    ShippingsModule,
    AnalyticsModule,
    ImportsModule,
    WalletsModule,
    RefundsModule,
    AuthorsModule,
    ManufacturersModule,
    
    // MuserModule,
    DepartmentModule,
    CustomTagModule,
    CommentModule,
    AttachmentModule,
    PostModule,
    TicketModule,
    TicketTypeModule,


    // === FEEDBACK ===
    FbCategoryModule,
    FbQuestionModule,
    FbCategoryQuestionModule,
    FeedbackModule,
    NotificationModule
  ],
  controllers: [],
  providers: [ 
    PingPongResolvers,
    {
    provide: 'PUB_SUB',
    useValue: new PubSub(),
  },],
})
export class AppModule {}
