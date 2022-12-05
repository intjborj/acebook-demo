import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';


import { UsersModule } from './users/users.module';
import { ProductsModule } from './template/products/products.module';
import { OrdersModule } from './template/orders/orders.module';
import { SettingsModule } from './template/settings/settings.module';
import { CouponsModule } from './template/coupons/coupons.module';
import { CategoriesModule } from './template/categories/categories.module';
import { AttributesModule } from './template/attributes/attributes.module';
import { AddressesModule } from './template/addresses/addresses.module';
import { ShopsModule } from './template/shops/shops.module';
import { TypesModule } from './types/types.module';
import { TagsModule } from './template/tags/tags.module';
import { UploadsModule } from './uploads/uploads.module';
// import { CommonModule } from './common/common.module';
import { WithdrawsModule } from './template/withdraws/withdraws.module';
import { TaxesModule } from './template/taxes/taxes.module';
import { ShippingsModule } from './template/shippings/shippings.module';
import { AnalyticsModule } from './template/analytics/analytics.module';
import { ImportsModule } from './imports/imports.module';
import { WalletsModule } from './template/wallets/wallets.module';
import { RefundsModule } from './template/refunds/refunds.module';
import { AuthorsModule } from './template/authors/authors.module';
import { ManufacturersModule } from './template/manufacturers/manufacturers.module';
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
import { CompConfigModule } from './acebook/masterdata/companyConfiguration/compConfig.modules';
import { PollDetailsModule } from './mono/investors/pollDetails/pollDetails.modules';
import { MailModule } from './util/mailer/mailer.module';
import { NotificationModule } from './acebook/transactional/notification/notification.modules';
import { PingPongResolvers } from './pingpong/ping-pong.resolvers';
import { RestrictionModule } from './acebook/masterdata/restriction/restriction.modules';

import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { WorkDetailModule } from './acebook/transactional/workDetail/workDetail.modules';
import { AccConfigModule } from './acebook/masterdata/accountConfiguration/accConfig.modules';
import { PromotionModule } from './acebook/masterdata/promotion/promotion.modules';
import { ManufacturerModule } from './acebook/masterdata/manufacturer/manufacturer.modules';
import { AssetModule } from './acebook/masterdata/asset/asset.modules';
import { AssetVariationModule } from './acebook/masterdata/assetVariation/assetVariation.modules';
import { SupplierModule } from './acebook/masterdata/supplier/supplier.modules';
// import { SmSNotifService } from './acebook/transactional/notification/services/smsNotifService';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      // playground: true,
      playground: false,
      // introspection:  process.env.SYS_ENV == 'production' ? false : true,
      plugins: process.env.SYS_ENV == 'production' ? [] : [ApolloServerPluginLandingPageLocalDefault()]
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
    RestrictionModule,
    WorkDetailModule,
    PromotionModule,
    ManufacturerModule,
    AssetModule,
    AssetVariationModule,
    SupplierModule,


    // === FEEDBACK ===
    FbCategoryModule,
    FbQuestionModule,
    FbCategoryQuestionModule,
    FeedbackModule,


    // === Investors ===
    PollDetailsModule,


    // === Configuration
    CompConfigModule,
    AccConfigModule,

    // utilities
    MailModule,
    NotificationModule,

    // SmSNotifService



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
