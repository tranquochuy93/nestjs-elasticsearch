import { CacheModule, Global, Module } from '@nestjs/common';
import { env } from './env.config';

export const cacheConfig = CacheModule.register({
    host: env.REDIS.HOST,
    port: env.REDIS.PORT
});

@Global()
@Module({
    exports: [cacheConfig],
    imports: [cacheConfig]
})
export class GlobalCacheModule {}
