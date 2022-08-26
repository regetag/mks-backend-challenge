import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieInput } from './dto/createMovie.dto';
import { DeleteMovieInput } from './dto/deleteMovie.dto';
import { ListMoviesInput } from './dto/listMovies.dto';
import { ModifyMovieInput } from './dto/modifyMovie.dto';
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

  @Patch()
  async updateMovie(@Body() data: ModifyMovieInput) {
    const { movieId, ...rest } = data;
    const movie = await this.movieService.updateMovie(movieId, rest);
    return movie;
  }

  @Delete()
  @HttpCode(204)
  async deleteMovie(@Body() data: DeleteMovieInput) {
    await this.movieService.deleteMovie(data.movieId);
    return;
  }
}
