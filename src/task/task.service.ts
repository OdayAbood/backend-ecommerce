import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/schemas/task.schema';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument> ){}

    async createTask(task: CreateTaskDTO): Promise<Task | String>{
        console.log(task)
        if(!task) return 'All Fields Are required'
        const {userId , category , content} = task;
        if(!userId || !category || !content){
            return 'All Fields Are required'
        }
        else {
            try {
                const newTask = new this.taskModel(task);
                await newTask.save();
                return newTask
            }
            catch(err){
                return err.message
            }
        }
    }

    async getAllTask(): Promise<Task[] | String>{
        try{
            const tasks = await this.taskModel.find()
            if(!tasks.length) return 'There Is No Task Yet'
            else return tasks
        }
        catch(err){
            return err
        }
    }
}
