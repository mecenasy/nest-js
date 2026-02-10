import { MigrationInterface, QueryRunner } from 'typeorm';

export class Grade1770754712313 implements MigrationInterface {
  name = 'Grade1770754712313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grade" character varying NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "updateTime" TIMESTAMP NOT NULL DEFAULT now(), "subjectId" uuid, "teacherId" uuid, "studentId" uuid, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" ADD CONSTRAINT "FK_47ee890e96d2e8bab85b056f39a" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" ADD CONSTRAINT "FK_8465191943752aee14abd9988b5" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" ADD CONSTRAINT "FK_770cab79ce1d111bc05db17cfbd" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "grade" DROP CONSTRAINT "FK_770cab79ce1d111bc05db17cfbd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" DROP CONSTRAINT "FK_8465191943752aee14abd9988b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" DROP CONSTRAINT "FK_47ee890e96d2e8bab85b056f39a"`,
    );
    await queryRunner.query(`DROP TABLE "grade"`);
  }
}
