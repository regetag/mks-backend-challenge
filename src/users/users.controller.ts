import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInInput } from './dto/signInUser.dto';
import { SignUpInput } from './dto/signUpUser.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  @HttpCode(201)
  async signUpUser(@Body() data: SignUpInput) {
    const newUser = await this.usersService.signUpUser(data);
    return newUser;
  }

  @Post('/signin')
  async signInUser(@Body() data: SignInInput) {
    const token = await this.usersService.signInUser(data);
    return { token };
  }
}
