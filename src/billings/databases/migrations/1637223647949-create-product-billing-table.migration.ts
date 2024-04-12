import { MigrationInterface, QueryRunner, TableForeignKey, TableIndex } from 'typeorm';

export class CreateProductBillingTable1637223647949 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "ProductBilling" (
                "id" uuid NOT NULL DEFAULT public.uuid_generate_v4(), 
                "amountOfProduct" numeric NOT NULL DEFAULT 0,
                "productId" uuid NOT NULL, 
                "billingId" uuid NOT NULL, 
                "deletedAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            );`
        );

        await queryRunner.createIndex(
            'ProductBilling',
            new TableIndex({
                name: `ProductBilling-productIdIndex`,
                columnNames: ['productId']
            })
        );

        await queryRunner.createIndex(
            'ProductBilling',
            new TableIndex({
                name: `ProductBilling-billingIdIndex`,
                columnNames: ['billingId']
            })
        );

        await queryRunner.createForeignKey(
            'ProductBilling',
            new TableForeignKey({
                columnNames: ['productId'],
                referencedTableName: 'Product',
                referencedColumnNames: ['id']
            })
        );

        await queryRunner.createForeignKey(
            'ProductBilling',
            new TableForeignKey({
                columnNames: ['billingId'],
                referencedTableName: 'Billing',
                referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Billing";`);
    }
}
