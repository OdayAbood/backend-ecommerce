import {Schema , Prop , SchemaFactory} from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from './user.schema'

export type TaskDocument = HydratedDocument<Task>

@Schema({timestamps: true})
export class Task {
    @Prop({type: mongoose.Schema.Types.ObjectId , ref:"User"})
    userId: User

    @Prop({required : true})
    category: String

    @Prop({required: true})
    content: String
}

export const TaskSchema = SchemaFactory.createForClass(Task)

/*SchemaFactore use to convert the class to the mongooseSchema till mongo can understand 
 it and work with it and we use HydratedDocument to add mongoose property like(save, create)
 to the class */