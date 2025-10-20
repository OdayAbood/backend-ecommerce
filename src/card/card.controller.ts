import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Roles, roles } from 'src/decoraters/roles.decorater';
import { CheckAuth } from 'src/guards/checkAuth.guard';
import type { Request } from 'express';
import { BADFLAGS } from 'dns';
@Controller('card')
@Roles(roles.admin, roles.user)
@UseGuards(CheckAuth)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto, @Req() req: Request ) {
    const user =req["user"];
    return this.cardService.create(createCardDto, user);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }

  @Get()
  getCard(@Req() req: Request){
    const user = req["user"]
    return this.cardService.getCard(user)
  }

  @Post('/taransation/:id')
  transate(@Body() balance, @Param('id') id: string,@Req() req: Request){
    const user =req["user"];
    console.log(typeof balance, " From the Controlleer")

    return this.cardService.transacte(id, user, balance);
  }

}
