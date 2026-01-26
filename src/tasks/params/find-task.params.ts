import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../model/task.model';

export class FindTaskParams {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
