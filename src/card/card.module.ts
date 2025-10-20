import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from 'src/schemas/card.schema';
import { User, UserSchema } from 'src/schemas/userSchema';
import { Fund, FundSchema } from 'src/schemas/fund.schema';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports : [
    MongooseModule.forFeature([{name: Card.name, schema: CardSchema}, {name: User.name, schema: UserSchema}, { name: Fund.name, schema: FundSchema}])
  ]
})
export class CardModule {}
