import { JwtService } from "@nestjs/jwt";
// import { User, UserDocumnet} from "../schemas/userSchema"
import { Injectable } from "@nestjs/common";
import type { Request } from "express";

@Injectable()

export class JwtFunction {
    constructor( private jwtService: JwtService){}

    verifyToken( token: string ){

        const data = this.jwtService.verify( token )

        console.log("The data from the check aut mware",data);

        const { id, name} = data;

        if(data){
            return { success: true, id, name }
        }
        else return { success: false };
    }

    createToken( data: {id: String | any, name: String}){
 
        const token = this.jwtService.sign({...data});

        console.log(token)

        return token ;
    }
}