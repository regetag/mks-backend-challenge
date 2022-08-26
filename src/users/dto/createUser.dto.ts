import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserInput {
  @IsEmail()
  email: string;

  @Length(6, 24)
  password: string;

  @IsDefined()
  @IsString()
  name: string;
}
