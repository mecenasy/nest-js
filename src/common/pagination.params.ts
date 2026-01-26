import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationParams {
  constructor(limit?: number, page?: number) {
    this.limit = limit || 10;
    this.page = page || 1;
  }

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(10)
  limit: number = 10;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  page: number = 1;

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
