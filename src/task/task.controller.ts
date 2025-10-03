import { Controller, Post, Body, Get, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';
import {GuardCheckNumber} from "../Guards/guardCheckNumber"
import {ResponseWrapperChechNumber} from "../interceptors/intercepterCheckNumber"
import {PopularIntercpter} from "../interceptors/popularIntercepter"
@Controller('task')
@UseGuards(GuardCheckNumber)
@UseInterceptors(ResponseWrapperChechNumber,PopularIntercpter)
export class TaskController {
    constructor(private readonly taskService:TaskService){}
    @Post()
    addOne(@Body() newTask:CreateTaskDTO){
        return this.taskService.createTask(newTask)
    }

    @Get('tasks')
    getAllTask(){
        return this.taskService.getAllTask()
    }

}
