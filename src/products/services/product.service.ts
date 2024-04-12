import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { ProductEntity } from '~products/entities/product.entity';
import { UpsertProductDto } from '~products/http/dto/upsert-product.dto';
import { ProductRepository } from '~products/repositories/product.repository';
import ProductSearchService from '~search-engine/services/product-search.service';

@Injectable()
export class ProductService {
    constructor(private productRepo: ProductRepository, private productSearchService: ProductSearchService) {}

    async upsertOne(dto: UpsertProductDto): Promise<ProductEntity> {
        const { id } = dto;
        if (id) {
            await this.productRepo.findOneOrFail({ where: { id } });
        }

        const product = await this.productRepo.save(dto);
        this.productSearchService.indexPost(product);

        return product;
    }

    find(option?: FindManyOptions<ProductEntity>): Promise<ProductEntity[]> {
        return this.productRepo.find(option);
    }

    findByName(text: string) {
        return this.productSearchService.search(text)
    }
}
