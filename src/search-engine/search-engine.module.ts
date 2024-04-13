import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import ProductSearchService from './services/product-search.service';
import UserSearchService from './services/user-search.service';
 
@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        }
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ProductSearchService, UserSearchService],
  exports: [ElasticsearchModule, ProductSearchService, UserSearchService]
})
export class SearchEngineModule {}