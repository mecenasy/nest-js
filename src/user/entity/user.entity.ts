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
import { Person } from '../../person/entity/person.entity';
import { Role } from './role.entity';
import { Student } from 'src/student/entity/student.entity';
import { Message } from 'src/message/entity/message.entity';
import { Subject } from 'src/university/subject/entity/subject.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => Message, (message) => message.from, {
    cascade: true,
    nullable: true,
  })
  sendMessages: Message[];

  @OneToMany(() => Message, (message) => message.from, {
    cascade: true,
    nullable: true,
  })
  receiveMessages: Message[];

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true,
    nullable: true,
  })
  tasks: Task[];

  @OneToMany(() => Subject, (subject) => subject.teacher)
  subjects: Subject[];

  @OneToMany(() => Subject, (subject) => subject.teacher)
  timeTable: Subject[];
}
