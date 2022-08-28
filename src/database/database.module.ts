import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseProvider } from './database.provider';
import { dataSourceOptions } from './dataSource';
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(dataSourceOptions)],
  providers: [DatabaseProvider],
})
export class DatabaseModule {}
