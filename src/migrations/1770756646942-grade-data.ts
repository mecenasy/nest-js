import { MigrationInterface, QueryRunner } from 'typeorm';
import { grades } from './data/generate.data';

export class GradeData1770756646942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      grades.map(async (d) => {
        await queryRunner.query(`
          WITH founded_student AS (
            SELECT u.id FROM "user" u
            WHERE u.email = '${d.studentId}'
          ),
          founded_subject AS (
            SELECT s.id FROM subject s
            WHERE s.name = '${d.subjectId}'
          ),
          founded_teacher AS (
            SELECT t.id FROM "user" t
            WHERE t.email = '${d.teacherId}'
          )
          INSERT INTO grade ("studentId", "teacherId", "subjectId", grade)
          SELECT 
            fs.id, 
            ft.id, 
            fsu.id, 
            '${d.grade}'
          FROM founded_student fs, founded_subject fsu, founded_teacher ft;
        `);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
