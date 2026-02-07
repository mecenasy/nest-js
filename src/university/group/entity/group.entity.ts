import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { IGroup } from '../model/group.model';
import { Specialty } from 'src/university/specialty/entity/specialty.entity';
import { Year } from 'src/university/year/entity/year.entity';
import { Subject } from 'src/university/subject/entity/subject.entity';
import { TimeTable } from 'src/university/time-table/entity/time-table.entity';

@Entity()
export class Group implements IGroup {
  @PrimaryColumn()
  name: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.groups, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
    nullable: false,
  })
  specialty: Specialty;

  @ManyToMany(() => Year, (year) => year.group)
  @JoinTable()
  years: Year[];

  @ManyToMany(() => Subject, (subject) => subject.groups)
  subjects: Subject[];

  @OneToMany(() => TimeTable, (timeTable) => timeTable.group)
  timeTable: TimeTable[];
}
