import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductBillingEntity } from '~billings/entities/product-billing.entity';

@Injectable()
export class ProductBillingRepository extends Repository<ProductBillingEntity> {
    constructor(private dataSource: DataSource) {
        super(ProductBillingEntity, dataSource.createEntityManager());
    }
}
