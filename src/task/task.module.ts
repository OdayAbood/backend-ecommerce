import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import {Task, TaskSchema} from '../schemas/task.schema'
import { CheckNumber} from "../middleWare/checkNumber"

@Module({
  imports : [MongooseModule.forFeature([{name: Task.name , schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckNumber).forRoutes("task/tasks")
  }
}
