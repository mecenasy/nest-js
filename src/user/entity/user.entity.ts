import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from '../model/user.model';
import { Task } from 'src/tasks/entity/task.entity';
import { HashedPassword } from './hashed-password.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @OneToOne(() => HashedPassword, (password) => password.user, {
    cascade: true,
    nullable: false,
  })
  password: HashedPassword;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
