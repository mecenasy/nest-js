import { MigrationInterface, QueryRunner } from 'typeorm';

export class TimeTable1770413754316 implements MigrationInterface {
  name = 'TimeTable1770413754316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "time_table" ("hours" character varying NOT NULL, "days" character varying NOT NULL, "auditorium" character varying NOT NULL, "group" character varying NOT NULL, "year" character varying NOT NULL, "specialty" character varying NOT NULL, "subject" uuid NOT NULL, "teacher" uuid NOT NULL, CONSTRAINT "PK_a914baa9f57ac510b609ccb5b98" PRIMARY KEY ("hours", "days", "auditorium", "group", "year", "specialty", "subject", "teacher"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_table" ADD CONSTRAINT "FK_59b886bc5322bd0ec3bdd4bd1a9" FOREIGN KEY ("group") REFERENCES "group"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_table" ADD CONSTRAINT "FK_f550ea10eb9f32c89bcb4943714" FOREIGN KEY ("year") REFERENCES "year"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_table" ADD CONSTRAINT "FK_fda6855c305821b48d46a37dc5e" FOREIGN KEY ("specialty") REFERENCES "specialty"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_table" ADD CONSTRAINT "FK_b7fa8e598d39f79489a8915f5d1" FOREIGN KEY ("subject") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_table" ADD CONSTRAINT "FK_e61c6525f175b4f293b1b7b4967" FOREIGN KEY ("teacher") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "time_table" DROP CONSTRAINT "FK_e61c6525f175b4f293b1b7b4967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_table" DROP CONSTRAINT "FK_b7fa8e598d39f79489a8915f5d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_table" DROP CONSTRAINT "FK_fda6855c305821b48d46a37dc5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_table" DROP CONSTRAINT "FK_f550ea10eb9f32c89bcb4943714"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_table" DROP CONSTRAINT "FK_59b886bc5322bd0ec3bdd4bd1a9"`,
    );
    await queryRunner.query(`DROP TABLE "time_table"`);
  }
}
