import {Schema , Prop , SchemaFactory} from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({timestamps: true})
export class User{
    @Prop({required: true})
    firstname: String

    @Prop({required: true})
    lastname: String

    @Prop({required:true , unique:true})
    email: String

    @Prop({required: true , minLength: 6})
    password: String
}

export const UserSchema = SchemaFactory.createForClass(User)