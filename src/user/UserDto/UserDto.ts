export class CreateUserDto{
    name: string;
    email: string;
    password: string; 
}

export class SignUserDto{
    name?: string;
    email: string;
    password: string;
}