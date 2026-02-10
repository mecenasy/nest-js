import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Specialty } from '../../specialty/entity/specialty.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ISubject } from '../model/subject.model';
import { Group } from 'src/university/group/entity/group.entity';
import { Year } from 'src/university/year/entity/year.entity';
import { TimeTable } from 'src/university/time-table/entity/time-table.entity';

@Entity()
export class Subject implements ISubject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  auditorium: string;

  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.subjects)
  teacher: User;

  @IsNotEmpty()
  @JoinTable()
  @ManyToMany(() => Group, (group) => group.subjects)
  groups: Group[];

  @IsNotEmpty()
  @JoinTable()
  @ManyToMany(() => Year, (year) => year.subjects)
  years: Year[];

  @JoinTable()
  @IsNotEmpty()
  @ManyToMany(() => Specialty, (specialty) => specialty.subjects)
  specialty: Specialty[];

  @OneToMany(() => TimeTable, (timeTable) => timeTable.subject)
  timeTable: TimeTable[];
}
