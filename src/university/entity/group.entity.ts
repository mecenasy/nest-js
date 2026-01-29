import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { IGroup } from '../model/group.model';
import { Specialty } from './specialty.entity';
import { Year } from './year.entity';

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
}
