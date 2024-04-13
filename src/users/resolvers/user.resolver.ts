import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '~users/entities/user.entity';
import { DeleteUserInput } from '~users/inputs/delete-user.input';
import { UpsertUserInput } from '~users/inputs/upsert-user.input';
import { UserService } from '~users/services/user.service';

@Resolver(() => UserEntity)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => [UserEntity])
    users(): Promise<UserEntity[]> {
        return this.userService.find();
    }

    @Query(() => [UserEntity])
    async findByText(@Args('text', { type: () => String }) text: string): Promise<UserEntity[]> {
        const users = await this.userService.findByText(text);
        return users.map((user) => plainToClass(UserEntity, user));
    }

    @Mutation(() => UserEntity)
    upsertUser(@Args('upsertUserInput') dto: UpsertUserInput): Promise<UserEntity> {
        return this.userService.upsertOne(dto);
    }

    @Mutation(() => UserEntity)
    deleteUserById(@Args('deleteUserInput') { id }: DeleteUserInput): Promise<UserEntity> {
        return this.userService.deleteOneById(id);
    }
}
