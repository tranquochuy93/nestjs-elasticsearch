import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '~core/entities/base.entity';
import { LowerTransformer } from '~core/transformers/lower.transformer';
import { TimestampTransformer } from '~core/transformers/timestamp.transformer';
// import { UserRoleEnum } from '../enums/user-role.enum';
// import { UserStatusEnum } from '../enums/user-status.enum';
@ObjectType()
@Entity('User')
export class UserEntity extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Index()
    @Column({ transformer: new LowerTransformer() })
    email: string;

    @Field()
    @Column({ nullable: true })
    firstName: string;

    @Field()
    @Column({ nullable: true })
    lastName: string;

    @Field()
    @Column({ nullable: true })
    password: string;

    // @Column()
    // role: UserRoleEnum;

    @Field()
    @Column({ default: 'en', transformer: new LowerTransformer(), length: 10 })
    language?: string;

    // @Column()
    // status: UserStatusEnum;

    @Field()
    @Column({
        type: 'timestamp',
        nullable: true,
        transformer: new TimestampTransformer()
    })
    lastLoginAt?: Date;

    @DeleteDateColumn({
        type: 'timestamp',
        nullable: true,
        transformer: new TimestampTransformer()
    })
    deletedAt?: Date;
}
