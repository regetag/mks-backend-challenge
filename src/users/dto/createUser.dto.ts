import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInput {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 24,
  })
  @Length(6, 24)
  password: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
  })
  @Length(1, 100)
  name: string;
}
