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
import { Expose } from 'class-transformer';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  @Expose()
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  @Expose()
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
  @Expose()
  tasks: Task[];
}
