import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ITimeTable } from '../model/time-table.model';
import { User } from 'src/user/entity/user.entity';
import { IsEnum, IsString } from 'class-validator';
import { Group } from 'src/university/group/entity/group.entity';
import { Year } from 'src/university/year/entity/year.entity';
import { Specialty } from 'src/university/specialty/entity/specialty.entity';
import { Subject } from 'src/university/subject/entity/subject.entity';
import { Time } from '../enum/time';
import { Day } from '../enum/day';

@Entity()
export class TimeTable implements ITimeTable {
  @PrimaryColumn()
  @IsEnum(Time)
  hours: Time;

  @PrimaryColumn()
  @IsEnum(Day)
  days: Day;

  @PrimaryColumn()
  @IsString()
  auditorium: string;

  @PrimaryColumn({ type: 'varchar' })
  @JoinColumn({ name: 'group' })
  @ManyToOne(() => Group, (group) => group.timeTable)
  group: Group;

  @PrimaryColumn({ type: 'varchar' })
  @JoinColumn({ name: 'year' })
  @ManyToOne(() => Year, (year) => year.timeTable)
  year: Year;

  @PrimaryColumn({ type: 'varchar' })
  @JoinColumn({ name: 'specialty' })
  @ManyToOne(() => Specialty, (specialty) => specialty.timeTable)
  specialty: Specialty;

  @PrimaryColumn({ type: 'uuid' })
  @JoinColumn({ name: 'subject' })
  @ManyToOne(() => Subject, (subject) => subject.timeTable)
  subject: Subject;

  @PrimaryColumn({ type: 'uuid' })
  @JoinColumn({ name: 'teacher' })
  @ManyToOne(() => User, (user) => user.timeTable)
  teacher: User;
}
