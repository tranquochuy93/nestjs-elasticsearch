import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductEntity } from '~products/entities/product.entity';
import { ProductService } from '~products/services/product.service';
import { plainToClass } from 'class-transformer';
import { UpsertProductInput } from '~products/inputs/upsert-product.input';


@Resolver(() => ProductEntity)
export class ProductResolver {
    constructor(private productService: ProductService) {}

    @Query(() => [ProductEntity])
    findProducts(): Promise<ProductEntity[]> {
        return this.productService.find();
    }

    @Query(() => [ProductEntity])
    async findProductsByText(@Args('text', { type: () => String }) text: string): Promise<ProductEntity[]> {
        const products = await this.productService.findByName(text);
        return products.map((product) => plainToClass(ProductEntity, product));
    }

    @Mutation(() => ProductEntity)
    upsertProduct(@Args('upsertProductDto') dto: UpsertProductInput): Promise<ProductEntity> {
        return this.productService.upsertOne(dto);
    }
}
