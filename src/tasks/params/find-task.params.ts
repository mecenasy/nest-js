import { IsEnum, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../model/task.model';
import { Transform } from 'class-transformer';
import { splitElementByComa } from 'src/decorators/helper/split-element-by-coma';

export class FindTaskParams {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  @MinLength(3)
  search?: string;

  @IsOptional()
  @IsString()
  @Transform(splitElementByComa)
  labels?: string[];

  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'updatedAt', 'title', 'description', 'status'])
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
