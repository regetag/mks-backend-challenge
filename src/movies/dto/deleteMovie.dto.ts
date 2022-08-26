import { IsUUID } from 'class-validator';

export class DeleteMovieInput {
  @IsUUID()
  movieId: string;
}
