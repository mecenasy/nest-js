import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class GradeRes {
  constructor(partial: Partial<GradeRes>) {
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
  date: Date;
}

export class StudentsRes {
  constructor(partial: Partial<GradeRes>) {
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

  @Expose()
  @ValidateNested()
  @Type(() => GradeRes)
  @IsNotEmpty()
  @IsArray()
  grades: GradeRes[];
}

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

  @Expose()
  @ValidateNested()
  @Type(() => StudentsRes)
  @IsNotEmpty()
  @IsArray()
  students: StudentsRes[];
}

export class GetGradeByTeacherResponse {
  constructor(partial: Partial<GetGradeByTeacherResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  group: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  year: string;

  @Expose()
  @ValidateNested()
  @Type(() => SubjectRes)
  @IsNotEmpty()
  @IsArray()
  subjects: SubjectRes[];
}
