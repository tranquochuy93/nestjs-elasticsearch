import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TimestampTransformer } from '../transformers/timestamp.transformer';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp', transformer: new TimestampTransformer() })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        transformer: new TimestampTransformer()
    })
    updatedAt: Date;
}
