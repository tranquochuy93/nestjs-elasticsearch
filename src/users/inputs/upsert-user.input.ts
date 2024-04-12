import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpsertUserInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    id: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    password: string;
}
