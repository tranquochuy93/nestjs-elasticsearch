import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { UserEntity } from './entities/user.entity';
import { SearchEngineModule } from '~search-engine/search-engine.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), SearchEngineModule],
    controllers: [],
    providers: [UserService, UserResolver, UserRepository],
    exports: [UserService]
})
export class UserModule {}
