import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '~core/entities/base.entity';
import { ProductEntity } from '~products/entities/product.entity';
import { BillingEntity } from './billing.entity';

@ObjectType()
@Entity('ProductBilling')
export class ProductBillingEntity extends BaseEntity {
    @Field(() => Number)
    @Column({ type: 'numeric' })
    amountOfProduct: number;

    @Field()
    @Column({ type: 'uuid' })
    productId: string;

    @Field()
    @Column({ type: 'uuid' })
    billingId: string;

    @Field(() => ProductEntity)
    @ManyToOne(() => ProductEntity, (product) => product.productBillings)
    product: ProductEntity;

    @ManyToOne(() => BillingEntity, (billing) => billing.productBillings)
    billing: BillingEntity;
}
