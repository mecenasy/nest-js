import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Time } from '../enum/time';
import { Day } from '../enum/day';

export class ItemRes {
  constructor(partial: Partial<ItemRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class TimeTableRes {
  constructor(partial: Partial<TimeTableRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsEnum(Time)
  @IsNotEmpty()
  hours: Time;

  @Expose()
  @IsEnum(Day)
  @IsNotEmpty()
  days: Day;

  @Expose()
  @IsString()
  @IsNotEmpty()
  group: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  year: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ItemRes)
  subject: ItemRes;

  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ItemRes)
  teacher: ItemRes;
}

@Exclude()
export class GetTimeTableResponse {
  constructor(partial: Partial<GetTimeTableResponse>) {
    Object.assign(this, partial);
  }
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  year?: string;

  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TimeTableRes)
  timeTable: TimeTableRes[];
}
