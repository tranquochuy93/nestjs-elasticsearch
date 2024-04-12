import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpsertProductDto {
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
    @IsNumber()
    price: number;
}
