import { IsNumberString, IsOptional } from 'class-validator';

export class ListMoviesInput {
  @IsNumberString()
  @IsOptional()
  page: number;
}
