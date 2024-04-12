import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from '~auth/auth.module';
import { BillingModule } from '~billings/billing.module';
import { GlobalCacheModule } from '~config/cache.config';
import { databaseConfig } from '~config/database.config';
import { graphqlConfig } from '~config/graphql.config';
import { i18nConfig } from '~config/i18n.config';
import { HttpExceptionFilter } from '~core/filters/http-exception.filter';
import { ProductModule } from '~products/product.module';
import { UserModule } from '~users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchEngineModule } from '~search-engine/search-engine.module';

@Module({
    imports: [
        databaseConfig,
        i18nConfig,
        graphqlConfig,
        GlobalCacheModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        UserModule,
        ProductModule,
        BillingModule,
        SearchEngineModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class AppModule {}
