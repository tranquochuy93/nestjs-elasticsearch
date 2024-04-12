import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '~core/entities/base.entity';
import { ProductBillingEntity } from './product-billing.entity';

@ObjectType()
@Entity('Billing')
export class BillingEntity extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar' })
    name: string;

    @Field(() => Float)
    @Column({ type: 'numeric' })
    totalOfPrice: number;

    @Field()
    @Column({ type: 'uuid' })
    userId: string;

    @Field(() => [ProductBillingEntity])
    @OneToMany(() => ProductBillingEntity, (productBilling) => productBilling.billing)
    productBillings?: ProductBillingEntity[];
}
