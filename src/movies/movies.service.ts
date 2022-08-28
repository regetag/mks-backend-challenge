import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Movie } from '../database/entities/Movies.entity';
import { DatabaseProvider } from '../database/database.provider';
import { CreateMovieInput } from './dto/createMovie.dto';
import { ModifyMovieInput } from './dto/modifyMovie.dto';

type ModifyMovieData = Omit<ModifyMovieInput, 'movieId'>;

export type ImoviePagination = {
  maxPage: number;
  minPage: number;
  movies: Movie[];
};
@Injectable()
export class MoviesService {
  constructor(
    private database: DatabaseProvider,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async createMovie(data: CreateMovieInput) {
    const movieAlreadyExists = await this.database.moviesRepository.findOne({
      where: {
        title: data.title,
      },
    });

    if (movieAlreadyExists) {
      throw new ConflictException('Title already in use!');
    }

    const newMovie = this.database.moviesRepository.create(data);

    const savedMovie = await Promise.all([
      this.database.moviesRepository.save(newMovie),
      this.cacheManager.reset(),
    ])[0];

    return savedMovie;
  }

  public async moviePagination(page: number): Promise<ImoviePagination> {
    const perPage = 10;

    const cacheKey = `movies-page-${page}`;
    const cacheData = await (this.cacheManager.get(cacheKey) as Promise<
      string | undefined
    >);

    if (cacheData) return JSON.parse(cacheData);

    const [movies, amount] = await this.database.moviesRepository.findAndCount({
      skip: page * perPage,
      take: perPage,
    });

    const result = {
      movies,
      maxPage: Math.trunc(amount / 10),
      minPage: 0,
    };

    if (movies.length) {
      await this.cacheManager.set(cacheKey, JSON.stringify(result), {
        ttl: 60 * 5,
      });
    }

    return result;
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

    const newMovie = await Promise.all([
      await this.database.moviesRepository.save(movie),
      await this.cacheManager.reset(),
    ])[0];

    return newMovie;
  }

  public async deleteMovie(movieId: string) {
    const movie = await this.database.moviesRepository.findOne({
      where: { id: movieId },
    });

    if (!movie) throw new NotFoundException('Movie not found');

    await Promise.all([
      this.database.moviesRepository.remove(movie),
      this.cacheManager.reset(),
    ]);

    return;
  }
}
