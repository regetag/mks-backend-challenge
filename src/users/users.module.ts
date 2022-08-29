import { Module } from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, DatabaseProvider],
})
export class UsersModule {}
