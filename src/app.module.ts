import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
