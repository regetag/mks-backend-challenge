import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from '../database/database.provider';
import { CreateMovieInput } from './dto/createMovie.dto';
import { ModifyMovieInput } from './dto/modifyMovie.dto';

type ModifyMovieData = Omit<ModifyMovieInput, 'movieId'>;
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
    const perPage = 10;

    const [movies, amount] = await this.database.moviesRepository.findAndCount({
      skip: page * perPage,
      take: perPage,
    });

    const maxPage = Math.trunc(amount / 10);

    return {
      movies,
      maxPage,
      minPage: 0,
    };
  }

  public async updateMovie(movieId: string, data: ModifyMovieData) {
    const movie = await this.database.moviesRepository.findOne({
      where: {
        id: movieId,
      },
    });

    if (!movie) throw new NotFoundException('Movie not found');

    for (const [key, value] of Object.entries(data)) {
      if (!value) continue;
      movie[key] = value;
    }

    return await this.database.moviesRepository.save(movie);
  }

  public async deleteMovie(movieId: string) {
    const movie = await this.database.moviesRepository.findOne({
      where: { id: movieId },
    });

    if (!movie) throw new NotFoundException('Movie not found');

    await this.database.moviesRepository.remove(movie);

    return;
  }
}
