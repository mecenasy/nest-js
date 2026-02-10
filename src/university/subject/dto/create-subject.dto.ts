import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  auditorium: string;

  @IsString()
  @IsNotEmpty()
  teacher: string;

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  groups: string[];

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  years: string[];

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  specialties: string;
}
