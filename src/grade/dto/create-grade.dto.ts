import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateGradeDto {
  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @IsUUID()
  @IsNotEmpty()
  teacherId: string;

  @IsUUID()
  @IsNotEmpty()
  studentId: string;
}
