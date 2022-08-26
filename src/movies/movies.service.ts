import { BadRequestException, Injectable } from '@nestjs/common';
import { Database } from '../database/database.provider';
import { CreateMovieInput } from './dto/createMovie.dto';

@Injectable()
export class MoviesService {
  constructor(private database: Database) {}

  public async createMovie(data: CreateMovieInput) {
    const movieAlreadyExists = await this.database.moviesRepository.findOne({
      where: {
        title: data.title,
      },
    });

    if (movieAlreadyExists) {
      throw new BadRequestException('Title already in use!');
    }

    const newMovie = this.database.moviesRepository.create({ ...data });

    return await this.database.moviesRepository.save(newMovie);
  }

  public async moviePagination(page: number) {
    const [movies, amount] = await this.database.moviesRepository.findAndCount({
      skip: page * 10,
      take: 10,
    });

    return {
      movies,
      maxPage: Math.trunc(amount / 10),
    };
  }
}
