import { MigrationInterface, QueryRunner } from 'typeorm';
import { data } from './data/1770413501664-time-table-data';

export class TimeTableData1770413763210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      data.map(async (d) => {
        await queryRunner.query(`
          INSERT INTO time_table (hours, days,"group", year, specialty,subject,teacher,auditorium) 
          VALUES( '${d.hours}', '${d.days}', '${d.group}', '${d.year}', '${d.specialty}', '${d.subject}', '${d.teacher}', '${d.auditorium}');
              `);
      }),
    );
  }

  // }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
