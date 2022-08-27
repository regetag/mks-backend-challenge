import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsUrl, IsUUID, Length } from 'class-validator';

export class ModifyMovieInput {
  @ApiProperty({
    pattern: '^0{8}-0{4}-0{4}-0{4}-0{12}$',
    description: 'uuid',
  })
  @IsUUID()
  movieId: string;

  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 250,
  })
  @IsOptional()
  @Length(1, 250)
  title: string | null;

  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 500,
  })
  @IsOptional()
  @Length(1, 500)
  description: string | null;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  coverURI: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  releaseDate: Date | null;
}
