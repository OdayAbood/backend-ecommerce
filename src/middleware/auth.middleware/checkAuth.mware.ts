import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, Request, NextFunction } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocumnet } from "src/schemas/userSchema";
import { Model } from "mongoose";
import { JwtFunction } from "src/JWT/jwt.function";

@Injectable()
export class CheckAuthMware implements NestMiddleware{
    constructor(@InjectModel( User.name) private readonly userModel: Model<UserDocumnet>,
    private jwtFunction: JwtFunction
){}
    async use( req: Request, res: Response, next: NextFunction){
        const jwt = req.cookies.jwt;

        if(jwt){
            const result = this.jwtFunction.verifyToken(jwt);
    
            console.log("Hello from The CheckAuthMiddleware")
            if(result.success){
                const currentUser = await this.userModel.findById({_id: result.id});
    
                
                
                req["user"] = currentUser;
    
            }
        }
        next();


    }
}