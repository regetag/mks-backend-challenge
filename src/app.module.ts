import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, MoviesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
