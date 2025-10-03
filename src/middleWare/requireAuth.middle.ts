import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, Request, NextFunction } from "express";
import {User, UserDocument} from "../schemas/user.schema"
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()

export class RequireAuth implements NestMiddleware {
   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
     use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}