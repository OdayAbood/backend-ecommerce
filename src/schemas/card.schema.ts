import { HydratedDocument, Types } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./userSchema";

export type CardDocument = HydratedDocument<Card>

@Schema({timestamps: true})
export class Card {
    @Prop({required: true, type: Types.ObjectId, ref: "User" })
    userid: User

    @Prop({required: true})
    password: string
    
    @Prop({required: true})
    secretKey: string

    @Prop({required: true})
    pinCard: string

    @Prop({required: true, default: 0})
    availableBalance: number

}

export const CardSchema = SchemaFactory.createForClass(Card);