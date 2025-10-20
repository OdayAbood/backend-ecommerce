import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { Fund, FundDocument } from 'src/schemas/fund.schema';
import { Card, CardDocument } from 'src/schemas/card.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FundService {
  constructor( @InjectModel(Fund.name) private fundModel: Model<FundDocument>,
  @InjectModel(Card.name) private cardModel: Model<CardDocument>
){}
  async create(createFundDto: CreateFundDto, user) {
    const { fund } = createFundDto;
    if(!fund || fund <= 0){
      return { success: false, message: "The Fund Need To Be Exist"};
    }
    if(!user.haveCard) return { success: false, message: " you do not have a card to add fund"}
    try{
      const card = await this.cardModel.findOne({userid: user._id});
      const cardid = card?._id;
      const availableBalance = card?.availableBalance
      const newFund = await this.fundModel.create({fund, cardid});
      if(newFund){
        try{
          const balance = newFund.fund;
          if(typeof availableBalance !== 'number') return { success: false, message: "Some Error Happen"}
          const card = await this.cardModel.findByIdAndUpdate({_id: cardid}, {availableBalance: balance + availableBalance}, {new: true})
          if(card) {
            const fund = await this.fundModel.findByIdAndUpdate({_id: newFund._id}, {status: "Completed" }, { new: true})
            return { success: true, message: "your fund add it to your card", fund, card}
          }
        }
        catch(err){
          return { success: false, error: true, err}
        }
      }

    
    }
    catch(err){
      return { success: false, error: true, err}
    }
  }

  async findAll(user) {
    try{
      const card  = await this.cardModel.findOne({userid: user._id})
    if(!card) return { success: false, message: " You Do Not Have A Card"}
    const funds = await this.fundModel.find({cardid: card._id, deleted: false})
    if(funds.length === 0) return { success: false, message: "You Do Not Do Asking For Any Funds"}
    return { success: true, message: " Here IS All Your Funds", funds}
    }
    catch(err){
      return { success: false, error: true, err}
    }
    
  }

  async remove(id: string) {
    try {
      const fund = await this.fundModel.findByIdAndUpdate({_id: id}, {deleted: true}, { new: true})
      if(!fund) return { success: false, message: `There Is Fund Match With This Id: ${id}`}
      return { success: true, message: " The Fund Delet it Correctly", fund}
    }
     catch(err){
      return { success: false, error: true, err}
     }
  }
}
