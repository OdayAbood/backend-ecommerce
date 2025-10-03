import { Module, MiddlewareConsumer, NestModule, UseInterceptors } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import {PopularIntercpter} from "./interceptors/popularIntercepter"
import {PopularMiddleWare} from "./middleWare/popularMiddleware"


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal : true,
    envFilePath : '.env'
  }) , MongooseModule.forRoot(`${process.env.MONGODB_URI}`), UserModule, TaskModule,
] ,
  controllers: [AppController],
  providers: [AppService],
})
@UseInterceptors(PopularIntercpter)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PopularMiddleWare).forRoutes("/")
  }
}
