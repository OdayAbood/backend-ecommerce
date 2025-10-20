import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocumnet, UserSchema } from 'src/schemas/userSchema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, SignUserDto } from './UserDto/UserDto';
import { JwtFunction } from 'src/JWT/jwt.function';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocumnet>,
    private jwtFunction: JwtFunction
){}

    async signUpUser(user: CreateUserDto){
        const { name, email, password} = user;

        if(!email || !password || !name){
            return { success: false, message: "All Fields Are Required"};
        }
        if(password.length < 6){
            return { success: false, message: "The Password Must Be At Least 6 Numbers"}
        }
        try{
            const userExist: User | null = await this.userModel.findOne({email});
            if(userExist?.email){
                return { success: false, message: "This Email Is Already In Use. GO And Signin "}
            }

            const newUser: User = await this.userModel.create({ name, email, password})

            return { success: true, message: "The User Created Correctly", user: newUser}
        }
        catch(err){
            return {success: false, error: true, err}
        }
    }

    async signInUser(user: SignUserDto){
        const { email, password} = user;

        if(!email || !password){
            return { success: false, message: "All Fields Are Required"}
        }

        try {
            const userExisit: User | null | any  = await this.userModel.findOne({email})

            if(!userExisit?.email){
                return { success: false, messgae: "This User Is Not Exist. Go And SignUp(Create Account)"}
            }
            
            let match: boolean = false;

            if(userExisit.password === password) match = true;

            if(match){
                 const token = this.jwtFunction.createToken({ id: userExisit._id, name: userExisit.email })
                return { success: true, message: "The User LoggedIn Suceessfully", token}
            }
            else {
                return { success: false, message: "The Password Is not Correct Try Another One"}
            }
        }
        catch(err){
            return {success: false, error: true, err, message: "We Have some rror here"}
        }
    }
}
