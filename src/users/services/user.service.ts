import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { UserEntity } from '~users/entities/user.entity';
import { UpsertUserInput } from '~users/inputs/upsert-user.input';
import { UserRepository } from '~users/repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}

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

    async upsertOne(dto: UpsertUserInput): Promise<UserEntity> {
        const { id } = dto;
        if (id) {
            await this.userRepo.findOneOrFail({ where: { id } });
        }

        return this.userRepo.save(dto);
    }
}
