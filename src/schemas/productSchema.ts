import { SchemaFactory, Schema, Prop} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

@Schema()

export class Product {
    @Prop({required: true})
    name: String;
    
    @Prop({required: true})
    price: Number;

    @Prop({required: true, default: 0})
    amount: Number
}

export const ProductSchema = SchemaFactory.createForClass(Product);