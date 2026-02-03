import { Expose, Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class UniversityMapResponse {
  constructor(private readonly partial?: Partial<UniversityMapResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => DirectionRes)
  directions: DirectionRes[];

  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => SpecialtyRes)
  specialties: SpecialtyRes[];

  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => GroupRes)
  group: GroupRes[];

  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => YearRes)
  years: YearRes[];

  @Expose()
  @IsArray()
  roles: string[];
}

export class DirectionRes {
  constructor(private readonly partial?: Partial<DirectionRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsArray()
  specialties: string[];

  @Expose()
  @IsArray()
  years: string[];
}

export class SpecialtyRes {
  constructor(private readonly partial?: Partial<SpecialtyRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  direction: string;

  @Expose()
  @IsArray()
  groups: string[];

  @Expose()
  @IsArray()
  years: string[];
}

export class GroupRes {
  constructor(private readonly partial?: Partial<GroupRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  specialty: string;

  @Expose()
  @IsArray()
  years: string[];
}

export class YearRes {
  constructor(private readonly partial?: Partial<YearRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsArray()
  directions: string[];

  @Expose()
  @IsArray()
  specialties: string[];

  @Expose()
  @IsArray()
  groups: string[];
}
