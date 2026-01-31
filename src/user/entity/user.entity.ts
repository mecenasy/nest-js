import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from '../model/user.model';
import { Task } from '../../tasks/entity/task.entity';
import { HashedPassword } from './hashed-password.entity';
import { Expose } from 'class-transformer';
import { Person } from '../../person/entity/person.entity';
import { Role } from './role.entity';
import { Student } from 'src/student/entity/student.entity';

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

  @OneToOne(() => Person, (person) => person.user, {
    cascade: true,
    nullable: true,
  })
  person: Person;

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable()
  roles: Role[];

  @OneToOne(() => Student, (user) => user.student, {
    cascade: true,
    nullable: true,
  })
  student: Student;

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true,
    nullable: true,
  })
  @Expose()
  tasks: Task[];
}
