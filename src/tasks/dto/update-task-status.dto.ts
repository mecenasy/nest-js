import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../model/task.model';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
