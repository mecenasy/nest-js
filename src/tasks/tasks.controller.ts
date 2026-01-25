import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { ITask } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindOneParams } from './dto/find-one-params';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { WrongTaskStatusException } from './exception/wrong-task-status-exception';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  public getTasks(): ITask[] {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  public getTaskById(@Param() params: FindOneParams): ITask {
    return this.findTaskByIdOrFail(params.id);
  }

  @Post()
  public createTask(@Body() task: CreateTaskDto): ITask {
    const newTask = this.tasksService.createTask(task);
    return newTask;
  }

  @Patch(':id/status')
  public updateTaskStatus(
    @Param() params: FindOneParams,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ): ITask {
    const task = this.findTaskByIdOrFail(params.id);

    try {
      return this.tasksService.updateTask(task, updateTaskDto);
    } catch (error) {
      if (error instanceof WrongTaskStatusException) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Put(':id')
  public updateTask(
    @Param() params: FindOneParams,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ): ITask {
    const task = this.findTaskByIdOrFail(params.id);
    return this.tasksService.updateTask(task, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTask(@Param() params: FindOneParams) {
    const task = this.findTaskByIdOrFail(params.id);
    return this.tasksService.deleteTask(task);
  }

  private findTaskByIdOrFail(id: string): ITask {
    const task = this.tasksService.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
}
