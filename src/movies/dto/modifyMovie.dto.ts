import { IsDate, IsOptional, IsUrl, IsUUID, Length } from 'class-validator';

export class ModifyMovieInput {
  @IsUUID()
  movieId: string;

  @IsOptional()
  @Length(1, 250)
  title: string;

  @IsOptional()
  @Length(1, 500)
  description: string;

  @IsUrl()
  @IsOptional()
  coverURI: string;

  @IsOptional()
  @IsDate()
  releaseDate: Date;
}
