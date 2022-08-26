import { Length, IsUrl, IsOptional, IsDate } from 'class-validator';

export class CreateMovieInput {
  @Length(1, 250)
  title: string;

  @Length(1, 500)
  description: string;

  @IsUrl()
  @IsOptional()
  coverURI: string;

  @IsOptional()
  @IsDate()
  releaseDate: Date;
}
