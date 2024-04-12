import { Injectable } from '@nestjs/common';
import { keyBy } from 'lodash';
import { FindManyOptions, In } from 'typeorm';
import { BillingEntity } from '~billings/entities/billing.entity';
import { UpsertBillingDto } from '~billings/http/dto/upsert-billing.dto';
import { BillingRepository } from '~billings/repositories/billing.repository';
import { ProductBillingRepository } from '~billings/repositories/product-billing.repository';
import { ProductService } from '~products/services/product.service';

@Injectable()
export class BillingService {
    constructor(
        private billingRepo: BillingRepository,
        private productBillingRepo: ProductBillingRepository,
        private productService: ProductService
    ) {}

    async find(options?: FindManyOptions<BillingEntity>): Promise<BillingEntity[]> {
        return this.billingRepo.find(options);
    }

    async createOne(dto: UpsertBillingDto): Promise<BillingEntity> {
        const { userId, name, productBillings: productBillingDto } = dto;
        const billing = await this.billingRepo.save({ userId, name });

        const productIds = productBillingDto.map(({ productId }) => productId);
        const products = await this.productService.find({ where: { id: In(productIds) } });
        const mappedProducts = keyBy(products, 'id');

        const productBillings = await this.productBillingRepo.save(
            productBillingDto.map(({ productId, amountOfProduct }) => ({
                productId,
                amountOfProduct,
                billingId: billing.id
            }))
        );

        const totalOfPrice = productBillings.reduce((acc, { amountOfProduct, productId }) => {
            const price = mappedProducts[productId]?.price || 0;
            acc += amountOfProduct * price;
            return acc;
        }, 0);

        return this.billingRepo.save({
            ...billing,
            totalOfPrice
        });
    }
}
