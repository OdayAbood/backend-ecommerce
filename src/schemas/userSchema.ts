import { HydratedDocument } from "mongoose";
import { SchemaFactory, Prop, Schema } from "@nestjs/mongoose";

export type UserDocumnet = HydratedDocument<User>

@Schema({timestamps: true})

export class User {
    @Prop({required: true})
    name: String

    @Prop({required: true, unique: true})
    email: String

    @Prop({required: true, minLength: 6})
    password: String

    @Prop({required: true, default: "user"})
    role: String

    @Prop({require: true, default: false})
    banded: Boolean

    @Prop({required: true, default:false})
    haveCard: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);