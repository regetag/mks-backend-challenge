import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from './database.provider';
import { Movie } from './entities/Movies.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      url: process.env.DB_URL,
      type: 'postgres',
      synchronize: true,
      entities: [Movie],
    }),
  ],
  providers: [Database],
})
export class DatabaseModule {}
