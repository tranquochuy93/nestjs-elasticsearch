import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '~users/entities/user.entity';
import { UpsertUserInput } from '~users/inputs/upsert-user.input';
import { UserService } from '~users/services/user.service';

@Resolver(() => UserEntity)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => [UserEntity])
    users(): Promise<UserEntity[]> {
        return this.userService.find();
    }

    @Mutation(() => UserEntity)
    upsertUser(@Args('upsertUserInput') dto: UpsertUserInput): Promise<UserEntity> {
        return this.userService.upsertOne(dto);
    }
}
