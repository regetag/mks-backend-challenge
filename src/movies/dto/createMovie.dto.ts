import { Length, IsUrl, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieInput {
  @ApiProperty({
    minLength: 1,
    maxLength: 250,
  })
  @Length(1, 250)
  title: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 500,
  })
  @Length(1, 500)
  description: string;

  @ApiPropertyOptional({})
  @IsUrl()
  @IsOptional()
  coverURI: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  releaseDate: Date | null;
}
