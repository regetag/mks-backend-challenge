import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteMovieInput {
  @ApiProperty({
    pattern: '^0{8}-0{4}-0{4}-0{4}-0{12}$',
    description: 'uuid',
  })
  @IsUUID()
  movieId: string;
}
