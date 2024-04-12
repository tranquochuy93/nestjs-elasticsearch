import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ProductBillingDto } from './product-billing.dto';

@InputType()
export class UpsertBillingDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    id: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @Field(() => [ProductBillingDto])
    @IsArray()
    productBillings: ProductBillingDto[];
}
