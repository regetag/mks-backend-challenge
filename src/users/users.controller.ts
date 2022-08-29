import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignInInput } from './dto/signInUser.dto';
import { SignUpInput } from './dto/signUpUser.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  @HttpCode(201)
  @ApiBadRequestResponse({
    description:
      'Returns a bad request when email, name or password is invalid.',
  })
  @ApiConflictResponse({
    description: 'Returns a conflict when email is already registered.',
  })
  @ApiCreatedResponse({
    description: 'Returns a created when successfuly create a user.',
  })
  async signUpUser(@Body() data: SignUpInput) {
    const newUser = await this.usersService.signUpUser(data);
    return newUser;
  }

  @Post('/signin')
  @ApiBadRequestResponse({
    description: 'Returns a bad request when email or password is invalid.',
  })
  @ApiOkResponse({
    description: 'Retuns a ok when credentials is validated with success.',
  })
  async signInUser(@Body() data: SignInInput) {
    const token = await this.usersService.signInUser(data);
    return { token };
  }
}
