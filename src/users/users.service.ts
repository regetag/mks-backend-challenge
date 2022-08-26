import { ConflictException, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database.provider';
import { CreateUserInput } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private database: Database) {}

  async createUser(data: CreateUserInput) {
    const doUserExists = await this.database.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (doUserExists) throw new ConflictException('User already exists');

    const newUser = this.database.userRepository.create(data);

    return await this.database.userRepository.save(newUser);
  }
}
