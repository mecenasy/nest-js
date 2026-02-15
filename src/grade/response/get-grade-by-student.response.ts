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

export class GetGradeByStudentResponse {
  constructor(partial: Partial<GetGradeByStudentResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @Expose()
  @ValidateNested()
  @Type(() => GradeRes)
  @IsNotEmpty()
  @IsArray()
  grades: GradeRes[];
}
