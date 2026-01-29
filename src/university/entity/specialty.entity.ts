import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ISpecialty } from '../model/specialty.model';
import { Direction } from './direction.entity';
import { Group } from './group.entity';
import { Year } from './year.entity';

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

  @ManyToMany(() => Year, (year) => year.specialties)
  @JoinTable()
  years: Year[];
}
