import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserInput } from './dto/createUser.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  @HttpCode(201)
  async createUser(@Body() data: CreateUserInput) {
    const newUser = await this.usersService.createUser(data);
    return newUser;
  }
}
