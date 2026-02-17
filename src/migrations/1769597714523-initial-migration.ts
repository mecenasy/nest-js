import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1769597714523 implements MigrationInterface {
  name = 'InitialMigration1769597714523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task_label" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "taskId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_93a72d5d7e5370002fd7a237fd9" UNIQUE ("taskId", "name"), CONSTRAINT "PK_fb2322fb12d4db26386caeff6ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2ed786959519e4915b874d3677" ON "task_label" ("taskId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."task_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" text NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'OPEN', "userId" uuid NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "updateTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hashed_password" ("userId" uuid NOT NULL, "hash" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "PK_ba69521950c3445d64018779293" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("city" character varying(50) NOT NULL, "country" character varying(50) NOT NULL, "number" character varying(15) NOT NULL, "street" character varying(50) NOT NULL, "zipCode" character varying(10) NOT NULL, "personId" uuid NOT NULL, CONSTRAINT "PK_e3d0b5ba0387be88105ad7683bb" PRIMARY KEY ("personId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "person" ("name" character varying(50) NOT NULL, "surname" character varying(50) NOT NULL, "phone" integer NOT NULL, "photo" character varying(50), "userId" uuid NOT NULL, CONSTRAINT "PK_83b775da14886d352de2a4cac01" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."menu_menuside_enum" AS ENUM('left', 'right')`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "shortName" character varying(50), "menuSide" "public"."menu_menuside_enum" NOT NULL, "position" integer NOT NULL, "hidden" boolean NOT NULL DEFAULT false, "link" character varying(50) NOT NULL, "image" character varying(50) NOT NULL, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("name" character varying NOT NULL, CONSTRAINT "PK_ae4578dcaed5adff96595e61660" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "student" ("album" SERIAL NOT NULL, "direction" character varying NOT NULL, "specialty" character varying NOT NULL, "group" character varying NOT NULL, "year" character varying NOT NULL DEFAULT '1', "active" boolean NOT NULL DEFAULT true, "studentId" uuid, CONSTRAINT "REL_9316abc534487368cfd8527e8d" UNIQUE ("studentId"), CONSTRAINT "PK_ea086032bc893bc772097be422c" PRIMARY KEY ("album"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attachment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "originalName" character varying NOT NULL, "messageId" uuid, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "content" text NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "mpath" character varying DEFAULT '', "fromId" uuid NOT NULL, "toId" uuid NOT NULL, "parentId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "time_table" ("hours" character varying NOT NULL, "days" character varying NOT NULL, "auditorium" character varying NOT NULL, "group" character varying NOT NULL, "year" character varying NOT NULL, "specialty" character varying NOT NULL, "subject" uuid NOT NULL, "teacher" uuid NOT NULL, CONSTRAINT "PK_a914baa9f57ac510b609ccb5b98" PRIMARY KEY ("hours", "days", "auditorium", "group", "year", "specialty", "subject", "teacher"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group" ("name" character varying NOT NULL, "specialtyName" character varying NOT NULL, CONSTRAINT "PK_8a45300fd825918f3b40195fbdc" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "year" ("name" character varying NOT NULL, CONSTRAINT "PK_5ebc6cc136e3926458877b62b33" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "direction" ("name" character varying NOT NULL, CONSTRAINT "PK_edf14d6421b3ae4eaf7517cd8a7" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "specialty" ("name" character varying NOT NULL, "directionName" character varying NOT NULL, CONSTRAINT "PK_6caedcf8a5f84e3072c5a380a16" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grade" character varying NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "updateTime" TIMESTAMP NOT NULL DEFAULT now(), "subjectId" uuid, "teacherId" uuid, "studentId" uuid, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "auditorium" character varying NOT NULL, "teacherId" uuid, CONSTRAINT "UQ_d011c391e37d9a5e63e8b04c977" UNIQUE ("name"), CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "updateTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu_role_role" ("menuId" uuid NOT NULL, "roleName" character varying NOT NULL, CONSTRAINT "PK_fc32f79d7e0cebd57abb66fdaa2" PRIMARY KEY ("menuId", "roleName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_95fa06c3996cda27120b03b243" ON "menu_role_role" ("menuId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a49c740ae1275c0217e5f71deb" ON "menu_role_role" ("roleName") `,
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
      `CREATE TABLE "direction_years_year" ("directionName" character varying NOT NULL, "yearName" character varying NOT NULL, CONSTRAINT "PK_dd1531e87751d5316e883f20cf2" PRIMARY KEY ("directionName", "yearName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b0adb8aad79e3e44cbb0df6f3d" ON "direction_years_year" ("directionName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69db3b2f9792e02ad61bb7d230" ON "direction_years_year" ("yearName") `,
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
      `CREATE TABLE "user_roles_role" ("userId" uuid NOT NULL, "roleName" character varying NOT NULL, CONSTRAINT "PK_8e8a23b3ea43dd063b8726385cd" PRIMARY KEY ("userId", "roleName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_02914c59615da1ef38e848e324" ON "user_roles_role" ("roleName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "task_label" ADD CONSTRAINT "FK_2ed786959519e4915b874d3677b" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hashed_password" ADD CONSTRAINT "FK_ba69521950c3445d64018779293" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_e3d0b5ba0387be88105ad7683bb" FOREIGN KEY ("personId") REFERENCES "person"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_83b775da14886d352de2a4cac01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_9316abc534487368cfd8527e8df" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachment" ADD CONSTRAINT "FK_5f4a6c0677b1f2b417e95c717f8" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_776000050f42ddb61d3c628ff16" FOREIGN KEY ("fromId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_69b470efb1b19aca6e781214490" FOREIGN KEY ("toId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_b1c0c3e14d1a8be95531f29eb70" FOREIGN KEY ("parentId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "group" ADD CONSTRAINT "FK_bb9542a1c52431aa8a320d08fa2" FOREIGN KEY ("specialtyName") REFERENCES "specialty"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty" ADD CONSTRAINT "FK_26d4a72befa9a07ac11c55c247a" FOREIGN KEY ("directionName") REFERENCES "direction"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "subject" ADD CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_role_role" ADD CONSTRAINT "FK_95fa06c3996cda27120b03b2434" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_role_role" ADD CONSTRAINT "FK_a49c740ae1275c0217e5f71deb1" FOREIGN KEY ("roleName") REFERENCES "role"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_years_year" ADD CONSTRAINT "FK_584c57be9f3e2a4fdf2e7cf8811" FOREIGN KEY ("groupName") REFERENCES "group"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_years_year" ADD CONSTRAINT "FK_551bb20427dad4505e69fdc81aa" FOREIGN KEY ("yearName") REFERENCES "year"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "direction_years_year" ADD CONSTRAINT "FK_b0adb8aad79e3e44cbb0df6f3d4" FOREIGN KEY ("directionName") REFERENCES "direction"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "direction_years_year" ADD CONSTRAINT "FK_69db3b2f9792e02ad61bb7d2309" FOREIGN KEY ("yearName") REFERENCES "year"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty_years_year" ADD CONSTRAINT "FK_2acc7ba67089b46abc3f1d5cf63" FOREIGN KEY ("specialtyName") REFERENCES "specialty"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty_years_year" ADD CONSTRAINT "FK_9aef0edf0147fbaf01d9418205f" FOREIGN KEY ("yearName") REFERENCES "year"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_02914c59615da1ef38e848e324a" FOREIGN KEY ("roleName") REFERENCES "role"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_02914c59615da1ef38e848e324a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`,
    );
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
      `ALTER TABLE "specialty_years_year" DROP CONSTRAINT "FK_9aef0edf0147fbaf01d9418205f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty_years_year" DROP CONSTRAINT "FK_2acc7ba67089b46abc3f1d5cf63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "direction_years_year" DROP CONSTRAINT "FK_69db3b2f9792e02ad61bb7d2309"`,
    );
    await queryRunner.query(
      `ALTER TABLE "direction_years_year" DROP CONSTRAINT "FK_b0adb8aad79e3e44cbb0df6f3d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_years_year" DROP CONSTRAINT "FK_551bb20427dad4505e69fdc81aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_years_year" DROP CONSTRAINT "FK_584c57be9f3e2a4fdf2e7cf8811"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_role_role" DROP CONSTRAINT "FK_a49c740ae1275c0217e5f71deb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_role_role" DROP CONSTRAINT "FK_95fa06c3996cda27120b03b2434"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" DROP CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" DROP CONSTRAINT "FK_770cab79ce1d111bc05db17cfbd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" DROP CONSTRAINT "FK_8465191943752aee14abd9988b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" DROP CONSTRAINT "FK_47ee890e96d2e8bab85b056f39a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specialty" DROP CONSTRAINT "FK_26d4a72befa9a07ac11c55c247a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" DROP CONSTRAINT "FK_bb9542a1c52431aa8a320d08fa2"`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_b1c0c3e14d1a8be95531f29eb70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_69b470efb1b19aca6e781214490"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_776000050f42ddb61d3c628ff16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachment" DROP CONSTRAINT "FK_5f4a6c0677b1f2b417e95c717f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_9316abc534487368cfd8527e8df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_83b775da14886d352de2a4cac01"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_e3d0b5ba0387be88105ad7683bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hashed_password" DROP CONSTRAINT "FK_ba69521950c3445d64018779293"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_label" DROP CONSTRAINT "FK_2ed786959519e4915b874d3677b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_02914c59615da1ef38e848e324"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles_role"`);
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
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9aef0edf0147fbaf01d9418205"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2acc7ba67089b46abc3f1d5cf6"`,
    );
    await queryRunner.query(`DROP TABLE "specialty_years_year"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69db3b2f9792e02ad61bb7d230"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b0adb8aad79e3e44cbb0df6f3d"`,
    );
    await queryRunner.query(`DROP TABLE "direction_years_year"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_551bb20427dad4505e69fdc81a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_584c57be9f3e2a4fdf2e7cf881"`,
    );
    await queryRunner.query(`DROP TABLE "group_years_year"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a49c740ae1275c0217e5f71deb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_95fa06c3996cda27120b03b243"`,
    );
    await queryRunner.query(`DROP TABLE "menu_role_role"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "subject"`);
    await queryRunner.query(`DROP TABLE "grade"`);
    await queryRunner.query(`DROP TABLE "specialty"`);
    await queryRunner.query(`DROP TABLE "direction"`);
    await queryRunner.query(`DROP TABLE "year"`);
    await queryRunner.query(`DROP TABLE "group"`);
    await queryRunner.query(`DROP TABLE "time_table"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "attachment"`);
    await queryRunner.query(`DROP TABLE "student"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "menu"`);
    await queryRunner.query(`DROP TYPE "public"."menu_menuside_enum"`);
    await queryRunner.query(`DROP TABLE "person"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "hashed_password"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2ed786959519e4915b874d3677"`,
    );
    await queryRunner.query(`DROP TABLE "task_label"`);
  }
}
