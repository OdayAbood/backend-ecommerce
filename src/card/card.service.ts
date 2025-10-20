import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from 'src/schemas/card.schema';
import { User, UserDocumnet } from 'src/schemas/userSchema';
import { Fund, FundDocument } from 'src/schemas/fund.schema';

@Injectable()
export class CardService {
  constructor( @InjectModel( Card.name ) 
  private cardModel: Model<CardDocument>,
  @InjectModel(User.name) 
  private userModel: Model<UserDocumnet>,
  @InjectModel(Fund.name) private fundModel: Model<FundDocument>
){}

  async create(createCardDto: CreateCardDto, user) {

    const { password, secretKey, pinCard}= createCardDto;
    console.log(createCardDto)
    if(!password || !secretKey || !pinCard){
      return { success: false, message: "All Fields Are Required"}
    }
    try {
      if(user.haveCard) return { success: false, message: "The User Is Already Have A Card"}
      const userid = user._id;
      const newCard = {password, secretKey, pinCard, userid};
      const card: Card = await this.cardModel.create(newCard);
      const newUser = await this.userModel.findByIdAndUpdate({_id: userid}, {haveCard: true}, {new: true});
      if(card) return { success: true, message: " Your Crad Created Successfuly", card, newUser}

    }
    catch(err){
      return { success: false, error: true, err}
    }
  }

  async findOne(id: string) {
    return `This action returns a #${id} card`;
  }

  async getCard(user){
    try { 
      const card = await this.cardModel.findOne({userid: user._id});
      if(!card) return { success: false, message: " You Do Not Have A Card"}
      return { success: true, message: "Here IS Your Card", card}
    }
    catch(err){
      return  { success: false, error: true, err}
    }
  }
  async transacte(id: string, user, balance){
    if(balance <= 0) return { success: false, message: "The Amount Should Be Postive"}
    try{
      const senderCard = await this.cardModel.findOne({userid: user._id});
      const recieverCard = await this.cardModel.findById({_id: id});
      console.log(senderCard, recieverCard)
      if(!senderCard || !recieverCard) return { success: false, message: " Check The Id Of the Reciver Or The Sender"}
      const senderBalance = senderCard.availableBalance;
      const recieverBalance = recieverCard.availableBalance
      console.log("senderBalance: ", senderBalance, "balance: ", balance.balance, "----", senderBalance - balance.balance, typeof balance.balance)
      if(senderBalance < balance.balance) return { success: false, message: " You Do Not Have This Balance"}
      const sender = await this.cardModel.findByIdAndUpdate({_id: senderCard._id},  {availableBalance: senderBalance - balance.balance}, { new: true});
      const reciver = await this.cardModel.findByIdAndUpdate({_id: recieverCard._id},  {availableBalance: recieverBalance + balance.balance}, { new: true});
      console.log(reciver, sender)
      if( typeof sender === null || typeof reciver === null) return { success: false, message: " Some Thing Going Wrpong"}
      const senderFund = await this.fundModel.create({cardid: senderCard._id, fund: balance.balance, type: "sending transaction"})
      const reciverFund = await this.fundModel.create({cardid: recieverCard._id, fund: balance.balance, type: "reciving transaction"})
      console.log(senderFund, reciverFund)
      if(!senderFund || ! reciverFund) return { success: false, message: "The Transaction Have Being Failed"}
      return { success: true, message: "The Transaction Made It Correctly", sender, reciver, senderFund, reciverFund}
    }
    catch(err){
      return { success: false ,error: true, err}
    }
  }

}
