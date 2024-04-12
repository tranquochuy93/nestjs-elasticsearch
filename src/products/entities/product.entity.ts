import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductBillingEntity } from '~billings/entities/product-billing.entity';
import { BaseEntity } from '~core/entities/base.entity';

@ObjectType()
@Entity('Product')
export class ProductEntity extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar' })
    name: string;

    @Field(() => Float)
    @Column({ type: 'numeric' })
    price: number;

    @OneToMany(() => ProductBillingEntity, (productBilling) => productBilling.product)
    productBillings?: ProductBillingEntity[];
}
