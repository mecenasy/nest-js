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
  public async getTasks(): Promise<ITask[]> {
    return await this.tasksService.getTasks();
  }

  @Get()
  public async getTasks2(): Promise<ITask[]> {
    return await this.tasksService.getTasks();
  }

  @Get(':id')
  public async getTaskById(@Param() params: FindOneParams): Promise<ITask> {
    return await this.findTaskByIdOrFail(params.id);
  }

  @Post()
  public async createTask(@Body() task: CreateTaskDto): Promise<ITask> {
    return await this.tasksService.createTask(task);
  }

  @Patch(':id/status')
  public async updateTaskStatus(
    @Param() params: FindOneParams,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ): Promise<ITask> {
    const task = await this.findTaskByIdOrFail(params.id);

    try {
      return await this.tasksService.updateTask(task, updateTaskDto);
    } catch (error) {
      if (error instanceof WrongTaskStatusException) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Put(':id')
  public async updateTask(
    @Param() params: FindOneParams,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ): Promise<ITask> {
    const task = await this.findTaskByIdOrFail(params.id);
    return await this.tasksService.updateTask(task, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTask(@Param() params: FindOneParams) {
    const task = await this.findTaskByIdOrFail(params.id);
    await this.tasksService.deleteTask(task);
  }

  private async findTaskByIdOrFail(id: string): Promise<ITask> {
    const task = await this.tasksService.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
}
