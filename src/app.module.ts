import { CacheModule, Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import * as redisStore from 'cache-manager-redis-store';
import type { ClientOpts } from 'redis';
@Module({
  imports: [
    DatabaseModule,
    MoviesModule,
    UsersModule,
    CacheModule.register<ClientOpts>({
      store: redisStore,
      url: process.env.REDIS_URL,
      ttl: 60 * 5,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
