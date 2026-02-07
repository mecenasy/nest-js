import { MigrationInterface, QueryRunner } from 'typeorm';

export class Subject1770403767657 implements MigrationInterface {
  name = 'Subject1770403767657';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "auditorium" character varying NOT NULL, "teacherId" uuid, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subject_groups_group" ("subjectId" uuid NOT NULL, "groupName" character varying NOT NULL, CONSTRAINT "PK_94f949323ff6e8f8ffe6182d224" PRIMARY KEY ("subjectId", "groupName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6f37ccb911cd02dd953f45c8f7" ON "subject_groups_group" ("subjectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d7f7f54cf2d0e6862fe3dedb61" ON "subject_groups_group" ("groupName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "subject_years_year" ("subjectId" uuid NOT NULL, "yearName" character varying NOT NULL, CONSTRAINT "PK_dc1b00f840600e12a4c4bb0a745" PRIMARY KEY ("subjectId", "yearName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_606dfe3d0264d58ee5a69aedb1" ON "subject_years_year" ("subjectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_79e8803a72f4d12d001bba67e0" ON "subject_years_year" ("yearName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "subject_specialty_specialty" ("subjectId" uuid NOT NULL, "specialtyName" character varying NOT NULL, CONSTRAINT "PK_c8d83f93a519d8cea021f293b1a" PRIMARY KEY ("subjectId", "specialtyName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5363baa518f425fd36c62a6ed5" ON "subject_specialty_specialty" ("subjectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_60f3507911e052706bbe3cf540" ON "subject_specialty_specialty" ("specialtyName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" ADD CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_groups_group" ADD CONSTRAINT "FK_6f37ccb911cd02dd953f45c8f72" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_groups_group" ADD CONSTRAINT "FK_d7f7f54cf2d0e6862fe3dedb619" FOREIGN KEY ("groupName") REFERENCES "group"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_years_year" ADD CONSTRAINT "FK_606dfe3d0264d58ee5a69aedb16" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_years_year" ADD CONSTRAINT "FK_79e8803a72f4d12d001bba67e0a" FOREIGN KEY ("yearName") REFERENCES "year"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_specialty_specialty" ADD CONSTRAINT "FK_5363baa518f425fd36c62a6ed58" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_specialty_specialty" ADD CONSTRAINT "FK_60f3507911e052706bbe3cf5406" FOREIGN KEY ("specialtyName") REFERENCES "specialty"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject_specialty_specialty" DROP CONSTRAINT "FK_60f3507911e052706bbe3cf5406"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_specialty_specialty" DROP CONSTRAINT "FK_5363baa518f425fd36c62a6ed58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_years_year" DROP CONSTRAINT "FK_79e8803a72f4d12d001bba67e0a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_years_year" DROP CONSTRAINT "FK_606dfe3d0264d58ee5a69aedb16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_groups_group" DROP CONSTRAINT "FK_d7f7f54cf2d0e6862fe3dedb619"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_groups_group" DROP CONSTRAINT "FK_6f37ccb911cd02dd953f45c8f72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" DROP CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_60f3507911e052706bbe3cf540"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5363baa518f425fd36c62a6ed5"`,
    );
    await queryRunner.query(`DROP TABLE "subject_specialty_specialty"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_79e8803a72f4d12d001bba67e0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_606dfe3d0264d58ee5a69aedb1"`,
    );
    await queryRunner.query(`DROP TABLE "subject_years_year"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d7f7f54cf2d0e6862fe3dedb61"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6f37ccb911cd02dd953f45c8f7"`,
    );
    await queryRunner.query(`DROP TABLE "subject_groups_group"`);
    await queryRunner.query(`DROP TABLE "subject"`);
  }
}
