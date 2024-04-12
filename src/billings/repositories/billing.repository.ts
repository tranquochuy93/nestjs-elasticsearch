import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BillingEntity } from '~billings/entities/billing.entity';

@Injectable()
export class BillingRepository extends Repository<BillingEntity> {
    constructor(private dataSource: DataSource) {
        super(BillingEntity, dataSource.createEntityManager());
    }
}
