import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiQuery,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMovieInput } from './dto/createMovie.dto';
import { DeleteMovieInput } from './dto/deleteMovie.dto';
import { ListMoviesInput } from './dto/listMovies.dto';
import { ModifyMovieInput } from './dto/modifyMovie.dto';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('movies')
@ApiUnauthorizedResponse({
  description: 'Retuns unauthorized when Bearer token not set or invalid.',
})
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Successful movie creation.',
  })
  @ApiConflictResponse({
    description: 'Returns conflict when title is already registered.',
  })
  @HttpCode(201)
  async createMovie(@Body() data: CreateMovieInput) {
    const newMovie = await this.movieService.createMovie(data);
    return newMovie;
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    example: 0,
  })
  @ApiOkResponse({
    description: 'Returns a list of movies.',
  })
  async listMovies(@Query() data: ListMoviesInput) {
    const page = Math.abs(Number(data.page || 0));
    const movies = await this.movieService.moviePagination(page);
    return movies;
  }

  @Patch()
  @ApiOkResponse({
    description: 'Returns ok when successfuly update a movie.',
  })
  @ApiNotFoundResponse({
    description: 'Returns a not found when given movieId is invalid.',
  })
  async updateMovie(@Body() data: ModifyMovieInput) {
    const { movieId, ...rest } = data;
    const movie = await this.movieService.updateMovie(movieId, rest);
    return movie;
  }

  @Delete()
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Returns no content when successfuly delete a movie.',
  })
  @ApiNotFoundResponse({
    description: 'Returns a not found when given movieId is invalid.',
  })
  async deleteMovie(@Body() data: DeleteMovieInput) {
    await this.movieService.deleteMovie(data.movieId);
    return;
  }
}
