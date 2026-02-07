import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ISpecialty } from '../model/specialty.model';
import { Subject } from '../../subject/entity/subject.entity';
import { Direction } from 'src/university/direction/entity/direction.entity';
import { Group } from 'src/university/group/entity/group.entity';
import { Year } from 'src/university/year/entity/year.entity';
import { TimeTable } from 'src/university/time-table/entity/time-table.entity';

@Entity()
export class Specialty implements ISpecialty {
  @PrimaryColumn()
  name: string;

  @ManyToOne(() => Direction, (direction) => direction.specialties, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
    nullable: false,
  })
  direction: Direction;

  @OneToMany(() => Group, (group) => group.specialty, { cascade: true })
  groups: Group[];

  @JoinTable()
  @ManyToMany(() => Year, (year) => year.specialties)
  years: Year[];

  @ManyToMany(() => Subject, (subject) => subject.specialty)
  subjects: Subject[];

  @OneToMany(() => TimeTable, (timeTable) => timeTable.specialty)
  timeTable: TimeTable[];
}
