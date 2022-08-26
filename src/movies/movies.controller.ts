import { Controller, Get } from '@nestjs/common';
import { Database } from 'src/database/database.provider';

@Controller('movies')
export class MoviesController {
  constructor(private database: Database) {}

  @Get()
  hello() {
    // const movieRepositorie = this.database.getRepository();
    // Todo
  }
}
