import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IStudent } from '../model/student.model';

export class CreateStudentDto implements Omit<IStudent, 'album' | 'active'> {
  @IsString()
  @IsOptional()
  studentId?: string;

  @IsString()
  @IsNotEmpty()
  direction: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  group: string;

  @IsString()
  @IsOptional()
  year: string;
}
