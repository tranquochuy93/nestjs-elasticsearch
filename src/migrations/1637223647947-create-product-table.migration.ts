import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1637223647947 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Product" (
                "id" uuid NOT NULL DEFAULT public.uuid_generate_v4() PRIMARY KEY, 
                "name" character varying NOT NULL, 
                "price" numeric NOT NULL, 
                "deletedAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Product";`);
    }
}
