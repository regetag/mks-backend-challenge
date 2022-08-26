import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Database } from '../database/database.provider';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, Database],
})
export class MoviesModule {}
