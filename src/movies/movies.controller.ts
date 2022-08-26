import {
  Body,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMovieInput } from './dto/createMovie.dto';
import { ListMoviesInput } from './dto/listMovies.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Post()
  @HttpCode(201)
  async createMovie(@Body() data: CreateMovieInput) {
    const newMovie = await this.movieService.createMovie(data);
    return newMovie;
  }

  @Get()
  async listMovies(@Query() data: ListMoviesInput) {
    const page = Math.abs(Number(data.page || 0));
    const movies = await this.movieService.moviePagination(page);
    return movies;
  }
}
