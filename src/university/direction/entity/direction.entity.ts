import {
  Entity,
  ManyToMany,
  OneToMany,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';
import { IDirection } from '../model/direction.model';
import { Specialty } from 'src/university/specialty/entity/specialty.entity';
import { Year } from 'src/university/year/entity/year.entity';

@Entity()
export class Direction implements IDirection {
  @PrimaryColumn()
  name: string;

  @OneToMany(() => Specialty, (specialty) => specialty.direction, {
    cascade: true,
  })
  specialties: Specialty[];

  @ManyToMany(() => Year, (year) => year.directions)
  @JoinTable()
  years: Year[];
}
