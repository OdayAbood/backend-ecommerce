import { SchemaFactory, Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Card } from "./card.schema";

export type FundDocument = HydratedDocument<Fund>

@Schema({timestamps: true})
export class Fund{
    @Prop({required: true, type: Types.ObjectId, ref: "cards"})
    cardid: Card

    @Prop({required: true})
    fund: number

    @Prop({required: true, default:"pending"})
    status: string

    @Prop({required: true, default: false})
    deleted: boolean

    @Prop({required: true, default: "reciver"})
    type: string
}

export const FundSchema = SchemaFactory.createForClass(Fund);