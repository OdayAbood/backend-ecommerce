import * as mongoose from 'mongoose'

export class CreateTaskDTO {
    userId: string;
    category: string;
    content: string
}