import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import type { Request } from 'express';
import { CheckAuth } from 'src/guards/checkAuth.guard';

@Controller('order')
@UseGuards(CheckAuth)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {

    const user = req["user"]
    console.log(user)
    
    return this.orderService.create(createOrderDto, user);
  }

  @Get()
  findAll(@Req()  req: Request) {
    const user = req["user"]
    return this.orderService.findAll(user);
  }

}
