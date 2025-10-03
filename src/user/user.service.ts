import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDTO, UserSigninDTO } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<User | string | {succed : Boolean , message: String , data?: any} > {
    const { firstname, lastname, email, password } = createUserDto;

    if (!firstname || !lastname || !email || !password) {
      return 'All Fields Are Required';
    }
    if(password.length <6 ){
      return 'Password Should be More Than 6 Characters'
    }
    try {
      const isUserExist = await this.userModel.findOne({email});
      if(isUserExist){
        return ({succed : false , message: "This Is Already In Use So Go And Signin"})
      }
      else {
      const newUser = new this.userModel(createUserDto);
      await newUser.save();
      return newUser;
      }
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
  
  async findAll(): Promise<User[] | String>{
    try{
      const users = await this.userModel.find()
      if(!users.length){
        return "There Is No User Yet"
      }
      return users
    }
    catch(err){
      return err
    }
  }

  async signinUser(user: UserSigninDTO): Promise<any>{
    if(!user || !user.email || !user.password){
      return "All Fields Are Required";
    }
    try{
      const isUserExist = await this.userModel.findOne({email: user.email})
      if(!isUserExist){
        return "This User Is Not Exist Go And SignUp"
      }
      else {
        let match: boolean = false ;

        if(user.password === isUserExist.password){
          match = true ;
          console.log(match);
        }
        if(match){
          console.log("The match os true")
            const token = this.jwtService.sign({ id: isUserExist._id, email: isUserExist.email });
            console.log("Generated Token:", token);
             return { token }

          // console.log(token, match);
          }
        else {
          return "Maybe The Password Or Email Is Not Vaild";
        }
      }
    }
    catch(err){
      return err
    }
  }

}
