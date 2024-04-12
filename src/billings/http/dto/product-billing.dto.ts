import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@InputType()
export class ProductBillingDto {
    @Field()
    @IsUUID()
    productId: string;

    @Field()
    @IsNumber()
    amountOfProduct: number;
}
