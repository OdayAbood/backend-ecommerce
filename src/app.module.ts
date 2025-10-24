import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CheckAuthMware } from './middleware/auth.middleware/checkAuth.mware';


import { JwtModule } from '@nestjs/jwt';
import { JwtFunction } from './JWT/jwt.function';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CardModule } from './card/card.module';
import { FundModule } from './fund/fund.module';


@Module({
  controllers: [AppController],
  providers: [AppService, JwtFunction],
  imports: [UserModule,ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: ".env"
      }) ,MongooseModule.forRoot(`mongodb://localhost:27017/ecommerceStore`), JwtModule.register({
    secret: process.env.SECRET_JWT_TOKEN ,
    signOptions: {expiresIn: "1h"}
  }), ProductModule, OrderModule, CardModule, FundModule, ],
  exports:[JwtFunction]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckAuthMware).forRoutes("/");
  }
}
