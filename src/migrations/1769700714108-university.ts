import { MigrationInterface, QueryRunner } from 'typeorm';

export class University1769700714108 implements MigrationInterface {
  name = 'University1769700714108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group" ("name" character varying NOT NULL, "specialtyName" character varying NOT NULL, CONSTRAINT "PK_8a45300fd825918f3b40195fbdc" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "specialty" ("name" character varying NOT NULL, "directionName" character varying NOT NULL, CONSTRAINT "PK_6caedcf8a5f84e3072c5a380a16" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "direction" ("name" character varying NOT NULL, CONSTRAINT "PK_edf14d6421b3ae4eaf7517cd8a7" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "year" ("name" character varying NOT NULL, CONSTRAINT "PK_5ebc6cc136e3926458877b62b33" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group_years_year" ("groupName" character varying NOT NULL, "yearName" character varying NOT NULL, CONSTRAINT "PK_2996f32331de0ffdfba5d29245c" PRIMARY KEY ("groupName", "yearName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_584c57be9f3e2a4fdf2e7cf881" ON "group_years_year" ("groupName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_551bb20427dad4505e69fdc81a" ON "group_years_year" ("yearName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "specialty_years_year" ("specialtyName" character varying NOT NULL, "yearName" character varying NOT NULL, CONSTRAINT "PK_7edbf346ba69edf5afef31cd7a1" PRIMARY KEY ("specialtyName", "yearName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2acc7ba67089b46abc3f1d5cf6" ON "specialty_years_year" ("specialtyName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9aef0edf0147fbaf01d9418205" ON "specialty_years_year" ("yearName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "direction_years_year" ("directionName" character varying NOT NULL, "yearName" character varying NOT NULL, CONSTRAINT "PK_dd1531e87751d5316e883f20cf2" PRIMARY KEY ("directionName", "yearName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b0adb8aad79e3e44cbb0df6f3d" ON "direction_years_year" ("directionName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69db3b2f9792e02ad61bb7d230" ON "direction_years_year" ("yearName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD CONSTRAINT "FK_bb9542a1c52431aa8a320d08fa2" FOREIGN KEY ("specialtyName") REFERENCES "specialty"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty" ADD CONSTRAINT "FK_26d4a72befa9a07ac11c55c247a" FOREIGN KEY ("directionName") REFERENCES "direction"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_years_year" ADD CONSTRAINT "FK_584c57be9f3e2a4fdf2e7cf8811" FOREIGN KEY ("groupName") REFERENCES "group"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_years_year" ADD CONSTRAINT "FK_551bb20427dad4505e69fdc81aa" FOREIGN KEY ("yearName") REFERENCES "year"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty_years_year" ADD CONSTRAINT "FK_2acc7ba67089b46abc3f1d5cf63" FOREIGN KEY ("specialtyName") REFERENCES "specialty"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty_years_year" ADD CONSTRAINT "FK_9aef0edf0147fbaf01d9418205f" FOREIGN KEY ("yearName") REFERENCES "year"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "direction_years_year" ADD CONSTRAINT "FK_b0adb8aad79e3e44cbb0df6f3d4" FOREIGN KEY ("directionName") REFERENCES "direction"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "direction_years_year" ADD CONSTRAINT "FK_69db3b2f9792e02ad61bb7d2309" FOREIGN KEY ("yearName") REFERENCES "year"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "direction_years_year" DROP CONSTRAINT "FK_69db3b2f9792e02ad61bb7d2309"`,
    );
    await queryRunner.query(
      `ALTER TABLE "direction_years_year" DROP CONSTRAINT "FK_b0adb8aad79e3e44cbb0df6f3d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty_years_year" DROP CONSTRAINT "FK_9aef0edf0147fbaf01d9418205f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty_years_year" DROP CONSTRAINT "FK_2acc7ba67089b46abc3f1d5cf63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_years_year" DROP CONSTRAINT "FK_551bb20427dad4505e69fdc81aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_years_year" DROP CONSTRAINT "FK_584c57be9f3e2a4fdf2e7cf8811"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty" DROP CONSTRAINT "FK_26d4a72befa9a07ac11c55c247a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" DROP CONSTRAINT "FK_bb9542a1c52431aa8a320d08fa2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69db3b2f9792e02ad61bb7d230"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b0adb8aad79e3e44cbb0df6f3d"`,
    );
    await queryRunner.query(`DROP TABLE "direction_years_year"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9aef0edf0147fbaf01d9418205"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2acc7ba67089b46abc3f1d5cf6"`,
    );
    await queryRunner.query(`DROP TABLE "specialty_years_year"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_551bb20427dad4505e69fdc81a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_584c57be9f3e2a4fdf2e7cf881"`,
    );
    await queryRunner.query(`DROP TABLE "group_years_year"`);
    await queryRunner.query(`DROP TABLE "year"`);
    await queryRunner.query(`DROP TABLE "direction"`);
    await queryRunner.query(`DROP TABLE "specialty"`);
    await queryRunner.query(`DROP TABLE "group"`);
  }
}
