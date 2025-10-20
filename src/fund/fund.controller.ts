import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FundService } from './fund.service';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { CheckAuth } from 'src/guards/checkAuth.guard';
import type { Request } from 'express';

@Controller('fund')
@UseGuards(CheckAuth)
export class FundController {
  constructor(private readonly fundService: FundService) {}

  @Post()
  create(@Body() createFundDto: CreateFundDto, @Req() req: Request) {
    const user = req["user"]
    return this.fundService.create(createFundDto, user);
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = req["user"]
    return this.fundService.findAll(user);
  }

  @Patch(':id')
  remove(@Param('id') id: string, @Body() updateFundDto: UpdateFundDto) {
    return this.fundService.remove(id);
  }

}
