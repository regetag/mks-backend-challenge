import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Movie } from './entities/Movies.entity';

@Injectable()
export class Database {
  constructor(private database: DataSource) {}

  public moviesRepositorie() {
    return this.database.getRepository(Movie);
  }
}
