import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import mongoose from 'mongoose';


require('dotenv').config();
const MONGODB = process.env.DATABASE_URL;
const MONGODB_DEV = process.env.DATABASE_URL_DEV;

async function bootstrap() {
  mongoose
    .connect(process.env.NODE_ENV === 'production'  ? MONGODB : MONGODB_DEV)
    .then( async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors();
      app.useGlobalPipes(new ValidationPipe());
      app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
      await app.listen(4000);
      console.log(`Application is running on: ${await app.getUrl()}`);
    })
    .then((res) => {});
}
bootstrap();


// async function bootstrap() {
//   mongoose
//     .connect("mongodb+srv://jackyse:hghghfgd@cluster0.lzcbm.mongodb.net/acebook3?retryWrites=true&w=majority")
//     .then( async () => {
//       const app = await NestFactory.create(AppModule);
//       app.enableCors();
//       app.useGlobalPipes(new ValidationPipe());
//       app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
//       await app.listen(4000);
//       console.log(`Application is running on: ${await app.getUrl()}`);
//     })
//     .then((res) => {});
// }
// bootstrap();
