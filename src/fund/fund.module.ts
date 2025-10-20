import { Module } from '@nestjs/common';
import { FundService } from './fund.service';
import { FundController } from './fund.controller';
import { Card, CardSchema } from 'src/schemas/card.schema';
import { Fund, FundSchema } from 'src/schemas/fund.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  controllers: [FundController],
  providers: [FundService],
  imports: [MongooseModule.forFeature([{name: Card.name, schema: CardSchema},
     { name: Fund.name, schema: FundSchema}])]
})
export class FundModule {}
