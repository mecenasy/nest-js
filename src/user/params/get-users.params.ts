import { Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { splitElementByComa } from 'src/decorators/helper/split-element-by-coma';

export class GetUsersParams {
  @IsOptional()
  @Transform(splitElementByComa)
  directions?: string[];

  @IsOptional()
  @Transform(splitElementByComa)
  specialties?: string[];

  @IsOptional()
  @Transform(splitElementByComa)
  groups?: string[];

  @IsOptional()
  @Transform(splitElementByComa)
  years?: string[];

  @IsOptional()
  @Transform(splitElementByComa)
  roles?: string[];

  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  pageSize: number = 10;

  @IsOptional()
  orderBy?: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  orderType: 'ASC' | 'DESC' = 'DESC';
}
