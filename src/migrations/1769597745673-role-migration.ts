import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleMigration1769597745673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "role" (name) VALUES ('admin'), ('user'), ('student'), ('teacher')
      ON CONFLICT (name) DO NOTHING`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "role" WHERE name IN ('admin', 'user', 'student', 'teacher')`,
    );
  }
}
