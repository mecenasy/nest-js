import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Time } from '../enum/time';
import { Day } from '../enum/day';

export class MoveSubjectInTimeTableDto {
  @IsEnum(Time)
  @IsNotEmpty()
  newHours: Time;

  @IsEnum(Day)
  @IsNotEmpty()
  newDays: Day;

  @IsString()
  @IsNotEmpty()
  newAuditorium: string;

  @IsEnum(Time)
  @IsNotEmpty()
  hours: Time;

  @IsEnum(Day)
  @IsNotEmpty()
  days: Day;

  @IsString()
  @IsNotEmpty()
  auditorium: string;

  @IsString()
  @IsNotEmpty()
  group: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  teacher: string;
}
