import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class SubjectRes {
  constructor(partial: Partial<SubjectRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class StudentsRes {
  constructor(partial: Partial<StudentsRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateGradeResponse {
  constructor(partial: Partial<CreateGradeResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  grade: string;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  time: Date;

  @Expose()
  @IsString()
  @IsNotEmpty()
  subject: SubjectRes;

  @Expose()
  @ValidateNested()
  @Type(() => StudentsRes)
  @IsNotEmpty()
  student: StudentsRes;
}
