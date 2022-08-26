import { Module } from '@nestjs/common';
import { Database } from '../database/database.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Database],
})
export class UsersModule {}
