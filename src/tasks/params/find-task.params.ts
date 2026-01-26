import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../model/task.model';

export class FindTaskParams {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  @MinLength(3)
  search?: string;
}
