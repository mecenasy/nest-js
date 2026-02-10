import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Time } from '../enum/time';
import { Day } from '../enum/day';
import { ITimeTable } from '../model/time-table.model';

export class ItemRes {
  constructor(
    partial: Partial<ItemRes & { surname?: string; userId: string }>,
  ) {
    this.id = partial?.userId ?? partial?.id ?? '';
    this.name = `${partial?.name ?? ''} ${partial?.surname ?? ''}`;
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

export class GetTimeTableByGroupRes {
  constructor(partial: Partial<ITimeTable>) {
    Object.assign(this, partial);
    this.subject = new ItemRes(partial?.subject ?? {});
    this.teacher = new ItemRes(partial?.subject?.teacher.person ?? {});
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
