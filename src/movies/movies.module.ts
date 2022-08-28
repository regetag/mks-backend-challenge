import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { DatabaseProvider } from '../database/database.provider';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, DatabaseProvider],
})
export class MoviesModule {}
