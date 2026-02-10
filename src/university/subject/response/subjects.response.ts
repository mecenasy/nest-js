import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ISubject } from '../model/subject.model';
import { IUser } from 'src/user/model/user.model';
import { IDto } from 'src/university/model/dto.model';

@Exclude()
export class TeacherRes {
  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
    this.id = partial.id ?? '';
    this.name = `${partial?.person?.name} ${partial?.person?.surname}`;
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

@Exclude()
export class ItemRes {
  constructor(partial: Partial<IDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}

@Exclude()
export class SubjectResponse {
  constructor(partial: Partial<ISubject>) {
    Object.assign(this, partial);
    if (partial.teacher) {
      this.teacher = new TeacherRes(partial.teacher);
    }
    if (partial.groups) {
      this.groups = partial.groups.map((item) => new ItemRes(item));
    }
    if (partial.years) {
      this.years = partial.years.map((item) => new ItemRes(item));
    }
    if (partial.specialty) {
      this.specialties = partial.specialty.map((item) => new ItemRes(item));
    }
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  auditorium: string;

  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TeacherRes)
  teacher: TeacherRes;

  @Expose()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => ItemRes)
  groups: ItemRes[];

  @Expose()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => ItemRes)
  years: ItemRes[];

  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ItemRes)
  specialties: ItemRes[];
}
