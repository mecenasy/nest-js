import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IStudent } from '../model/student.model';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Entity()
export class Student implements IStudent {
  @IsString()
  @PrimaryGeneratedColumn('increment')
  album: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  direction: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  group: string;

  @IsString()
  @IsNotEmpty()
  @Column({ default: '1' })
  year: string;

  @IsBoolean()
  @Column({ default: true })
  active: boolean;

  @IsNotEmpty()
  @OneToOne(() => User, (user) => user.student)
  student: User;
}
