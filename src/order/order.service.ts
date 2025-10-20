import { Injectable, Req } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/schemas/orderSchema';
import { Model } from 'mongoose';
import { Card, CardDocument, CardSchema } from 'src/schemas/card.schema';
import type { Request } from 'express';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  @InjectModel(Card.name) private cardModel: Model<CardDocument>
){}
  async create(createOrderDto: CreateOrderDto, user) {
    console.log(user)
    if(!user.haveCard) return {success: false, message: "You Do Not Have A Card To Buy Product/s"}
    if(!createOrderDto){
      return {success: false, message: "You do not have products to create order"}
    }
    const products = createOrderDto
    const Price = products.products.map((prodeuct)=> +prodeuct.price + 0)
    console.log(Price)

    const totalPrice = (): number=>{
      let price = 0
      for( let i =0 ; i< Price.length; i++) price+= Price[i]

      return price

    }
    const order = {...products, userid: user._id, userName: user.name, totalPrice: totalPrice() }


    console.log(order);
    try{
      const newOrder = await this.orderModel.create(order);
      const userCard= await this.cardModel.findOne({userid: user._id});
      const totalPrice = newOrder?.totalPrice;
      const availableBalance = userCard?.availableBalance; 
      if(typeof availableBalance !== "number") return { success: false, message: " The Available Balance Should Be A Number"}
      if(totalPrice > availableBalance){
        return { success: false, message: " You Do Not Have Enough Money To Afford This Order"}
      }
      const Balance = availableBalance - totalPrice;
      const cardAfterPaying = await this.cardModel.findByIdAndUpdate({_id: userCard?._id}, { availableBalance: Balance},  {new: true})
      return {success: true, newOrder, cardAfterPaying}
      
    }
    catch(err){
      return { success: false, error: true, err}
    }
  
  }

  async findAll( user ) {

    const  id = user._id;
    try {
      const orders = await this.orderModel.find({userid: id});
      if(orders.length){
        return {success: true, message: "Here Are all Your Orders", orders}
      }
      return { success: false, message: "There Is No Order Yet"}
    }
    catch(err){
      return {success: false, error: true, err}
    }

  }


}
