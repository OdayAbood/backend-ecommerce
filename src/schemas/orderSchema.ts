import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./userSchema";
import { Product } from "./productSchema"; 

export type OrderDocument = HydratedDocument<Order>

@Schema({timestamps: true})

export class Order{
    @Prop({required: true, type: mongoose.Types.ObjectId, ref: "users" })
    userid: User

    @Prop({required: true})
    userName: string

    @Prop({required: true})
    products: Product[]

    @Prop({required: true})
    totalPrice: number
} 

export const OrderSchema = SchemaFactory.createForClass(Order);