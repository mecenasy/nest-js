import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { Time } from '../enum/time';
import { Day } from '../enum/day';

@Exclude()
export class CalendarResponse {
  constructor(partial: Partial<CalendarResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsNotEmpty()
  @IsArray()
  @IsEnum(Day, { each: true })
  days: Day[];

  @Expose()
  @IsNotEmpty()
  @IsArray()
  @IsEnum(Time, { each: true })
  hours: Time[];
}
