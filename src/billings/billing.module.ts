import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '~products/product.module';
import { BillingController } from './http/controllers/billing.controller';
import { BillingRepository } from './repositories/billing.repository';
import { ProductBillingRepository } from './repositories/product-billing.repository';
import { BillingResolver } from './resolvers/billing.resolver';
import { BillingService } from './services/billing.service';
import { BillingEntity } from './entities/billing.entity';
import { ProductBillingEntity } from './entities/product-billing.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BillingEntity, ProductBillingEntity]), ProductModule],
    providers: [BillingService, BillingResolver, BillingRepository, ProductBillingRepository],
    controllers: [BillingController],
    exports: []
})
export class BillingModule {}
