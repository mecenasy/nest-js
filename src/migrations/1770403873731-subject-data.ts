import { MigrationInterface, QueryRunner } from 'typeorm';
import { data } from './data/1770403873731-subject-data';

export class SubjectData1770403873731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      data.map(async (subject) => {
        await queryRunner.query(`
        WITH founded_user AS (
          SELECT u.id, u.email from "user" u
            WHERE u.email = '${subject.teacher}'
        ),
        inserted_subject as (
          INSERT INTO "subject" (name, auditorium, "teacherId")
          SELECT '${subject.name}', '${subject.auditorium}' ,id FROM founded_user
          RETURNING id
        ),
      inserted_year AS (
        INSERT INTO subject_years_year ("yearName", "subjectId")
        SELECT y, id FROM inserted_subject
        CROSS JOIN (VALUES ${subject.years.map((r) => `('${r.value}')`).join(',')}) AS years(y)
        RETURNING "subjectId"
      ),
      inserted_group AS (
        INSERT INTO subject_groups_group ("groupName", "subjectId")
        SELECT g, id FROM inserted_subject
        CROSS JOIN (VALUES ${subject.groups.map((r) => `('${r.name}')`).join(',')}) AS groups(g)
        RETURNING "subjectId"
      )
      INSERT INTO subject_specialty_specialty ("specialtyName", "subjectId")
      SELECT s, id FROM inserted_subject
      CROSS JOIN (VALUES ${subject.specialty.map((r) => `('${r.name}')`).join(',')}) AS specialties(s);
        `);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
