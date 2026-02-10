import { IsNotEmpty, IsString } from 'class-validator';
import { Subject } from 'src/university/subject/entity/subject.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  grade: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToOne(() => Subject, (subject) => subject.grades, { eager: true })
  subject: Subject;

  @ManyToOne(() => User, (user) => user.grades, { eager: true })
  teacher: User;

  @ManyToOne(() => User, (user) => user.grades, { eager: true })
  student: User;
}
