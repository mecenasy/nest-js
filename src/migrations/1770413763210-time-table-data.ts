import { MigrationInterface, QueryRunner } from 'typeorm';
import { schedule } from './data/generate.data';

export class TimeTableData1770413763210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      schedule.map(async (d) => {
        await queryRunner.query(`
          WITH subject AS (
            SELECT s.id, u.id as teacher_id FROM subject s INNER JOIN "user" u ON s."teacherId" = u.id
            WHERE u.email = '${d.teacher}' AND s.name = '${d.subject}'
          )
          INSERT INTO time_table (hours, days,"group", year, specialty,subject,teacher,auditorium) 
          SELECT  '${d.hours}', '${d.days}', '${d.group}', '${d.year}', '${d.specialty}', id, "teacher_id", '${d.auditorium}' from subject
        `);
      }),
    );
  }

  // }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
