import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '~users/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(private dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }
    
    async findByEmail(email: string) {
        return this.findOne({ where: { email } });
    }
}
