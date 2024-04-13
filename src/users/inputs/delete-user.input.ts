import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class DeleteUserInput {
    @Field()
    @IsNotEmpty()
    @IsUUID()
    id: string;
}
