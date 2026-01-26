import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { WrongTaskStatusException } from './exception/wrong-task-status-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskLabelDto } from './dto/create-task-label.dto';
import { TaskLabel } from './entity/task-label.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
    @InjectRepository(TaskLabel)
    private readonly labelRepository: Repository<TaskLabel>,
  ) {}

  public async getTasks(): Promise<ITask[]> {
    return await this.tasksRepository.find();
  }

  public async getTaskById(id: string): Promise<ITask | null> {
    return await this.tasksRepository.findOne({
      where: { id },
      relations: ['labels'],
    });
  }

  public async createTask(task: CreateTaskDto): Promise<ITask> {
    return await this.tasksRepository.save(task);
  }

  public async addLabelToTask(
    task: ITask,
    labelDtos: CreateTaskLabelDto[],
  ): Promise<ITask> {
    const names = new Set(task.labels?.map((label) => label.name));
    const labels = this.getUniqueLabels(labelDtos)
      .filter((dto) => !names.has(dto.name))
      .map((label) => this.labelRepository.create(label));

    if (labels.length) {
      task.labels = [...(task.labels || []), ...labels];
      return await this.tasksRepository.save(task);
    }

    return task;
  }

  public async updateTask(
    task: ITask,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ITask> {
    const isStatusTransition = this.isVallationStatusTransition(
      task.status,
      updateTaskDto.status,
    );

    if (task.status && !isStatusTransition) {
      throw new WrongTaskStatusException();
    }

    updateTaskDto.labels = this.getUniqueLabels(updateTaskDto.labels);

    return await this.tasksRepository.save({ ...task, ...updateTaskDto });
  }

  public async removeLabels(
    task: ITask,
    labelsToRemove: CreateTaskLabelDto[],
  ): Promise<ITask> {
    task.labels = task.labels?.filter(
      (label) => !labelsToRemove.some(({ name }) => name === label.name),
    );
    return await this.tasksRepository.save(task);
  }

  public async deleteTask(task: ITask): Promise<void> {
    await this.tasksRepository.delete(task.id);
  }

  private isVallationStatusTransition(
    fromStatus: TaskStatus,
    toStatus?: TaskStatus,
  ): boolean {
    const statusOrder: Array<TaskStatus | undefined> = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];

    return statusOrder.indexOf(fromStatus) <= statusOrder.indexOf(toStatus);
  }

  private getUniqueLabels(
    labelDtos: CreateTaskLabelDto[] | undefined,
  ): CreateTaskLabelDto[] {
    if (!labelDtos) {
      return [];
    }

    const uniqueNames = [...new Set(labelDtos.map((label) => label.name))];
    return uniqueNames.map((name) => ({ name }));
  }
}
