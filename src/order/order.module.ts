import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/orderSchema';
import { Card, CardSchema } from 'src/schemas/card.schema';


@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}, { name:Card.name, schema: CardSchema}])]
})
export class OrderModule {}
