import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';
import { SignInInput } from './dto/signInUser.dto';
import { SignUpInput } from './dto/signUpUser.dto';
import { compare, hash } from 'bcryptjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private database: DatabaseProvider,
    private authService: AuthService,
  ) {}

  async signUpUser(data: SignUpInput) {
    const doUserExists = await this.database.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (doUserExists) throw new ConflictException('User already exists');

    const hashedPassword = await hash(data.password, 9);

    const userData = this.database.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const newUser = await this.database.userRepository.save(userData);

    delete newUser.password;

    return newUser;
  }

  async signInUser(data: SignInInput) {
    const user = await this.database.userRepository.findOne({
      where: {
        email: data.email,
      },
      select: {
        password: true,
        id: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Incorrect email or password1');
    }

    const isPasswordvalid = await compare(data.password, user.password);

    if (!isPasswordvalid) {
      throw new BadRequestException('Incorrect email or password2');
    }

    return await this.authService.generateJWT(user);
  }
}
