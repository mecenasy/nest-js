import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TimeTable } from './entity/time-table.entity';
import { MoveSubjectInTimeTableDto } from './dto/move-subject-in-time-table.dto';
import { AddSubjectToTimeTableDto } from './dto/add-subject-to-time-table.dto';
import { DataSource } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { SubjectService } from '../subject/subject.service';
import { Year } from '../year/entity/year.entity';
import { Group } from '../group/entity/group.entity';
import { Specialty } from '../specialty/entity/specialty.entity';
import { RemoveSubjectFromTimeTableDto } from './dto/remove-subject-from-time-table.dto';
import { Day } from './enum/day';
import { Time } from './enum/time';
import { GetTimeTableResponse } from './response/get-time-table.response';

@Injectable()
export class TimeTableService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly subjectService: SubjectService,
  ) {}

  async getTimeTableByYear(year: string): Promise<GetTimeTableResponse[]> {
    return await this.dataSource
      .getRepository(TimeTable)
      .createQueryBuilder('timeTable')
      .select('timeTable.group', 'name')
      .innerJoin('timeTable.subject', 'subject')
      .innerJoin('subject.teacher', 'teacher')
      .leftJoin('teacher.person', 'person')
      .addSelect(
        `json_agg(
          json_build_object(
            'days', "timeTable"."days",
            'hours', "timeTable"."hours",
            'group', "timeTable"."group",
            'year', "timeTable"."year",
            'specialty', "timeTable"."specialty",
            'auditorium', "timeTable"."auditorium",
            'subject', json_build_object(
              'id', "subject"."id",
              'name', "subject"."name"
              ),
            'teacher', json_build_object(
              'id', "teacher"."id",
              'name', "person"."name" || ' ' || "person"."surname"
            )
          )
        )`,
        'timeTable',
      )
      .where('timeTable.year = :year', { year })
      .groupBy('timeTable.group')
      .getRawMany();
  }

  async getTimeTableByGroup(group: string, year: string): Promise<TimeTable[]> {
    return await this.dataSource
      .getRepository(TimeTable)
      .createQueryBuilder('timeTable')
      .innerJoinAndSelect('timeTable.subject', 'subject')
      .innerJoinAndSelect('subject.teacher', 'teacher')
      .innerJoinAndSelect('teacher.person', 'person')
      .where('timeTable.group = :group', { group })
      .andWhere('timeTable.year = :year', { year })
      .getMany();
  }

  async getTimeTableBySpecialty(
    specialty: string,
  ): Promise<GetTimeTableResponse[]> {
    return await this.dataSource
      .getRepository(TimeTable)
      .createQueryBuilder('timeTable')
      .select('timeTable.group', 'name')
      .addSelect('timeTable.year', 'year')
      .innerJoin('timeTable.subject', 'subject')
      .innerJoin('subject.teacher', 'teacher')
      .leftJoin('teacher.person', 'person')
      .addSelect(
        `json_agg(
          json_build_object(
            'days', "timeTable"."days",
            'hours', "timeTable"."hours",
            'group', "timeTable"."group",
            'year', "timeTable"."year",
            'specialty', "timeTable"."specialty",
            'auditorium', "timeTable"."auditorium",
            'subject', json_build_object(
              'id', "subject"."id",
              'name', "subject"."name"
              ),
            'teacher', json_build_object(
              'id', "teacher"."id",
              'name', "person"."name" || ' ' || "person"."surname"
            )
          )
        )`,
        'timeTable',
      )
      .where('timeTable.specialty = :specialty', { specialty })
      .groupBy('timeTable.year')
      .addGroupBy('timeTable.group')
      .orderBy('timeTable.year')
      .addOrderBy('timeTable.group')
      .getRawMany();
  }

  async getTimeTableByTeacher(teacher: string): Promise<TimeTable[]> {
    return await this.dataSource
      .getRepository(TimeTable)
      .createQueryBuilder('timeTable')
      .select('timeTable.group', 'name')
      .addSelect('timeTable.year', 'year')
      .addSelect('json_agg("timeTable".*)', 'timeTable')
      .where('timeTable.teacher = :teacher', { teacher })
      .groupBy('timeTable.year')
      .addGroupBy('timeTable.group')
      .orderBy('timeTable.year')
      .addOrderBy('timeTable.group')
      .getRawMany();
  }

  getCalendar() {
    return {
      days: Object.values(Day),
      hours: Object.values(Time),
    };
  }

  async addSubjectToTimeTable(
    dto: AddSubjectToTimeTableDto,
  ): Promise<TimeTable> {
    if (await this.getCalendarPlace(dto)) {
      throw new BadRequestException('calendar pace already exist');
    }

    if (await this.getBusy(dto)) {
      throw new BadRequestException('calendar pace already exist');
    }

    const [teacher, subject, year, group, specialty] = await Promise.all([
      this.userService.findUserById(dto.teacher),
      this.subjectService.getSubjectById(dto.subject),
      this.dataSource.getRepository(Year).findOneByOrFail({ name: dto.year }),
      this.dataSource.getRepository(Group).findOneByOrFail({ name: dto.group }),
      this.dataSource
        .getRepository(Specialty)
        .findOneByOrFail({ name: dto.specialty }),
    ]);

    const entry = this.dataSource.manager.create(TimeTable, {
      days: dto.days,
      hours: dto.hours,
      auditorium: dto.auditorium,
    });

    entry.teacher = teacher;
    entry.subject = subject;
    entry.year = year;
    entry.group = group;
    entry.specialty = specialty;

    await this.dataSource.manager.save(entry);

    return (await this.getCalendarPlace(dto)) as TimeTable;
  }

  private async getBusy(dto: AddSubjectToTimeTableDto): Promise<boolean> {
    const [groupBusy, teacherBusy] = await Promise.all([
      this.getGroupBusy(dto),
      this.getTeacherBusy(dto),
    ]);
    return groupBusy || teacherBusy;
  }

  private async getGroupBusy(dto: AddSubjectToTimeTableDto): Promise<boolean> {
    return await this.dataSource
      .getRepository(TimeTable)
      .createQueryBuilder('timeTable')
      .where('timeTable.group = :group', { group: dto.group })
      .andWhere('timeTable.year = :year', { year: dto.year })
      .andWhere('timeTable.hours = :hours', { hours: dto.hours })
      .andWhere('timeTable.days = :days', { days: dto.days })
      .getExists();
  }

  private async getTeacherBusy(
    dto: AddSubjectToTimeTableDto,
  ): Promise<boolean> {
    return await this.dataSource
      .getRepository(TimeTable)
      .createQueryBuilder('timeTable')
      .andWhere('timeTable.teacher = :teacher', { teacher: dto.teacher })
      .andWhere('timeTable.hours = :hours', { hours: dto.hours })
      .andWhere('timeTable.days = :days', { days: dto.days })
      .getExists();
  }

  private async getCalendarPlace(
    dto: AddSubjectToTimeTableDto,
  ): Promise<TimeTable | null> {
    return await this.dataSource
      .getRepository(TimeTable)
      .createQueryBuilder('timeTable')
      .innerJoinAndSelect('timeTable.subject', 'subject')
      .innerJoinAndSelect('subject.teacher', 'teacher')
      .innerJoinAndSelect('teacher.person', 'person')
      .where('timeTable.group = :group', { group: dto.group })
      .andWhere('timeTable.year = :year', { year: dto.year })
      .andWhere('timeTable.specialty = :specialty', {
        specialty: dto.specialty,
      })
      .andWhere('timeTable.teacher = :teacher', { teacher: dto.teacher })
      .andWhere('timeTable.subject = :subject', { subject: dto.subject })
      .andWhere('timeTable.hours = :hours', { hours: dto.hours })
      .andWhere('timeTable.days = :days', { days: dto.days })
      .getOne();
  }

  async removeSubjectFromTimeTable(
    dto: RemoveSubjectFromTimeTableDto,
  ): Promise<void> {
    const result = await this.dataSource.manager.delete(TimeTable, dto);

    if (result.affected === 0) {
      throw new NotFoundException(`TimeTable entry not found`);
    }
  }

  async moveSubjectInTimeTable(
    dto: MoveSubjectInTimeTableDto,
  ): Promise<TimeTable> {
    const { newDays, newAuditorium, newHours, ...oldPlace } = dto;
    const newPlace = {
      ...oldPlace,
      hours: newHours,
      days: newDays,
      auditorium: newAuditorium,
    };

    if (await this.getBusy(newPlace)) {
      throw new BadRequestException('calendar pace already exist');
    }

    await this.dataSource.manager.update(TimeTable, oldPlace, {
      hours: dto.newHours,
      days: dto.newDays,
      auditorium: dto.newAuditorium,
    });

    return (await this.getCalendarPlace(newPlace)) as TimeTable;
  }
}
