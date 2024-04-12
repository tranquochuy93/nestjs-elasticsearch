import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class CreateBillingTable1637223647948 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Billing" (
                "id" uuid NOT NULL DEFAULT public.uuid_generate_v4() PRIMARY KEY, 
                "name" character varying NOT NULL, 
                "totalOfPrice" numeric NOT NULL DEFAULT 0,
                "userId" uuid NOT NULL REFERENCES "User"(id), 
                "deletedAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            );`
        );

        await queryRunner.createIndex(
            'Billing',
            new TableIndex({
                name: `Billing-userIdIndex`,
                columnNames: ['userId']
            })
        );

        // await queryRunner.createForeignKey(
        //     'Billing',
        //     new TableForeignKey({
        //         columnNames: ['userId'],
        //         referencedTableName: 'User',
        //         referencedColumnNames: ['id']
        //     })
        // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Billing";`);
    }
}
