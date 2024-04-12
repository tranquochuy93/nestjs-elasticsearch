import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repositories/product.repository';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductService } from './services/product.service';
import { SearchEngineModule } from '~search-engine/search-engine.module';
import { ProductEntity } from './entities/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), SearchEngineModule],
    providers: [ProductService, ProductResolver, ProductRepository],
    controllers: [],
    exports: [ProductService]
})
export class ProductModule {}
