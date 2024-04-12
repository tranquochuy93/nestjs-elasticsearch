import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BillingEntity } from '~billings/entities/billing.entity';
import { UpsertBillingDto } from '~billings/http/dto/upsert-billing.dto';
import { BillingService } from '~billings/services/billing.service';

@Resolver(() => BillingEntity)
export class BillingResolver {
    constructor(private billingService: BillingService) {}

    @Query(() => [BillingEntity])
    billings(): Promise<BillingEntity[]> {
        return this.billingService.find({
            relations: ['productBillings', 'productBillings.product']
        });
    }

    @Mutation(() => BillingEntity)
    upsertBilling(@Args('upsertBillingDto') dto: UpsertBillingDto): Promise<BillingEntity> {
        return this.billingService.createOne(dto);
    }
}
