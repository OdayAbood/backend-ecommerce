import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { CreateUserDto, SignUserDto } from './UserDto/UserDto';
import { UserService } from './user.service';
import type { Response, Request } from 'express';


@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('/create-account')
    async signUpUser(@Body() user: CreateUserDto, @Res() res: Response){
        const result = await this.userService.signUpUser(user);

        if(!result.success){
            if(result?.error){
                return res.status(401).json(result);
            }
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    }

    @Post('/register')
    async signInUser(@Body() user: SignUserDto, @Res({passthrough: true}) res: Response, @Req() req: Request){
        const result = await this.userService.signInUser(user);

        if(!result.success){
            if(result.error){
                return res.status(400).json({result});
            }
            return res.status(401).json({result});
        }
     
        if(result.success){
            res.cookie("jwt", result.token, {maxAge: 3600000});
           
        }

        return res.status(200).json({result});
    }
}