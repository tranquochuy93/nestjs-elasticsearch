import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import UserSearchService from '~search-engine/services/user-search.service';
import { UserEntity } from '~users/entities/user.entity';
import { UpsertUserInput } from '~users/inputs/upsert-user.input';
import { UserRepository } from '~users/repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository, private userSearchService: UserSearchService) {}

    findByIdNotFail(id: string) {
        return this.userRepo.findOne({ where: { id } });
    }

    findByEmailNotFail(email: string) {
        return this.userRepo.findOne({ where: { email } });
    }

    save(user) {
        return this.userRepo.save(user);
    }

    find(option?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
        return this.userRepo.find(option);
    }

    findByText(text: string) {
        return this.userSearchService.search(text);
    }

    async upsertOne(dto: UpsertUserInput): Promise<UserEntity> {
        const { id } = dto;
        if (id) {
            await this.userRepo.findOneOrFail({ where: { id } });
            const updatedUser = await this.userRepo.save(dto);
            this.userSearchService.update(updatedUser)
            return updatedUser;
        }

        const newUser = await this.userRepo.save(dto);
        console.log(newUser)
        this.userSearchService.indexUser(newUser);

        return newUser;
    }

    async deleteOneById(id: string) {
        const user = await this.userRepo.findOneOrFail({ where: { id } });
        await this.userRepo.delete(id)
        this.userSearchService.remove(id);

        return user;
    }
}
