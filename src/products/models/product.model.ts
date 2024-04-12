import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => Float)
    price: string;
}
