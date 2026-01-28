import { IsString } from 'class-validator';
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { IRole } from '../model/role.model';
import { User } from './user.entity';

@Entity()
export class Role implements IRole {
  @PrimaryColumn()
  @IsString()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  user: User[];
}
