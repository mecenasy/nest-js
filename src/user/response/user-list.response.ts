import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { ProfileResponse } from './profile.response';
import { UniversityMapResponse } from 'src/university/response/university-map.response';

export class PaginationRes {
  constructor(partial: Partial<PaginationRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsNumber()
  currentPage: number;

  @Expose()
  @IsNumber()
  pageSize: number;

  @Expose()
  @IsNumber()
  totalPages: number;

  @Expose()
  @IsNumber()
  totalItems: number;
}

export class FilterRes {
  constructor(partial: Partial<FilterRes>) {
    Object.assign(this, partial);
  }
  @Expose()
  @IsArray()
  @ValidateNested()
  directions: string[];

  @Expose()
  @IsArray()
  @ValidateNested()
  groups: string[];

  @Expose()
  @IsArray()
  @ValidateNested()
  roles: string[];

  @Expose()
  @IsArray()
  @ValidateNested()
  specialties: string[];

  @Expose()
  @IsArray()
  @ValidateNested()
  years: string[];

  @Expose()
  @IsArray()
  @ValidateNested()
  orderBy: string[];

  @Expose()
  @IsArray()
  @ValidateNested()
  orderType: string[];
}

export class UsersWithPagination {
  constructor(partial: Partial<UsersWithPagination>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => ProfileResponse)
  users: ProfileResponse[];

  @Expose()
  @ValidateNested()
  @Type(() => PaginationRes)
  pagination: PaginationRes;
}

export class UserListResponse extends UsersWithPagination {
  constructor(partial: Partial<UserListResponse>) {
    super(partial);
    Object.assign(this, partial);
  }

  @Expose()
  @ValidateNested()
  @Type(() => UniversityMapResponse)
  filtersMap: UniversityMapResponse;

  @Expose()
  @ValidateNested()
  @Type(() => FilterRes)
  filters: FilterRes;
}
