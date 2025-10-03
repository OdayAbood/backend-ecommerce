export class CreateUserDTO {
    firstname: String;
    lastname: String;
    email: String;
    password: String
}

export class UserSigninDTO {
    email: String;
    password: String;
}