import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../model/task.model';
import { Transform } from 'class-transformer';

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
  @Transform(({ value }: { value?: string }) => {
    if (!value) {
      return undefined;
    }

    return value
      .split(',')
      .map((label) => label.trim())
      .filter((label) => label.length);
  })
  labels?: string[];
}
