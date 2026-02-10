import { MigrationInterface, QueryRunner } from "typeorm";

export class TimeTable21770720042258 implements MigrationInterface {
    name = 'TimeTable21770720042258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "hidden" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "hidden" DROP DEFAULT`);
    }

}
