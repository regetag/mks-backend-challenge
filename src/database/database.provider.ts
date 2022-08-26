import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Movie } from './entities/Movies.entity';

@Injectable()
export class Database {
  constructor(private database: DataSource) {
    this.moviesRepository = this.database.getRepository(Movie);
  }

  public moviesRepository: Repository<Movie>;
}
