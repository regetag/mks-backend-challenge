import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateMovieInput } from './dto/createMovie.dto';
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
}
