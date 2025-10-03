import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from '../schemas/user.schema'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { UserService } from './user.service';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: ".env"
      }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
     JwtModule.register({
      secret: process.env.SECRET_JWT_TOKEN ,
      signOptions : {expiresIn:"1h"}
     })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
