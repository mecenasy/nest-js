import { Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { IYear } from '../model/year.model';
import { Direction } from 'src/university/direction/entity/direction.entity';
import { Specialty } from 'src/university/specialty/entity/specialty.entity';
import { Group } from 'src/university/group/entity/group.entity';
import { Subject } from 'src/university/subject/entity/subject.entity';
import { TimeTable } from 'src/university/time-table/entity/time-table.entity';

@Entity()
export class Year implements IYear {
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => Direction, (direction) => direction.years)
  directions: Direction[];

  @ManyToMany(() => Specialty, (specialty) => specialty.years)
  specialties: Specialty[];

  @ManyToMany(() => Group, (group) => group.years)
  group: Group[];

  @ManyToMany(() => Subject, (subject) => subject.years)
  subjects: Subject[];

  @OneToMany(() => TimeTable, (timeTable) => timeTable.year)
  timeTable: TimeTable[];
}
