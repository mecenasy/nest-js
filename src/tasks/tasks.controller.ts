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
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { ITask } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindOneParams } from './params/find-one-params';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { WrongTaskStatusException } from './exception/wrong-task-status-exception';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskLabelDto } from './dto/create-task-label.dto';
import { FindTaskParams } from './params/find-task.params';
import { PaginationParams } from 'src/common/pagination.params';
import { PaginationResponse } from 'src/common/pagination.response';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  public async getTasks(
    @Query() filters: FindTaskParams,
    @Query() pagination: PaginationParams,
  ): Promise<PaginationResponse<ITask>> {
    const [items, count] = await this.tasksService.getTasks(
      filters,
      pagination,
    );

    return {
      data: items,
      pagination: {
        total: count,
        ...pagination,
      },
    };
  }

  @Get(':id')
  public async getTaskById(@Param() params: FindOneParams): Promise<ITask> {
    return await this.findTaskByIdOrFail(params.id);
  }

  @Post()
  public async createTask(@Body() task: CreateTaskDto): Promise<ITask> {
    return await this.tasksService.createTask(task);
  }
  @Post(':id/labels')
  public async addLabelsToTask(
    @Param() params: FindOneParams,
    @Body() labels: CreateTaskLabelDto[],
  ): Promise<ITask> {
    const task = await this.findTaskByIdOrFail(params.id);
    return await this.tasksService.addLabelToTask(task, labels);
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
    @Body() updateTaskDto: UpdateTaskDto,
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

  @Delete(':id/labels')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeLabels(
    @Param() { id }: FindOneParams,
    @Body() labelNames: CreateTaskLabelDto[],
  ): Promise<void> {
    const task = await this.findTaskByIdOrFail(id);
    await this.tasksService.removeLabels(task, labelNames);
  }

  private async findTaskByIdOrFail(id: string): Promise<ITask> {
    const task = await this.tasksService.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
}
