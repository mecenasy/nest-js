import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { IYear } from '../model/year.model';
import { Direction } from './direction.entity';
import { Specialty } from './specialty.entity';
import { Group } from './group.entity';

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
}
