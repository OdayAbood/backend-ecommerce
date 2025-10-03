import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UserSigninDTO } from './dto/create-user.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post()
    create(@Body() user:CreateUserDTO){
        return this.userService.create(user);
    }
    @Get()
    findAll(){
        return this.userService.findAll()
    }
    @Post('signin')
    singinUser(@Body() user:UserSigninDTO){
        return this.userService.signinUser(user);
    }
}
