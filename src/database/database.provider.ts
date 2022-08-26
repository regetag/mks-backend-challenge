import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Movie } from './entities/Movies.entity';
import { User } from './entities/User.entity';

@Injectable()
export class Database {
  constructor(private database: DataSource) {
    this.moviesRepository = this.database.getRepository(Movie);
    this.userRepository = this.database.getRepository(User);
  }

  public moviesRepository: Repository<Movie>;
  public userRepository: Repository<User>;
}
