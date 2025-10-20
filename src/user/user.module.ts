import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/userSchema';
import { JwtFunction } from 'src/JWT/jwt.function';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ MongooseModule.forFeature([{name: User.name, schema: UserSchema }]), 
  ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env"
       }),
  JwtModule.register({
    secret: process.env.SECRET_JWT_TOKEN,
    signOptions: {expiresIn: "1h"}
  })
  
],
  exports:[MongooseModule],
  providers: [UserService, JwtFunction],
  controllers: [UserController]
})
export class UserModule {}
